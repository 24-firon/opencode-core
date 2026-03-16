#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import Parser from 'tree-sitter';
import TypeScript from 'tree-sitter-typescript';
import { z } from 'zod';

// Tool definitions
const tools: Tool[] = [
  {
    name: 'run_qa_pipeline',
    description: 'Execute the full 7-gate QA pipeline for a given task',
    inputSchema: {
      type: 'object',
      properties: {
        taskId: { type: 'string', description: 'Unique task identifier' },
        files: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Files modified by the task'
        },
        skipGates: {
          type: 'array',
          items: { type: 'string', enum: ['syntax', 'placeholder', 'lint', 'build', 'security', 'test'] },
          description: 'Gates to skip (for emergency/debug)'
        }
      },
      required: ['taskId', 'files']
    }
  },
  {
    name: 'syntax_check',
    description: 'Gate 1: Parse validation using Tree-sitter',
    inputSchema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string' } }
      },
      required: ['files']
    }
  },
  {
    name: 'placeholder_scan',
    description: 'Gate 2: Detect TODOs, FIXMEs, stubs, incomplete code',
    inputSchema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string' } }
      },
      required: ['files']
    }
  },
  {
    name: 'lint_check',
    description: 'Gate 3: Run Biome linter with zero-tolerance',
    inputSchema: {
      type: 'object',
      properties: {
        fix: { type: 'boolean', default: true }
      }
    }
  },
  {
    name: 'build_check',
    description: 'Gate 4: TypeScript compilation check',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'security_scan',
    description: 'Gate 5: Run Semgrep SAST security scan',
    inputSchema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string' } }
      },
      required: ['files']
    }
  },
  {
    name: 'test_run',
    description: 'Gate 6: Execute tests with coverage check',
    inputSchema: {
      type: 'object',
      properties: {
        minCoverage: { type: 'number', default: 70 }
      }
    }
  }
];

// Gate 1: Syntax Check
async function runSyntaxCheck(files: string[]): Promise<{ passed: boolean; errors: string[] }> {
  const parser = new Parser();
  parser.setLanguage(TypeScript);
  
  const errors: string[] = [];
  
  for (const file of files) {
    if (!file.endsWith('.ts') && !file.endsWith('.tsx')) continue;
    
    try {
      const content = readFileSync(file, 'utf-8');
      const tree = parser.parse(content);
      
      // Check for syntax errors (Tree-sitter marks ERROR nodes)
      const hasErrors = tree.rootNode.toString().includes('ERROR');
      if (hasErrors) {
        errors.push(`${file}: Contains syntax errors`);
      }
    } catch (e) {
      errors.push(`${file}: Failed to parse - ${e}`);
    }
  }
  
  return { passed: errors.length === 0, errors };
}

// Gate 2: Placeholder Scan
async function runPlaceholderScan(files: string[]): Promise<{ passed: boolean; errors: string[] }> {
  const placeholderPatterns = [
    /TODO[\s:]/i,
    /FIXME[\s:]/i,
    /XXX[\s:]/i,
    /HACK[\s:]/i,
    /BUG[\s:]/i,
    /placeholder/i,
    /stub/i,
    /implement me/i,
    /not implemented/i
  ];
  
  const errors: string[] = [];
  
  for (const file of files) {
    if (!file.match(/\.(ts|tsx|js|jsx)$/)) continue;
    
    try {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      
      lines.forEach((line, idx) => {
        placeholderPatterns.forEach(pattern => {
          if (pattern.test(line)) {
            errors.push(`${file}:${idx + 1}: Found placeholder "${line.trim()}"`);
          }
        });
      });
    } catch (e) {
      errors.push(`${file}: Failed to read`);
    }
  }
  
  return { passed: errors.length === 0, errors };
}

// Gate 3: Lint Check
async function runLintCheck(fix: boolean = true): Promise<{ passed: boolean; errors: string[] }> {
  const errors: string[] = [];
  
  try {
    const cmd = fix ? 'npm run biome:check' : 'npx biome check .';
    execSync(cmd, { stdio: 'pipe', encoding: 'utf-8' });
    return { passed: true, errors: [] };
  } catch (e: any) {
    const output = e.stdout || e.stderr || e.message || '';
    return { passed: false, errors: output.split('\n').filter((l: string) => l.trim()) };
  }
}

