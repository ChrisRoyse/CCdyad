import { executeClaudeCode, checkClaudeCodeAvailable } from "./claude_code_wrapper";

export class ClaudeCodeSimpleProvider {
  private isAvailable: boolean = false;

  async initialize(): Promise<void> {
    this.isAvailable = await checkClaudeCodeAvailable();
    if (!this.isAvailable) {
      throw new Error("Claude Code CLI is not available. Please install it first.");
    }
  }

  async generateResponse(prompt: string, cwd?: string): Promise<string> {
    if (!this.isAvailable) {
      throw new Error("Claude Code is not available");
    }

    return await executeClaudeCode(prompt, { cwd });
  }

  async *generateStreamingResponse(
    prompt: string, 
    cwd?: string
  ): AsyncGenerator<string, void, unknown> {
    // For now, just return the full response as a single chunk
    // Could be enhanced later to support true streaming
    const response = await this.generateResponse(prompt, cwd);
    yield response;
  }
}