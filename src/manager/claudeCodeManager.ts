import { spawn } from "node:child_process";
import * as vscode from "vscode";
import type { ConfigManager } from "./configManager";

/**
 * Claude Code 管理器
 */
export class ClaudeCodeManager {
  private configManager: ConfigManager;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
  }

  /**
   * 启动 Claude Code
   */
  public async launch(options?: {
    workingDirectory?: string;
    args?: string[];
  }): Promise<void> {
    try {
      const claudeCodePath = await this.configManager.getClaudeCodePath();

      if (!claudeCodePath) {
        throw new Error("Claude Code 路径未配置");
      }

      const workingDirectory =
        options?.workingDirectory || this.configManager.getWorkingDirectory();
      if (!workingDirectory) {
        throw new Error("无可用的目录");
      }

      const launchArgs = this.configManager.get("launchArgs");
      const terminalType = this.configManager.get("terminalType");
      const args = launchArgs
        ? launchArgs.split(" ").filter((arg) => arg.trim())
        : [];
      const allArgs = [...args, ...(options?.args || [])];

      if (terminalType === "vscode") {
        console.log(">>> vscode");
        await this.launchInVSCodeTerminal(
          claudeCodePath,
          allArgs,
          workingDirectory
        );
      } else {
        await this.launchInSystemTerminal(
          claudeCodePath,
          allArgs,
          workingDirectory
        );
      }

      this.configManager.showNotification("Claude Code 已启动", "info");
    } catch (error) {
      this.configManager.showNotification(
        `启动 Claude Code 失败: ${
          error instanceof Error ? error.message : String(error)
        }`,
        "error"
      );
      throw error;
    }
  }

  /**
   * 在 VSCode 集成终端中启动 Claude Code
   */
  private async launchInVSCodeTerminal(
    claudeCodePath: string,
    args: string[],
    workingDirectory: string
  ): Promise<void> {
    const terminal = vscode.window.createTerminal({
      name: "Claude Code",
      cwd: workingDirectory
    });

    // 构建命令
    const command = `${claudeCodePath} ${args.join(" ")}`;

    terminal.show();
    terminal.sendText(command);
  }

  /**
   * 在系统终端中启动 Claude Code
   */
  private async launchInSystemTerminal(
    claudeCodePath: string,
    args: string[],
    workingDirectory: string
  ): Promise<void> {
    spawn(claudeCodePath, args, {
      cwd: workingDirectory,
      stdio: "inherit",
      shell: process.platform === "win32",
      detached: true
    });
  }

  /**
   * 清理资源
   */
  public dispose(): void {
    // 无需清理，进程独立运行
  }
}
