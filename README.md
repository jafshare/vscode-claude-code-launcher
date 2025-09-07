# Claude Code Quick Launch

一个 VSCode 扩展，能够基于当前目录快速打开 Claude Code，提供便捷的命令和配置选项

## 功能特性

- 🚀 **快速启动** - 使用 `Ctrl + Shift + P` 面板快速启动 Claude Code
- 🛠️ **灵活配置** - 支持配置 Claude Code 路径、启动参数和工作目录
- 🔧 **命令配置** - 通过 VSCode 命令面板进行配置
- 📢 **通知系统** - 可配置的操作通知提示
- 🖥️ **终端选择** - 支持系统终端和 VSCode 集成终端

## 安装

### 从 VSCode Marketplace 安装（推荐）

1. 打开 VSCode
2. 按 `Ctrl+Shift+X` 打开扩展面板
3. 搜索 "Claude Code Quick Launch"
4. 点击 "安装"

### 从源码安装

```bash
# 克隆仓库
git clone https://github.com/jafshare/vscode-claude-code-launcher.git
cd vscode-claude-code-launcher

# 安装依赖
bun install

# 构建扩展
bun run build

# 打包扩展
bun run package
```

## 使用方法

### 命令面板

按 `Ctrl+Shift+P` 打开命令面板，搜索 "Claude Code" 可以使用以下命令：

- **Claude Code: 启动 Claude Code** - 启动 Claude Code
- **Claude Code: 打开设置** - 打开 VSCode 设置页面进行配置
- **Claude Code: 配置 Claude Code 路径** - 设置 Claude Code 可执行文件路径
- **Claude Code: 配置启动参数** - 设置启动时的命令行参数
- **Claude Code: 重置所有设置** - 恢复到默认配置

## 配置选项

### 命令配置

通过 VSCode 命令面板 (`Ctrl+Shift+P`) 进行配置：

- **Claude Code: 配置 Claude Code 路径** - 设置 Claude Code 可执行文件路径
- **Claude Code: 配置启动参数** - 设置启动时的命令行参数
- **Claude Code: 重置所有设置** - 恢复到默认配置

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `claudeCode.path` | string | `""` | Claude Code 可执行文件的完整路径，如果为空将自动检测 |
| `claudeCode.defaultWorkingDirectory` | string | `"${workspaceFolder}"` | 默认工作目录，支持变量：`${workspaceFolder}`, `${home}` |
| `claudeCode.launchArgs` | string | `""` | 启动 Claude Code 时的命令行参数 |
| `claudeCode.showNotifications` | boolean | `true` | 是否显示通知消息 |
| `claudeCode.terminalType` | string | `"system"` | 终端类型：`system` 使用系统终端，`vscode` 使用 VSCode 集成终端 |

### 支持的变量

- `${workspaceFolder}` - 当前工作区文件夹路径
- `${home}` - 用户主目录路径
- `${userHome}` - 用户主目录路径（同 `${home}`）

## 开发

### 环境要求

- Bun
- VSCode >= 1.96.0

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/jafshare/vscode-claude-code-launcher.git
cd vscode-claude-code-launcher

# 安装依赖
bun install

# 启动开发模式
bun run dev
```

### 可用命令

```bash
# 构建扩展
bun run build

# 开发模式（监听文件变化）
bun run dev
bun run watch

# 运行测试
bun test

# 代码检查和格式化
bun run lint
```

### 项目结构

```
src/
├── extension.ts              # 扩展入口文件
├── extension.test.ts         # 扩展测试文件
├── manager/                  # 核心业务逻辑
│   ├── claudeCodeManager.ts  # Claude Code 启动管理
│   ├── configManager.ts      # 配置管理
│   └── commandManager.ts     # 命令管理
├── utils/                    # 工具函数
│   ├── path.ts               # 路径处理工具
│   └── process.ts            # 进程管理工具
└── types/                    # 类型定义
    ├── common.d.ts           # 通用类型
    └── config.d.ts           # 配置类型
```

## 故障排除

### 常见问题

#### 1. Claude Code 无法启动

**问题**：点击启动按钮后没有反应

**解决方案**：
1. 检查 Claude Code 是否已正确安装
2. 确认 `claudeCode.path` 配置是否正确
3. 查看 VSCode 开发者控制台是否有错误信息

#### 2. 路径配置错误

**问题**：配置的路径无法找到 Claude Code

**解决方案**：
- Windows：检查路径是否正确，如 `%USERPROFILE%\scoop\shims\claude-code`
- macOS：检查路径是否为 `/usr/local/bin/claude-code`
- Linux：检查路径是否为 `/usr/bin/claude-code`

#### 3. 工作目录问题

**问题**：Claude Code 启动后工作目录不正确

**解决方案**：
1. 检查 `claudeCode.defaultWorkingDirectory` 配置
2. 确认变量语法是否正确
3. 验证目标目录是否存在

## 贡献

欢迎提交问题和功能请求！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 支持

如果你觉得这个扩展对你有帮助，请给个 ⭐️ Star！

### 反馈和问题

- 提交问题：[GitHub Issues](https://github.com/jafshare/vscode-claude-code-launcher/issues)