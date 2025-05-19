const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const { execCommand, writeFileWithCorrectLineEndings } = require('../utils/execCommand');

const router = express.Router();

const PASSWORD = process.env.PASSWORD;
const GIT_CONFIG = {
  repoName: process.env.REPONAME,
  userName: process.env.GIT_USER_NAME,
  userEmail: process.env.USEREMAIL,
  personalAccessToken: process.env.PERSONALACCESSTOKEN,
};
console.log('🚀 Using GitHub configuration:', GIT_CONFIG);


router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    return res.status(200).json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid password' });
});

const escapePowerShellContent = (str) =>
  str.replace(/'/g, "''").replace(/`/g, '``').replace(/\$/g, '`$').replace(/"/g, '`"');

/**
 * Create GitHub repository if it doesn't exist
 */
// async function createGitHubRepo() {
//   console.log('🚀 Creating GitHub repository...');
  
//   const createRepoCommand = process.platform === 'win32'
//     ? `curl -X POST -H "Authorization: token ${GIT_CONFIG.personalAccessToken}" -H "Accept: application/vnd.github.v3+json" https://api.github.com/user/repos -d "{\\"name\\":\\"${GIT_CONFIG.repoName}\\",\\"private\\":false}"`
//     : `curl -X POST -H "Authorization: token ${GIT_CONFIG.personalAccessToken}" -H "Accept: application/vnd.github.v3+json" https://api.github.com/user/repos -d '{"name":"${GIT_CONFIG.repoName}","private":false}'`;

//   try {
//     await execCommand(createRepoCommand, 'Failed to create GitHub repository');
//     console.log('✅ GitHub repository created successfully');
//     return true;
//   } catch (error) {
//     if (error.message.includes('Repository creation failed') || 
//         error.message.includes('already exists') || 
//         error.message.includes('name already exists on this account')) {
//       console.log('⚠️ Repository might already exist, continuing...');
//       return true;
//     }
//     console.error('❌ Failed to create GitHub repository:', error.message);
//     throw error;
//   }
// }

// /**
//  * Setup Git config files with proper line ending settings
//  */
// async function setupGitConfigFiles(repoPath) {
//   console.log('📝 Setting up Git configuration files...');
  
//   // Create .gitattributes for line ending normalization
//   const gitattributesContent = 
// `# Set default behavior to automatically normalize line endings
// * text=auto

// # Explicitly declare text files to be normalized
// *.js text
// *.md text
// *.py text
// *.java text
// *.cpp text
// *.ts text
// *.json text
// *.html text
// *.css text

// # Force Git to use LF for these files
// *.sh text eol=lf
// .gitattributes text eol=lf

// # Windows-specific files should use CRLF
// *.bat text eol=crlf
// *.cmd text eol=crlf
// `;

//   await writeFileWithCorrectLineEndings(path.join(repoPath, '.gitattributes'), gitattributesContent);
//   console.log('✅ .gitattributes file created');
  
//   return true;
// }

/**
 * Initialize or verify Git repository
 */
const initializeGitRepo = async (projectPath, githubUsername, repoName) => {
  try {
    console.log('🚀 Starting Git repository initialization...');
    console.log('👤 GitHub Username:', githubUsername);
    console.log('📦 Repository Name:', repoName);
    console.log('📂 Repo directory:', projectPath);

    const runInRepo = (cmd) => execCommand(`cd "${projectPath}" && ${cmd}`);

    try {
      await fs.access(path.join(projectPath, '.git'));
      console.log('✅ Git repository already initialized');
    } catch {
      console.log('📁 Initializing new Git repository...');
      await runInRepo('git init');
    }

    await runInRepo(`git config user.name "${GIT_CONFIG.userName}"`);
    await runInRepo(`git config user.email "${GIT_CONFIG.userEmail}"`);

    try {
      await runInRepo('git remote remove origin');
    } catch {
      console.log('ℹ️ No existing remote to remove');
    }

    const remoteUrl = `https://${GIT_CONFIG.personalAccessToken}@github.com/${githubUsername}/${repoName}.git`;
    await runInRepo(`git remote add origin "${remoteUrl}"`);

    try {
      const branch = (await runInRepo('git rev-parse --abbrev-ref HEAD')).trim();
      console.log(`✅ Current Git branch: ${branch}`);
    } catch {
      console.log('🌱 HEAD not found — setting up main branch with initial commit...');
      await runInRepo('git checkout -b main');
      await runInRepo('git commit --allow-empty -m "Initial commit"');
    }

    console.log('✅ Repo is ready inside leetcode-repo folder');
    return true;
  } catch (err) {
    console.error('💥 Repo init failed:', err.message);
    throw err;
  }
};




router.post('/save-solution', async (req, res) => {
  console.log('📝 Starting solution save process...');
  
  try {
    const { questionNumber, questionName, questionDescription, notes, code, language } = req.body;

    if (!GIT_CONFIG.userName || !GIT_CONFIG.repoName) {
      throw new Error('GitHub username or repository name is not configured properly');
    }

    console.log('🔍 Git Configuration:', {
      username: GIT_CONFIG.userName,
      repoName: GIT_CONFIG.repoName,
      email: GIT_CONFIG.userEmail
    });

    const repoPath = path.join(__dirname, '../leetcode-repo');
    
    await initializeGitRepo(repoPath, GIT_CONFIG.userName, GIT_CONFIG.repoName);
    
    // Prepare content
    const readmeContent = `
# ${questionNumber}. ${questionName}

## Problem:
${questionDescription}

## Notes:
${notes || 'N/A'}
    `.trim();
    
    const languageToExtension = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      c_cpp: 'cpp',
      ruby: 'rb',
      rust: 'rs',
      golang: 'go',
    };
    
    const extension = languageToExtension[language] || 'txt';
    const solutionFileName = `solution.${extension}`;
    const subFolderName = `${questionNumber}.${questionName}`.replace(/[<>:"/\\|?*]/g, '-');
    const subFolderPath = path.join(repoPath, subFolderName);
    const readmePath = path.join(subFolderPath, 'README.md');
    const solutionPath = path.join(subFolderPath, solutionFileName);
    
    // Create directory for the solution
    await fs.mkdir(subFolderPath, { recursive: true });
    console.log(`📁 Created solution directory: ${subFolderName}`);
    
    // Write files with normalized line endings
    await writeFileWithCorrectLineEndings(readmePath, readmeContent);
    await writeFileWithCorrectLineEndings(solutionPath, code);
    
    console.log('🔄 Committing changes to repository...');
    const gitLockPath = path.join(repoPath, '.git', 'HEAD.lock');
try {
  await fs.unlink(gitLockPath);
  console.log('⚠️ Removed existing HEAD.lock file');
} catch (_) {
  // File not found is fine
}
// await execCommand(`cd "${repoPath}" && git rebase --abort`, 'Failed to abort rebase (if any)');
    try {
      await execCommand(`cd "${repoPath}" && git add .`, 'Failed to stage files');
      await execCommand(
        `cd "${repoPath}" && git commit -m "${escapePowerShellContent(`Add solution for ${questionNumber}. ${questionName}`)}"`, 
        'Failed to commit files'
      );
      
      await execCommand(
        `cd "${repoPath}" && git push -f origin main`, 
        'Failed to push to GitHub'
      );
      
      console.log('✅ Changes pushed to GitHub successfully');
    } catch (error) {
      console.error('💥 Git operation failed:', error.message);
      throw error;
    }

    res.status(200).json({ 
      message: 'Solution saved and pushed to GitHub',
      repositoryUrl: `https://github.com/${GIT_CONFIG.userName}/${GIT_CONFIG.repoName}`
    });
  } catch (error) {
    console.error('💥 Error:', error.message);
    res.status(500).json({ 
      message: 'Failed to save and push solution', 
      error: error.message,
      gitConfig: {
        username: GIT_CONFIG.userName,
        repoName: GIT_CONFIG.repoName,
        isConfigValid: Boolean(GIT_CONFIG.userName && GIT_CONFIG.repoName)
      }
    });
  }
});

module.exports = router;