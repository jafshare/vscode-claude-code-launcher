# VSCode Claude Code 快速启动插件项目规划

## 项目概述

**项目名称**: Claude Code Quick Launch  
**目标**: 开发一个VSCode插件，能够基于当前目录快速打开Claude Code，提供便捷的命令和配置选项，支持跨平台使用。

**技术栈**:
- **核心框架**: VSCode Extension API
- **开发语言**: TypeScript
- **构建工具**: Rslib
- **测试框架**: Vitest
- **代码规范**: Biome
- **包管理**: Bun

## 已明确的决策

- 使用现有的Rslib模板项目作为基础
- 采用模块化架构设计
- 支持Windows、macOS、Linux三大平台
- 提供配置系统支持自定义选项

## 整体架构设计

### 1. 模块结构图

```
src/
├── extension.ts              # 主入口文件
├── manager/
│   ├── claudeCodeManager.ts # Claude Code启动管理器
│   ├── configManager.ts     # 配置管理器
│   └── commandManager.ts    # 命令管理器
├── utils/
│   ├── logger.ts            # 日志工具
│   ├── pathUtils.ts         # 路径处理工具
│   └── processUtils.ts      # 进程处理工具
└── types/
    ├── config.ts            # 配置类型定义
    └── common.ts            # 通用类型定义
```

### 2. 核心功能模块

#### 2.1 ClaudeCodeManager
- **职责**: 管理Claude Code的启动、状态检查和进程管理
- **主要方法**:
  - `launch()`: 启动Claude Code
  - `checkInstallation()`: 检查Claude Code是否已安装
  - `getVersion()`: 获取Claude Code版本
  - `terminate()`: 终止Claude Code进程
  - `isRunning()`: 检查运行状态

#### 2.2 ConfigManager
- **职责**: 管理插件配置的读取、验证和存储
- **主要方法**:
  - `get()`: 获取配置值
  - `set()`: 设置配置值
  - `getAll()`: 获取所有配置
  - `reset()`: 重置配置到默认值

#### 2.3 CommandManager
- **职责**: 管理VSCode命令的注册和执行
- **主要方法**:
  - `registerCommand()`: 注册命令
  - `executeCommand()`: 执行命令
  - `getCommands()`: 获取所有命令

## 详细实施计划

### 阶段 1: 基础架构搭建 (预计8小时)

#### 任务 1.1: 更新插件基本信息
- **目标**: 修改package.json中的插件名称、描述、命令等基本信息
- **输入**: 当前的package.json文件
- **输出**: 更新后的package.json文件
- **涉及文件**: `package.json`
- **预估工作量**: 1小时

#### 任务 1.2: 重构主扩展文件结构
- **目标**: 将extension.ts重构为模块化的代码结构
- **输入**: 当前的extension.ts文件
- **输出**: 模块化的代码结构
- **涉及文件**: `src/extension.ts`
- **预估工作量**: 2小时

#### 任务 1.3: 创建核心功能模块文件
- **目标**: 创建独立的功能模块文件
- **输入**: 模块化设计文档
- **输出**: claudeCodeManager.ts、configManager.ts等核心模块
- **涉及文件**: `src/manager/claudeCodeManager.ts`, `src/manager/configManager.ts`
- **预估工作量**: 3小时

#### 任务 1.4: 创建工具模块
- **目标**: 创建日志、路径处理、进程处理等工具模块
- **输入**: 工具模块需求
- **输出**: logger.ts、pathUtils.ts、processUtils.ts
- **涉及文件**: `src/utils/logger.ts`, `src/utils/pathUtils.ts`, `src/utils/processUtils.ts`
- **预估工作量**: 2小时

### 阶段 2: 核心功能实现 (预计8小时)

#### 任务 2.1: 实现跨平台Claude Code启动功能
- **目标**: 实现能够在不同操作系统上启动Claude Code的功能
- **输入**: 操作系统类型和当前工作目录
- **输出**: 跨平台的Claude Code启动器
- **涉及文件**: `src/manager/claudeCodeManager.ts`
- **预估工作量**: 4小时

#### 任务 2.2: 实现命令系统
- **目标**: 创建VSCode命令，用户可以通过命令面板调用功能
- **输入**: 命令定义和配置
- **输出**: 可用的VSCode命令
- **涉及文件**: `src/extension.ts`, `package.json`
- **预估工作量**: 2小时

#### 任务 2.3: 实现错误处理和日志系统
- **目标**: 添加完善的错误处理和日志记录功能
- **输入**: 错误场景和日志需求
- **输出**: 错误处理机制和日志系统
- **涉及文件**: `src/utils/logger.ts`
- **预估工作量**: 2小时

### 阶段 3: 配置系统设计 (预计5小时)

