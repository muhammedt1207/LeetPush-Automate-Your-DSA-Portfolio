const { exec } = require('child_process');
const util = require('util');
const fs = require('fs').promises;
const path = require('path');

const execPromise = util.promisify(exec);

/**
 * Writes a file with proper line endings
 */
const writeFileWithCorrectLineEndings = async (filePath, content) => {
  try {
    // Create directory if it doesn't exist
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    // Normalize line endings to LF
    const normalizedContent = content.replace(/\r\n/g, '\n');
    
    await fs.writeFile(filePath, normalizedContent, 'utf8');
    console.log(`✅ File written successfully: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to write file ${filePath}: ${error.message}`);
    throw new Error(`Failed to write file: ${error.message}`);
  }
};

/**
 * Execute shell commands with better error handling and logging
 */
// const execCommand = async (command, errorMessage) => {
//   console.log(`🔄 Executing command: ${command.replace(/token [^\s]+/, 'token ***')}`);
  
//   try {
//     // Handle PowerShell file writing
//     if (command.startsWith('powershell -Command') && command.includes('WriteAllText')) {
//       const matches = command.match(/WriteAllText\('([^']+)',\s*\$content\)/);
//       if (matches && matches[1]) {
//         const filePath = matches[1];
//         const content = command.split("@'\n")[1].split("\n'@")[0];
//         await writeFileWithCorrectLineEndings(filePath, content);
//         return '';
//       }
//     }
    
//     // Handle Unix file writing
//     if (command.includes('cat >') && command.includes("<< 'EOL'")) {
//       const parts = command.split("<< 'EOL'");
//       const filePath = parts[0].replace('cat > ', '').replace(/^['"]|['"]$/g, '').trim();
//       const contentParts = parts[1].split('\nEOL');
//       const content = contentParts[0].trim();
      
//       await writeFileWithCorrectLineEndings(filePath, content);
//       return '';
//     }

//     // Execute the command with timeout
//     const { stdout, stderr } = await execPromise(command, { 
//       timeout: 60000, // 60 second timeout
//       maxBuffer: 1024 * 1024 * 10 // 10MB buffer
//     });
    
//     // Log output for debugging
//     if (stdout) console.log(`📤 Command output: ${stdout.substring(0, 200)}${stdout.length > 200 ? '...' : ''}`);
    
//     // Handle warnings vs errors in stderr
//     if (stderr) {
//       if (stderr.includes('warning:') || stderr.includes('hint:')) {
//         console.log(`⚠️ Command warning: ${stderr}`);
//       } else {
//         console.error(`❌ Command error output: ${stderr}`);
//         throw new Error(stderr);
//       }
//     }
    
//     return stdout;
//   } catch (error) {
//     // Enhanced error logging
//     console.error(`💥 Command execution failed: ${errorMessage}`);
//     console.error(`💥 Error details: ${error.message}`);
    
//     // Special handling for common git errors
//     if (error.message.includes('not a git repository')) {
//       throw new Error(`${errorMessage}: Git repository not initialized correctly`);
//     } else if (error.message.includes('Authentication failed')) {
//       throw new Error(`${errorMessage}: GitHub authentication failed. Check your personal access token`);
//     } else if (error.message.includes('remote origin already exists')) {
//       // This is not actually an error in our context
//       console.log('⚠️ Remote origin already exists, continuing...');
//       return '';
//     } else {
//       throw new Error(`${errorMessage}: ${error.message}`);
//     }
//   }
// };
function execCommand(command, errorMessage = 'Command failed') {
  return new Promise((resolve, reject) => {
    exec(command, { shell: true }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ ${errorMessage}`);
        console.error(stderr || error.message);
        return reject(new Error(`${errorMessage}: ${stderr || error.message}`));
      }
      resolve(stdout); // do NOT reject if there's just stdout
    });
  });   
}
module.exports = { execCommand, writeFileWithCorrectLineEndings };