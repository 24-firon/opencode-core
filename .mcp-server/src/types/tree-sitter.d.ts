declare module 'tree-sitter-typescript' {
  const TypeScript: any;
  export default TypeScript;
}

declare module 'tree-sitter' {
  export class Parser {
    setLanguage(language: any): void;
    parse(input: string | Buffer): Tree;
  }
  
  export interface Tree {
    rootNode: SyntaxNode;
  }
  
  export interface SyntaxNode {
    toString(): string;
    // Add other node properties as needed
  }
}
