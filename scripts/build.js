const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

/**
 * 构建脚本 - 准备发布包
 */
async function build() {
  console.log(chalk.blue('🔨 Building package...'));
  
  try {
    // 确保bin目录中的文件有执行权限
    const binPath = path.join(__dirname, '..', 'bin', 'cli.js');
    if (await fs.pathExists(binPath)) {
      await fs.chmod(binPath, '755');
      console.log(chalk.green('✅ Set executable permissions for CLI'));
    }
    
    // 验证package.json
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = await fs.readJson(packagePath);
    
    if (!packageJson.bin) {
      throw new Error('Missing bin field in package.json');
    }
    
    if (!packageJson.main) {
      throw new Error('Missing main field in package.json');
    }
    
    console.log(chalk.green('✅ Package.json validation passed'));
    
    // 检查必要的依赖
    const requiredDeps = [
      '@openapitools/openapi-generator-cli',
      'commander',
      'fs-extra',
      'inquirer',
      'yaml',
      'chokidar',
      'chalk'
    ];
    
    const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
    if (missingDeps.length > 0) {
      throw new Error(`Missing required dependencies: ${missingDeps.join(', ')}`);
    }
    
    console.log(chalk.green('✅ Dependencies validation passed'));
    
    // 创建.npmignore文件
    const npmignore = `# Development files
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Test files
test/
tests/
__tests__/
*.test.js
*.spec.js

# Documentation source
docs-src/

# Build artifacts
build/
dist/

# Temporary files
tmp/
temp/
`;
    
    await fs.writeFile(path.join(__dirname, '..', '.npmignore'), npmignore);
    console.log(chalk.green('✅ Created .npmignore'));
    
    console.log(chalk.green('🎉 Build completed successfully!'));
    
  } catch (error) {
    console.error(chalk.red('❌ Build failed:'), error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  build();
}

module.exports = { build };