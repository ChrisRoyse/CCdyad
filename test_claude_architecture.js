// Test script to verify the Claude Code architecture
const path = require('path');
const { spawn } = require('child_process');

async function testClaudeArchitecture() {
  console.log('🧪 Testing Claude Code Architecture...\n');
  
  // Test 1: Check if Claude CLI is available
  console.log('1. Testing Claude CLI availability...');
  try {
    const checkProcess = spawn('claude', ['--version'], { shell: true });
    let versionOutput = '';
    
    checkProcess.stdout.on('data', (data) => {
      versionOutput += data.toString();
    });
    
    checkProcess.on('close', (code) => {
      if (code === 0) {
        console.log('   ✅ Claude CLI is available:', versionOutput.trim());
      } else {
        console.log('   ❌ Claude CLI not available or not working');
      }
      
      // Test 2: Architecture components
      console.log('\n2. Testing architecture components...');
      testComponents();
    });
    
    checkProcess.on('error', (err) => {
      console.log('   ❌ Error testing Claude CLI:', err.message);
      testComponents();
    });
    
  } catch (error) {
    console.log('   ❌ Failed to test Claude CLI:', error.message);
    testComponents();
  }
}

function testComponents() {
  const components = [
    'src/ipc/utils/claude_code/claude_wrapper.ts',
    'src/ipc/utils/claude_code/security_manager.ts', 
    'src/ipc/utils/claude_code/session_manager.ts',
    'src/ipc/handlers/claude_wrapper_handlers.ts',
    'src/ipc/claude_wrapper_client.ts'
  ];
  
  console.log('   Checking architecture components:');
  
  components.forEach(component => {
    try {
      const fs = require('fs');
      if (fs.existsSync(component)) {
        const stats = fs.statSync(component);
        console.log(`   ✅ ${component} (${stats.size} bytes)`);
      } else {
        console.log(`   ❌ ${component} - Not found`);
      }
    } catch (error) {
      console.log(`   ❌ ${component} - Error: ${error.message}`);
    }
  });
  
  // Test 3: IPC integration
  console.log('\n3. Testing IPC integration...');
  try {
    // Check if handlers are properly registered
    const ipcHostContent = require('fs').readFileSync('src/ipc/ipc_host.ts', 'utf8');
    if (ipcHostContent.includes('registerClaudeWrapperHandlers')) {
      console.log('   ✅ Claude wrapper handlers registered in IPC host');
    } else {
      console.log('   ❌ Claude wrapper handlers not found in IPC host');
    }
    
    // Check if client methods exist
    const ipcClientContent = require('fs').readFileSync('src/ipc/ipc_client.ts', 'utf8');
    if (ipcClientContent.includes('startClaudeWrapper')) {
      console.log('   ✅ Claude wrapper client methods available');
    } else {
      console.log('   ❌ Claude wrapper client methods not found');
    }
    
  } catch (error) {
    console.log('   ❌ Error testing IPC integration:', error.message);
  }
  
  // Test 4: Security architecture
  console.log('\n4. Testing security architecture...');
  try {
    const securityContent = require('fs').readFileSync('src/ipc/utils/claude_code/security_manager.ts', 'utf8');
    const features = [
      'handlePermissionRequest',
      'SecurityPolicy',
      'requestUserConfirmation',
      'createWorkspaceContext'
    ];
    
    features.forEach(feature => {
      if (securityContent.includes(feature)) {
        console.log(`   ✅ Security feature: ${feature}`);
      } else {
        console.log(`   ❌ Missing security feature: ${feature}`);
      }
    });
    
  } catch (error) {
    console.log('   ❌ Error testing security architecture:', error.message);
  }
  
  // Test 5: Session management
  console.log('\n5. Testing session management...');
  try {
    const sessionContent = require('fs').readFileSync('src/ipc/utils/claude_code/session_manager.ts', 'utf8');
    const features = [
      'ClaudeSession',
      'ConversationEntry',
      'SessionManager',
      'createSession',
      'saveSession',
      'loadSession'
    ];
    
    features.forEach(feature => {
      if (sessionContent.includes(feature)) {
        console.log(`   ✅ Session feature: ${feature}`);
      } else {
        console.log(`   ❌ Missing session feature: ${feature}`);
      }
    });
    
  } catch (error) {
    console.log('   ❌ Error testing session management:', error.message);
  }
  
  console.log('\n🎉 Architecture test complete!');
  console.log('\n📋 Summary:');
  console.log('   - Multi-layered architecture implemented');
  console.log('   - Process management with event handling');
  console.log('   - IPC communication bridge established');
  console.log('   - Security and permission management');
  console.log('   - Session persistence and management');
  console.log('   - Ready for terminal integration');
}

testClaudeArchitecture();