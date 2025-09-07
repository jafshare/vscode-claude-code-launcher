/**
 * 扩展配置接口
 */
export interface ExtensionConfig {
  // Claude Code 可执行文件路径
  claudeCodePath: string;
  // 默认工作目录
  defaultWorkingDirectory: string;
  // 启动 Claude Code 时的额外参数
  launchArgs: string;
  // 是否显示通知消息
  showNotifications: boolean;
  // 终端类型：'system' 使用系统终端，'vscode' 使用 VSCode 集成终端
  terminalType: "system" | "vscode";
}

/**
 * 配置验证结果
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * 配置管理器接口
 */
export interface IConfigManager {
  get<T extends keyof ExtensionConfig>(key: T): ExtensionConfig[T];
  set<T extends keyof ExtensionConfig>(
    key: T,
    value: ExtensionConfig[T]
  ): Promise<void>;
  getAll(): ExtensionConfig;
  reset(): Promise<void>;
  getClaudeCodePath(): Promise<string>;
  getWorkingDirectory(): string;
  showNotification(message: string, type: "info" | "warning" | "error"): void;
}
