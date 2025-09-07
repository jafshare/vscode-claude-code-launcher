/**
 * 平台类型枚举
 */
export enum Platform {
  Windows = "win32",
  macOS = "darwin",
  Linux = "linux"
}

/**
 * 命令信息接口
 */
export interface CommandInfo {
  id: string;
  title: string;
  category: string;
  handler: () => Promise<void>;
}

/**
 * 日志级别枚举
 */
export enum LogLevel {
  Debug = "debug",
  Info = "info",
  Warn = "warn",
  Error = "error"
}

/**
 * 日志消息接口
 */
export interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: string;
}
