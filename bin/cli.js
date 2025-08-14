#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { initProject, generateApi, watchFiles } = require('../lib/generator');
const packageJson = require('../package.json');

const program = new Command();

program
  .name('openapi-node-gen')
  .description('CLI tool for generating API client code and documentation using OpenAPI')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize a new OpenAPI project')
  .option('-n, --name <name>', 'Project name')
  .option('-d, --dir <directory>', 'Target directory', '.')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 Initializing OpenAPI project...'));
      await initProject(options);
      console.log(chalk.green('✅ Project initialized successfully!'));
    } catch (error) {
      console.error(chalk.red('❌ Error initializing project:'), error.message);
      process.exit(1);
    }
  });

program
  .command('generate')
  .description('Generate API client code and documentation')
  .option('-i, --input <file>', 'OpenAPI specification file (YAML or JSON)')
  .option('-o, --output <directory>', 'Output directory', './generated')
  .option('-g, --generator <generator>', 'Generator type', 'typescript-node')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🔧 Generating API client code...'));
      await generateApi(options);
      console.log(chalk.green('✅ API client code generated successfully!'));
    } catch (error) {
      console.error(chalk.red('❌ Error generating API code:'), error.message);
      process.exit(1);
    }
  });

program
  .command('watch')
  .description('Watch OpenAPI files for changes and auto-generate')
  .option('-i, --input <file>', 'OpenAPI specification file to watch')
  .option('-o, --output <directory>', 'Output directory', './generated')
  .option('-g, --generator <generator>', 'Generator type', 'typescript-node')
  .action(async (options) => {
    try {
      console.log(chalk.blue('👀 Watching for file changes...'));
      await watchFiles(options);
    } catch (error) {
      console.error(chalk.red('❌ Error watching files:'), error.message);
      process.exit(1);
    }
  });

program.parse();