import * as vscode from "vscode";
import type {
  ExtensionConfig,
  IConfigManager,
  ValidationResult
} from "../types/config";
import { normalizePath } from "../utils/path";

/**
 * 默认配置
 */
const DEFAULT_CONFIG: ExtensionConfig = {
  claudeCodePath: "",
  defaultWorkingDirectory: "${workspaceFolder}",
  launchArgs: "",
  showNotifications: true,
  terminalType: "vscode"
};

/**
 * 配置管理器实现
 */
export class ConfigManager implements IConfigManager {
  private context: vscode.ExtensionContext;
  private config: ExtensionConfig;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.config = this.loadConfig();
  }

  /**
   * 加载配置
   */
  private loadConfig(): ExtensionConfig {
    try {
      const globalState = this.context.globalState;
      const savedConfig = globalState.get<ExtensionConfig>("claudeCodeConfig");

      // 从 VSCode 设置中读取配置
      const vscodeConfig = vscode.workspace.getConfiguration();
      const path = vscodeConfig.get<string>("claudeCode.path", "");
      const defaultWorkingDirectory = vscodeConfig.get<string>(
        "claudeCode.defaultWorkingDirectory",
        "${workspaceFolder}"
      );
      const launchArgs = vscodeConfig.get<string>("claudeCode.launchArgs", "");
      const showNotifications = vscodeConfig.get<boolean>(
        "claudeCode.showNotifications",
        true
      );
      const terminalType = vscodeConfig.get<"system" | "vscode">(
        "claudeCode.terminalType",
        "system"
      );

      // 优先使用 VSCode 设置中的值
      const finalConfig = {
        ...DEFAULT_CONFIG,
        ...(savedConfig || {}),
        claudeCodePath: path,
        defaultWorkingDirectory,
        launchArgs,
        showNotifications,
        terminalType
      };

      return finalConfig;
    } catch (error) {
      return { ...DEFAULT_CONFIG };
    }
  }

  /**
   * 保存配置
   */
  private async saveConfig(): Promise<void> {
    const globalState = this.context.globalState;
    await globalState.update("claudeCodeConfig", this.config);
  }

  /**
   * 获取配置值
   */
  public get<T extends keyof ExtensionConfig>(key: T): ExtensionConfig[T] {
    return this.config[key];
  }

  /**
   * 设置配置值
   */
  public async set<T extends keyof ExtensionConfig>(
    key: T,
    value: ExtensionConfig[T]
  ): Promise<void> {
    this.config[key] = value;
    await this.saveConfig();

    // 同时更新 VSCode 设置
    const config = vscode.workspace.getConfiguration();
    const settingMap: Record<keyof ExtensionConfig, string> = {
      claudeCodePath: "claudeCode.path",
      defaultWorkingDirectory: "claudeCode.defaultWorkingDirectory",
      launchArgs: "claudeCode.launchArgs",
      showNotifications: "claudeCode.showNotifications",
      terminalType: "claudeCode.terminalType"
    };

    await config.update(
      settingMap[key],
      value,
      vscode.ConfigurationTarget.Global
    );
  }

  /**
   * 获取所有配置
   */
  public getAll(): ExtensionConfig {
    return { ...this.config };
  }

  /**
   * 重置配置到默认值
   */
  public async reset(): Promise<void> {
    // 重置 globalState 中的配置
    this.config = { ...DEFAULT_CONFIG };
    await this.saveConfig();

    // 重置 settings.json 中的配置
    const config = vscode.workspace.getConfiguration();
    await config.update(
      "claudeCode.path",
      undefined,
      vscode.ConfigurationTarget.Global
    );
    await config.update(
      "claudeCode.defaultWorkingDirectory",
      undefined,
      vscode.ConfigurationTarget.Global
    );
    await config.update(
      "claudeCode.launchArgs",
      undefined,
      vscode.ConfigurationTarget.Global
    );
    await config.update(
      "claudeCode.showNotifications",
      undefined,
      vscode.ConfigurationTarget.Global
    );
    await config.update(
      "claudeCode.terminalType",
      undefined,
      vscode.ConfigurationTarget.Global
    );

    this.showNotification("配置已重置到默认值", "info");
  }

  /**
   * 获取 Claude Code 路径
   */
  public async getClaudeCodePath(): Promise<string> {
    try {
      let path = this.config.claudeCodePath;

      // 如果路径为空，默认使用 claude 命令
      if (!path) {
        path = "claude";
      }

      // 规范化路径
      if (path) {
        path = normalizePath(path);
      }

      return path || "";
    } catch (error) {
      return "";
    }
  }

  /**
   * 获取工作目录
   */
  public getWorkingDirectory(): string {
    if (!this.config.defaultWorkingDirectory) return "";
    const path = normalizePath(this.config.defaultWorkingDirectory);
    return path;
  }

  /**
   * 显示通知消息
   */
  public showNotification(
    message: string,
    type: "info" | "warning" | "error"
  ): void {
    if (!this.config.showNotifications) {
      return;
    }

    try {
      switch (type) {
        case "info":
          vscode.window.showInformationMessage(message);
          break;
        case "warning":
          vscode.window.showWarningMessage(message);
          break;
        case "error":
          vscode.window.showErrorMessage(message);
          break;
      }
    } catch (error) {}
  }

  /**
   * 配置 Claude Code 路径
   */
  public async configureClaudeCodePath(): Promise<void> {
    try {
      const currentPath = await this.getClaudeCodePath();

      const inputPath = await vscode.window.showInputBox({
        title: "配置 Claude Code 路径",
        value: currentPath,
        placeHolder: "输入 Claude Code 可执行文件的完整路径",
        prompt: "例如: /usr/local/bin/claude-code"
      });

      if (inputPath) {
        await this.set("claudeCodePath", inputPath);
        this.showNotification("Claude Code 路径已更新", "info");
      }
    } catch (error) {
      this.showNotification("配置路径失败", "error");
    }
  }

  /**
   * 配置启动参数
   */
  public async configureLaunchArgs(): Promise<void> {
    try {
      const currentArgs = this.config.launchArgs;

      const inputArgs = await vscode.window.showInputBox({
        title: "配置启动参数",
        value: currentArgs,
        placeHolder: "输入启动参数，用空格分隔",
        prompt: "例如: --debug --verbose"
      });

      if (inputArgs !== undefined) {
        await this.set("launchArgs", inputArgs);
        this.showNotification("启动参数已更新", "info");
      }
    } catch (error) {
      this.showNotification("配置启动参数失败", "error");
    }
  }

  /**
   * 配置终端类型
   */
  public async configureTerminalType(): Promise<void> {
    try {
      const currentType = this.config.terminalType;

      const options: vscode.QuickPickItem[] = [
        {
          label: "系统终端",
          description: "使用系统默认终端",
          detail: "在新窗口中打开系统终端",
          picked: currentType === "system"
        },
        {
          label: "VSCode 集成终端",
          description: "使用 VSCode 内置终端",
          detail: "在 VSCode 中打开集成终端",
          picked: currentType === "vscode"
        }
      ];

      const selected = await vscode.window.showQuickPick(options, {
        title: "选择终端类型",
        placeHolder: "请选择启动 Claude Code 时使用的终端类型",
        canPickMany: false
      });

      if (selected) {
        const terminalType =
          selected.label === "系统终端" ? "system" : "vscode";
        await this.set("terminalType", terminalType);
        this.showNotification(`终端类型已设置为: ${selected.label}`, "info");
      }
    } catch (error) {
      this.showNotification("配置终端类型失败", "error");
    }
  }

  /**
   * 打开设置
   */
  public async openSettings(): Promise<void> {
    try {
      // 打开VSCode设置页面，直接定位到Claude Code配置
      await vscode.commands.executeCommand(
        "workbench.action.openSettings",
        "claudeCode"
      );
    } catch (error) {
      this.showNotification("打开设置失败", "error");
    }
  }
}
