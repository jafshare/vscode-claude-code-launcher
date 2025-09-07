import * as vscode from "vscode";
import type { CommandInfo } from "../types/common";

/**
 * 命令管理器实现
 */
export class CommandManager {
  private context: vscode.ExtensionContext;
  private commands: Map<string, CommandInfo> = new Map();

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  /**
   * 注册命令
   */
  public registerCommand(command: CommandInfo): void {
    // 注册到 VSCode
    const disposable = vscode.commands.registerCommand(command.id, async () => {
      try {
        await command.handler();
      } catch (error) {
        vscode.window.showErrorMessage(
          `命令执行失败: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    });

    // 添加到订阅列表
    this.context.subscriptions.push(disposable);

    // 保存命令信息
    this.commands.set(command.id, command);
  }

  /**
   * 执行命令
   */
  public async executeCommand(commandId: string): Promise<void> {
    const command = this.commands.get(commandId);
    if (!command) {
      throw new Error(`命令未找到: ${commandId}`);
    }
    await command.handler();
  }

  /**
   * 获取所有命令
   */
  public getCommands(): CommandInfo[] {
    return Array.from(this.commands.values());
  }

  /**
   * 注销命令
   */
  public unregisterCommand(commandId: string): boolean {
    try {
      if (this.commands.has(commandId)) {
        this.commands.delete(commandId);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * 获取命令信息
   */
  public getCommand(commandId: string): CommandInfo | undefined {
    return this.commands.get(commandId);
  }

  /**
   * 检查命令是否存在
   */
  public hasCommand(commandId: string): boolean {
    return this.commands.has(commandId);
  }

  /**
   * 批量注册命令
   */
  public registerCommands(commands: CommandInfo[]): void {
    for (const command of commands) {
      this.registerCommand(command);
    }
  }

  /**
   * 清理所有命令
   */
  public dispose(): void {
    this.commands.clear();
  }
}
