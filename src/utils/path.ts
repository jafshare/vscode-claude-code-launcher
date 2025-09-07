import fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import * as vscode from "vscode";
import type { Platform } from "../types/common";

/**
 * 获取当前平台
 */
export function getPlatform(): Platform {
  return process.platform as Platform;
}

/**
 * 获取用户主目录
 */
export function getHomeDirectory(): string {
  return os.homedir();
}

/**
 * 获取当前工作目录
 */
export function getCurrentWorkingDirectory(): string {
  return process.cwd();
}

/**
 * 解析路径中的环境变量
 */
export function resolvePathWithEnv(inputPath: string): string {
  return inputPath.replace(/\$\{([^}]+)\}/g, (match, envVar) => {
    switch (envVar) {
      case "workspaceFolder":
        return getWorkspaceFolder();
      case "home":
        return getHomeDirectory();
      case "userHome":
        return getHomeDirectory();
      default:
        return process.env[envVar] || match;
    }
  });
}

/**
 * 获取 VSCode 工作区目录
 */
export function getWorkspaceFolder(): string {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (workspaceFolder) {
    return workspaceFolder.uri.fsPath;
  }
  return process.cwd();
}

/**
 * 规范化路径
 */
export function normalizePath(inputPath: string): string {
  try {
    const resolvedPath = resolvePathWithEnv(inputPath);
    return path.normalize(resolvedPath);
  } catch (error) {
    return inputPath;
  }
}

/**
 * 检查路径是否存在
 */
export async function pathExists(inputPath: string): Promise<boolean> {
  try {
    const normalizedPath = normalizePath(inputPath);
    await fs.access(normalizedPath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 检查路径是否可执行
 */
export async function isExecutable(filePath: string): Promise<boolean> {
  try {
    const exists = await pathExists(filePath);
    if (!exists) {
      return false;
    }

    const { promises: fs } = await import("node:fs");
    const stats = await fs.stat(filePath);

    // 检查文件权限
    if (process.platform === "win32") {
      // Windows 系统检查文件扩展名
      const ext = path.extname(filePath).toLowerCase();
      return [".exe", ".bat", ".cmd", ".ps1"].includes(ext);
    } else {
      // Unix 系统检查执行权限
      return (stats.mode & 0o111) !== 0;
    }
  } catch (error) {
    return false;
  }
}

/**
 * 获取文件扩展名
 */
export function getExtension(filePath: string): string {
  return path.extname(filePath).toLowerCase();
}

/**
 * 获取文件名（不含扩展名）
 */
export function getBaseName(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

/**
 * 获取目录名
 */
export function getDirectoryName(filePath: string): string {
  return path.dirname(filePath);
}

/**
 * 连接路径
 */
export function join(...paths: string[]): string {
  return path.join(...paths);
}

/**
 * 解析相对路径
 */
export function resolve(...paths: string[]): string {
  return path.resolve(...paths);
}

/**
 * 获取相对路径
 */
export function relative(from: string, to: string): string {
  return path.relative(from, to);
}
