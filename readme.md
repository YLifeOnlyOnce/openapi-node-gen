# OpenAPI Node Generator

一个基于 Node.js 的脚手架工具，用于通过 OpenAPI 规范自动生成 API 客户端代码和文档，并支持自动发布到 NPM。

## 功能特性

- 🚀 **快速初始化**: 一键创建完整的 OpenAPI 项目结构
- 🔧 **代码生成**: 基于 openapi-generator-cli 生成多种语言的 API 客户端
- 📚 **文档生成**: 自动生成美观的 API 文档
- 👀 **文件监听**: 监听 OpenAPI 文件变化，自动重新生成代码
- 🔄 **CI/CD 集成**: 内置 GitHub Actions 工作流，自动发布到 NPM
- 📦 **NPM 发布**: 当 OpenAPI 文件变更时自动发布新版本

## 安装

### 全局安装

```bash
npm install -g openapi-node-generator
```

### 项目依赖安装

```bash
npm install openapi-node-generator --save-dev
```

## 使用方法

### 1. 初始化新项目

```bash
# 在当前目录初始化
openapi-node-gen init

# 指定项目名称和目录
openapi-node-gen init --name my-api --dir ./my-project
```

初始化后会创建以下目录结构：

```
my-project/
├── specs/
│   └── api.yaml              # OpenAPI 规范文件
├── generated/                # 生成的客户端代码
├── docs/                     # 生成的文档
├── .github/
│   └── workflows/
│       └── auto-generate.yml # GitHub Actions 工作流
├── openapi.config.json       # 配置文件
├── package.json
└── README.md
```

### 2. 生成 API 客户端代码

```bash
# 使用默认配置生成
openapi-node-gen generate

# 指定输入文件和输出目录
openapi-node-gen generate --input ./specs/api.yaml --output ./generated --generator typescript-node
```

支持的生成器类型：
- `typescript-node` (默认)
- `javascript`
- `python`
- `java`
- `go`
- 更多生成器请参考 [OpenAPI Generator 文档](https://openapi-generator.tech/docs/generators)

### 3. 监听文件变化

```bash
# 监听 specs 目录下的文件变化
openapi-node-gen watch

# 指定监听的文件
openapi-node-gen watch --input ./specs/api.yaml --output ./generated
```

### 4. 编程接口使用

```javascript
const { initProject, generateApi, watchFiles } = require('openapi-node-generator');

// 初始化项目
await initProject({
  name: 'my-api',
  dir: './my-project'
});

// 生成 API 代码
await generateApi({
  input: './specs/api.yaml',
  output: './generated',
  generator: 'typescript-node'
});

// 监听文件变化
await watchFiles({
  input: './specs/**/*.{yaml,yml,json}',
  output: './generated',
  generator: 'typescript-node'
});
```

## 配置文件

`openapi.config.json` 配置文件示例：

```json
{
  "projectName": "my-api",
  "specFile": "./specs/api.yaml",
  "outputDir": "./generated",
  "docsDir": "./docs",
  "generator": "typescript-node",
  "npmRegistry": "https://registry.npmjs.org/",
  "autoPublish": true
}
```

## 自动发布到 NPM

### 设置 GitHub Secrets

1. 在 GitHub 仓库中添加 `NPM_TOKEN` secret
2. 获取 NPM token: `npm token create`
3. 将 token 添加到 GitHub 仓库的 Settings > Secrets and variables > Actions

### 工作流触发条件

当以下文件发生变化时，会自动触发 CI/CD 流程：
- `specs/**/*.yaml`
- `specs/**/*.yml` 
- `specs/**/*.json`

### 发布流程

1. 检测到 OpenAPI 文件变化
2. 自动生成新的客户端代码
3. 更新版本号 (patch)
4. 发布到 NPM
5. 提交生成的文件到仓库

## 命令行选项

### init 命令

```bash
openapi-node-gen init [options]

Options:
  -n, --name <name>        项目名称
  -d, --dir <directory>    目标目录 (默认: .)
  -h, --help              显示帮助信息
```

### generate 命令

```bash
openapi-node-gen generate [options]

Options:
  -i, --input <file>       OpenAPI 规范文件 (YAML 或 JSON)
  -o, --output <directory> 输出目录 (默认: ./generated)
  -g, --generator <type>   生成器类型 (默认: typescript-node)
  -h, --help              显示帮助信息
```

### watch 命令

```bash
openapi-node-gen watch [options]

Options:
  -i, --input <file>       要监听的 OpenAPI 规范文件
  -o, --output <directory> 输出目录 (默认: ./generated)
  -g, --generator <type>   生成器类型 (默认: typescript-node)
  -h, --help              显示帮助信息
```

## 示例项目

查看 [examples](./examples) 目录获取完整的示例项目。

## 依赖要求

- Node.js >= 16.0.0
- NPM >= 7.0.0

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新信息。