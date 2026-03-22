import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import { promisify } from "util";
import z from "zod";

const execAsync = promisify(exec);

const server = new Server({
  name: "qa-gates-server",
  version: "1.0.0"
}, {
  capabilities: { tools: {} }
});

// Helper for command execution
async function runCommand(command: string, gateName: string) {
  try {
    const { stdout, stderr } = await execAsync(command);
    return {
      content: [{ type: "text", text: `✅ [${gateName}] PASSED\n\n${stdout}` }]
    };
  } catch (error: any) {
    return {
      isError: true,
      content: [{ type: "text", text: `❌ [${gateName}] FAILED\n\nExit Code: ${error.code}\n\nSTDOUT:\n${error.stdout}\n\nSTDERR:\n${error.stderr}` }]
    };
  }
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "run_gate_lint",
        description: "Gate 3: Runs Biome to check for linting and formatting errors (0 errors allowed).",
        inputSchema: { type: "object", properties: {}, required: [] }
      },
      {
        name: "run_gate_build",
        description: "Gate 4: Runs TypeScript compiler (tsc --noEmit) to ensure structural integrity.",
        inputSchema: { type: "object", properties: {}, required: [] }
      },
      {
        name: "run_gate_security",
        description: "Gate 5: Runs Semgrep SAST scan for security vulnerabilities.",
        inputSchema: { type: "object", properties: {}, required: [] }
      },
      {
        name: "run_gate_test",
        description: "Gate 6: Runs Vitest. Fails if coverage is below MIN_COVERAGE (default 70%).",
        inputSchema: { type: "object", properties: {}, required: [] }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "run_gate_lint":
      return await runCommand("npm run biomecheck", "Lint Check (Biome)");
    case "run_gate_build":
      return await runCommand("npm run typecheck", "Build Check (TypeScript)");
    case "run_gate_security":
      return await runCommand("npm run securityscan", "Security Scan (Semgrep)");
    case "run_gate_test":
      return await runCommand("npm run test", "Test Run (Vitest)");
    default:
      return {
        isError: true,
        content: [{ type: "text", text: `Unknown tool: ${request.params.name}` }]
      };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("QA Gates MCP Server running on stdio");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
