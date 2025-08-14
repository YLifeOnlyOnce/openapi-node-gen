# 基础使用示例

这个示例展示了如何使用 OpenAPI Node Generator 创建一个简单的 API 客户端项目。

## 快速开始

### 1. 安装脚手架工具

```bash
npm install -g openapi-node-generator
```

### 2. 初始化项目

```bash
mkdir my-api-project
cd my-api-project
openapi-node-gen init --name my-api
```

### 3. 编辑 OpenAPI 规范

编辑 `specs/api.yaml` 文件，定义你的 API：

```yaml
openapi: 3.0.0
info:
  title: My API
  version: 1.0.0
  description: A simple API example

servers:
  - url: https://api.example.com/v1
    description: Production server

paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        email:
          type: string
          format: email
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - name
        - email

    CreateUserRequest:
      type: object
      properties:
        name:
          type: string
        email:
          type: string
          format: email
      required:
        - name
        - email
```

### 4. 生成客户端代码

```bash
# 安装依赖
npm install

# 生成 API 客户端代码
npm run generate
```

### 5. 使用生成的客户端

```javascript
const { ApiClient, UsersApi } = require('./generated');

// 创建 API 客户端实例
const apiClient = new ApiClient();
apiClient.basePath = 'https://api.example.com/v1';

// 创建 Users API 实例
const usersApi = new UsersApi(apiClient);

// 使用 API
async function example() {
  try {
    // 获取所有用户
    const users = await usersApi.getUsers();
    console.log('Users:', users);

    // 创建新用户
    const newUser = await usersApi.createUser({
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Created user:', newUser);

    // 获取特定用户
    const user = await usersApi.getUserById(newUser.id);
    console.log('User details:', user);
  } catch (error) {
    console.error('API Error:', error);
  }
}

example();
```

### 6. 启用文件监听

在开发过程中，你可以启用文件监听来自动重新生成代码：

```bash
npm run watch
```

现在，每当你修改 `specs/api.yaml` 文件时，客户端代码会自动重新生成。

### 7. 设置自动发布

如果你想要在 OpenAPI 文件变更时自动发布到 NPM：

1. 将项目推送到 GitHub
2. 在 GitHub 仓库设置中添加 `NPM_TOKEN` secret
3. 修改 `specs/api.yaml` 并推送到 main 分支
4. GitHub Actions 会自动生成代码并发布到 NPM

## 项目结构

生成的项目结构如下：

```
my-api-project/
├── specs/
│   └── api.yaml              # OpenAPI 规范文件
├── generated/                # 生成的客户端代码
│   ├── api/
│   ├── model/
│   └── index.js
├── docs/                     # 生成的 API 文档
├── .github/
│   └── workflows/
│       └── auto-generate.yml # GitHub Actions 工作流
├── openapi.config.json       # 配置文件
├── package.json
└── README.md
```

## 配置选项

你可以通过编辑 `openapi.config.json` 来自定义生成行为：

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

## 支持的生成器

- `typescript-node` - TypeScript Node.js 客户端
- `javascript` - JavaScript 客户端
- `python` - Python 客户端
- `java` - Java 客户端
- `go` - Go 客户端
- 更多生成器请参考 [OpenAPI Generator 文档](https://openapi-generator.tech/docs/generators)

## 下一步

- 查看 [高级用法示例](../advanced-usage/README.md)
- 了解 [自定义配置](../custom-config/README.md)
- 探索 [CI/CD 集成](../cicd-integration/README.md)