#### 任务 3.1: 实现配置管理系统
- **目标**: 创建用户配置系统，允许自定义Claude Code启动选项
- **输入**: 配置需求和默认值
- **输出**: 配置管理模块
- **涉及文件**: `src/manager/configManager.ts`
- **预估工作量**: 3小时

#### 任务 3.2: 实现命令面板配置功能
- **目标**: 通过命令面板提供配置选项，支持快速设置和修改
- **输入**: 配置项定义和命令面板需求
- **输出**: 命令面板配置命令和QuickPick实现
- **涉及文件**: `src/manager/configManager.ts`, `src/extension.ts`
- **预估工作量**: 2小时

### 阶段 4: 用户界面完善 (预计4小时)

#### 任务 4.1: 添加快捷键支持
- **目标**: 为常用功能添加快捷键
- **输入**: 快捷键定义
- **输出**: package.json中的keybindings配置
- **涉及文件**: `package.json`
- **预估工作量**: 1小时

#### 任务 4.2: 完善测试覆盖
- **目标**: 为核心功能添加单元测试
- **输入**: 功能模块和测试需求
- **输出**: 测试文件和测试用例
- **涉及文件**: `src/extension.test.ts`
- **预估工作量**: 3小时

## 配置系统设计

### 配置项定义

```typescript
interface ExtensionConfig {
  // Claude Code可执行文件路径
  claudeCodePath: string;
  // 默认工作目录
  defaultWorkingDirectory: string;
  // 启动Claude Code时的额外参数
  launchArgs: string[];
  // 是否显示通知消息
  showNotifications: boolean;
}
```

### 默认配置值

```json
{
  "claudeCode.path": "",
  "claudeCode.defaultWorkingDirectory": "${workspaceFolder}",
  "claudeCode.launchArgs": "",
  "claudeCode.showNotifications": true
}
```

## 命令系统设计

### 基础命令

1. **claudeCode.launch**: 启动Claude Code
2. **claudeCode.terminate**: 终止Claude Code进程
3. **claudeCode.restart**: 重启Claude Code
4. **claudeCode.configurePath**: 配置Claude Code路径
5. **claudeCode.configureArgs**: 配置启动参数
6. **claudeCode.resetSettings**: 重置所有设置

### 快捷键建议

```json
{
  "key": "ctrl+shift+c",
  "command": "claudeCode.launch",
  "when": "!inQuickOpen"
}
```

## 跨平台实现

### 平台检测

```typescript
enum Platform {
  Windows = 'win32',
  macOS = 'darwin',
  Linux = 'linux'
}

function getPlatform(): Platform {
  return process.platform as Platform;
}
```

### 默认路径配置

- **Windows**: `%USERPROFILE%\\scoop\\shims\\claude-code`
- **macOS**: `/usr/local/bin/claude-code`
- **Linux**: `/usr/bin/claude-code`

## 需要明确的技术问题

### 问题 1: Claude Code的安装和检测机制

**选项**:
- **方案 A**: 自动检测常见安装路径（系统PATH、scoop、brew、apt等）
- **方案 B**: 用户手动指定Claude Code路径

### 问题 2: Claude Code的启动方式

**选项**:
- **方案 A**: 使用子进程方式启动（child_process）
- **方案 B**: 使用系统默认终端启动

### 问题 3: 插件的功能范围

**选项**:
- **方案 A**: 仅实现快速启动功能
- **方案 B**: 包含完整的Claude Code集成（启动、状态监控、项目管理等）

## 风险评估

### 技术风险
1. **跨平台兼容性**: 不同操作系统的路径和命令差异
2. **Claude Code API变化**: Claude Code可能存在版本差异
3. **VSCode API兼容性**: VSCode版本更新可能导致API变化

### 缓解措施
1. 使用抽象层封装平台相关代码
2. 设计灵活的配置系统，支持版本适配
3. 使用稳定的API，定期测试兼容性

## 成功标准

1. **功能完整性**: 能够成功启动Claude Code
2. **用户体验**: 提供直观的命令和配置界面
3. **稳定性**: 在各种环境下都能正常工作
4. **可维护性**: 代码结构清晰，便于后续扩展
5. **测试覆盖**: 核心功能有对应的测试用例

## 项目时间线

- **总工作量**: 约25小时
- **阶段1**: 8小时 (基础架构)
- **阶段2**: 8小时 (核心功能)
- **阶段3**: 5小时 (配置系统)
- **阶段4**: 4小时 (界面完善)

## 后续迭代计划

1. **功能扩展**: 添加更多Claude Code集成功能
2. **性能优化**: 优化启动速度和资源占用
3. **用户体验**: 改进界面和交互流程
4. **文档完善**: 添加详细的使用文档和API文档

---

**规划文档版本**: v1.2  
**创建时间**: 2025-09-07  
**最后更新**: 2025-09-07  
**状态**: 已更新（配置系统改为命令面板方式）