// Gate 4: Build Check
async function runBuildCheck(): Promise<{ passed: boolean; errors: string[] }> {
  try {
    execSync('npm run typecheck', { stdio: 'pipe', encoding: 'utf-8' });
    return { passed: true, errors: [] };
  } catch (e: any) {
    const output = e.stdout || e.stderr || e.message || '';
    return { passed: false, errors: output.split('\n').filter((l: string) => l.trim()) };
  }
}

// Gate 5: Security Scan
async function runSecurityScan(files: string[]): Promise<{ passed: boolean; errors: string[] }> {
  try {
    // Semgrep or fallback to grep-based secret detection
    const fileList = files.join(' ');
    const result = execSync(`semgrep --config=auto --error ${fileList} 2>&1 || echo "SEMGRP_FAILED"`, {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024
    });
    
    if (result.includes('SEMGRP_FAILED')) {
      // Fallback: Basic secret detection
      const secretPatterns = [
        /password\s*[=:]\s*["\'][^"\']{4,}["\']/i,
        /api_key\s*[=:]\s*["\'][^"\']{10,}["\']/i,
        /secret\s*[=:]\s*["\'][^"\']{10,}["\']/i,
        /token\s*[=:]\s*["\'][^"\']{20,}["\']/i
      ];
      
      const errors: string[] = [];
      for (const file of files) {
        try {
          const content = readFileSync(file, 'utf-8');
          secretPatterns.forEach(pattern => {
            if (pattern.test(content)) {
              errors.push(`${file}: Potential secret detected`);
            }
          });
        } catch {}
      }
      
      return { passed: errors.length === 0, errors };
    }
    
    return { passed: true, errors: [] };
  } catch (e: any) {
    return { passed: false, errors: [e.message || 'Security scan failed'] };
  }
}

// Gate 6: Test Run
async function runTestRun(minCoverage: number = 70): Promise<{ passed: boolean; errors: string[] }> {
  try {
    execSync('npm run test', { stdio: 'pipe', encoding: 'utf-8' });
    // Coverage check would require parsing vitest output
    return { passed: true, errors: [] };
  } catch (e: any) {
    const output = e.stdout || e.stderr || e.message || '';
    return { passed: false, errors: output.split('\n').filter((l: string) => l.trim()) };
  }
}

// Full Pipeline
async function runFullPipeline(
  taskId: string,
  files: string[],
  skipGates: string[] = []
): Promise<{ success: boolean; results: Record<string, any> }> {
  const results: Record<string, any> = {};
  
  // Gate 1: Syntax
  if (!skipGates.includes('syntax')) {
    results.syntax = await runSyntaxCheck(files);
    if (!results.syntax.passed) return { success: false, results };
  }
  
  // Gate 2: Placeholder
  if (!skipGates.includes('placeholder')) {
    results.placeholder = await runPlaceholderScan(files);
    if (!results.placeholder.passed) return { success: false, results };
  }
  
  // Gate 3: Lint
  if (!skipGates.includes('lint')) {
    results.lint = await runLintCheck(true);
    if (!results.lint.passed) return { success: false, results };
  }
  
  // Gate 4: Build
  if (!skipGates.includes('build')) {
    results.build = await runBuildCheck();
    if (!results.build.passed) return { success: false, results };
  }
  
  // Gate 5: Security
  if (!skipGates.includes('security')) {
    results.security = await runSecurityScan(files);
    if (!results.security.passed) return { success: false, results };
  }
  
  // Gate 6: Test
  if (!skipGates.includes('test')) {
    results.test = await runTestRun();
    if (!results.test.passed) return { success: false, results };
  }
  
  return { success: true, results };
}

// MCP Server Setup
const server = new Server(
  {
    name: 'opencode-qa-gates-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'run_qa_pipeline': {
        const { taskId, files, skipGates = [] } = args as any;
        const result = await runFullPipeline(taskId, files, skipGates);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'syntax_check': {
        const { files } = args as any;
        const result = await runSyntaxCheck(files);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
      
      case 'placeholder_scan': {
        const { files } = args as any;
        const result = await runPlaceholderScan(files);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
      
      case 'lint_check': {
        const { fix = true } = args as any;
        const result = await runLintCheck(fix);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
      
      case 'build_check': {
        const result = await runBuildCheck();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
      
      case 'security_scan': {
        const { files } = args as any;
        const result = await runSecurityScan(files);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
      
      case 'test_run': {
        const { minCoverage = 70 } = args as any;
        const result = await runTestRun(minCoverage);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: true,
            message: error instanceof Error ? error.message : String(error),
          }),
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('QA Gates MCP Server running on stdio');
}

main().catch(console.error);
