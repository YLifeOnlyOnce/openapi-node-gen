# 更新日志

本文档记录了 OpenAPI Node Generator 的所有重要变更。

## [1.0.0] - 2024-01-XX

### 新增功能
- ✨ 初始版本发布
- 🚀 支持通过 CLI 快速初始化 OpenAPI 项目
- 🔧 集成 openapi-generator-cli，支持多种语言的客户端代码生成
- 📚 自动生成 API 文档
- 👀 文件监听功能，自动检测 OpenAPI 文件变化
- 🔄 内置 GitHub Actions 工作流，支持 CI/CD
- 📦 自动发布到 NPM 功能
- 🎯 支持 TypeScript、JavaScript、Python、Java、Go 等多种生成器
- ⚙️ 灵活的配置文件支持
- 🛠️ 完整的命令行工具 (init, generate, watch)

### 支持的生成器
- `typescript-node` (默认)
- `javascript`
- `python`
- `java`
- `go`
- 以及 openapi-generator-cli 支持的所有其他生成器

### 核心功能
- **项目初始化**: 一键创建完整的项目结构
- **代码生成**: 基于 OpenAPI 规范生成客户端代码
- **文档生成**: 自动生成美观的 HTML 文档
- **文件监听**: 实时监听文件变化并自动重新生成
- **CI/CD 集成**: GitHub Actions 自动化工作流
- **NPM 发布**: 自动版本管理和发布

### 技术栈
- Node.js >= 16.0.0
- openapi-generator-cli
- Commander.js (CLI 框架)
- Inquirer.js (交互式命令行)
- Chokidar (文件监听)
- fs-extra (文件系统操作)
- YAML (YAML 解析)
- Chalk (终端颜色输出)

### 项目结构
```
openapi-node-generator/
├── bin/
│   └── cli.js              # CLI 入口文件
├── lib/
│   └── generator.js        # 核心生成器逻辑
├── scripts/
│   └── build.js           # 构建脚本
├── index.js               # 主入口文件
├── package.json           # 项目配置
└── README.md             # 使用文档
```

### 使用示例
```bash
# 全局安装
npm install -g openapi-node-generator

# 初始化项目
openapi-node-gen init --name my-api

# 生成代码
openapi-node-gen generate --input ./specs/api.yaml

# 监听文件变化
openapi-node-gen watch
```

---

## 计划中的功能 (未来版本)

### [1.1.0] - 计划中
- 🔧 支持自定义模板
- 🌐 支持多个 OpenAPI 文件合并
- 📊 生成使用统计和报告
- 🔒 支持 API 认证配置
- 🎨 自定义文档主题

### [1.2.0] - 计划中
- 🐳 Docker 支持
- ☁️ 云平台集成 (AWS, Azure, GCP)
- 🧪 测试代码生成
- 📱 移动端 SDK 生成
- 🔄 增量更新支持

### [2.0.0] - 计划中
- 🎯 图形化界面 (Web UI)
- 🤖 AI 辅助 API 设计
- 📈 性能监控集成
- 🔌 插件系统
- 🌍 国际化支持

---

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 问题反馈

如果您遇到任何问题或有功能建议，请在 [GitHub Issues](https://github.com/your-username/openapi-node-generator/issues) 中提交。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。