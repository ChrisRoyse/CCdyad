// Simple test to verify Claude Code integration
const { executeClaudeCode, checkClaudeCodeAvailable } = require('./src/ipc/utils/claude_code_wrapper.ts');

async function testClaudeCode() {
  console.log('Testing Claude Code integration...');
  
  // Check if Claude Code is available
  const available = await checkClaudeCodeAvailable();
  console.log('Claude Code available:', available);
  
  if (!available) {
    console.log('Claude Code CLI not available, skipping test');
    return;
  }
  
  // Test a simple prompt
  try {
    const response = await executeClaudeCode('Hello, what can you do?');
    console.log('Claude Code response:', response.substring(0, 200) + '...');
  } catch (error) {
    console.error('Error testing Claude Code:', error.message);
  }
}

testClaudeCode();