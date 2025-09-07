import type * as vscode from "vscode";
import { ClaudeCodeManager } from "./manager/claudeCodeManager";
import { CommandManager } from "./manager/commandManager";
import { ConfigManager } from "./manager/configManager";

/**
 * 扩展上下文
 */
let extensionContext: vscode.ExtensionContext | null = null;

/**
 * 获取扩展上下文
 */
export function getExtensionContext(): vscode.ExtensionContext {
  if (!extensionContext) {
    throw new Error("扩展未激活");
  }
  return extensionContext;
}

/**
 * 激活扩展
 */
export function activate(context: vscode.ExtensionContext): void {
  try {
    extensionContext = context;

    // 初始化管理器
    const configManager = new ConfigManager(context);
    const commandManager = new CommandManager(context);
    const claudeCodeManager = new ClaudeCodeManager(configManager);

    // 注册命令
    registerCommands(commandManager, claudeCodeManager, configManager);

    // 添加到订阅列表
    context.subscriptions.push({
      dispose: () => {
        claudeCodeManager.dispose();
        commandManager.dispose();
      }
    });
  } catch (error) {
    console.error("Extension activation failed:", error);
  }
}

/**
 * 注册所有命令
 */
function registerCommands(
  commandManager: CommandManager,
  claudeCodeManager: ClaudeCodeManager,
  configManager: ConfigManager
): void {
  const commands = [
    {
      id: "claudeCode.launch",
      title: "启动 Claude Code",
      category: "Claude Code",
      handler: async () => {
        await claudeCodeManager.launch();
      }
    },
    {
      id: "claudeCode.configurePath",
      title: "配置 Claude Code 路径",
      category: "Claude Code",
      handler: async () => {
        await configManager.configureClaudeCodePath();
      }
    },
    {
      id: "claudeCode.configureArgs",
      title: "配置启动参数",
      category: "Claude Code",
      handler: async () => {
        await configManager.configureLaunchArgs();
      }
    },
    {
      id: "claudeCode.resetSettings",
      title: "重置所有设置",
      category: "Claude Code",
      handler: async () => {
        await configManager.reset();
      }
    },
    {
      id: "claudeCode.openSettings",
      title: "打开设置",
      category: "Claude Code",
      handler: async () => {
        await configManager.openSettings();
      }
    }
  ];

  commandManager.registerCommands(commands);
}

/**
 * 停用扩展
 */
export function deactivate(): void {
  try {
    // 清理资源
    if (extensionContext) {
      extensionContext = null;
    }
  } catch (error) {
    console.error("Extension deactivation failed:", error);
  }
}
