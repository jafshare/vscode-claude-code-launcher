import { spawn } from "node:child_process";

/**
 * 执行命令并获取输出
 */
export async function executeCommand(
  command: string,
  args: string[] = [],
  options: {
    cwd?: string;
    env?: Record<string, string>;
    timeout?: number;
  } = {}
): Promise<{ stdout: string; stderr: string; code: number | null }> {
  return new Promise((resolve, reject) => {
    try {
      const childProcess = spawn(command, args, {
        cwd: options.cwd || process.cwd(),
        env: { ...process.env, ...options.env },
        stdio: "pipe",
        shell: process.platform === "win32"
      });

      let stdout = "";
      let stderr = "";

      if (childProcess.stdout) {
        childProcess.stdout.on("data", (data: Buffer) => {
          stdout += data.toString();
        });
      }

      if (childProcess.stderr) {
        childProcess.stderr.on("data", (data: Buffer) => {
          stderr += data.toString();
        });
      }

      childProcess.on("exit", (code: number | null) => {
        resolve({ stdout, stderr, code });
      });

      childProcess.on("error", (error: Error) => {
        reject(error);
      });

      // 设置超时
      if (options.timeout) {
        setTimeout(() => {
          childProcess.kill("SIGTERM");
          reject(new Error(`命令执行超时: ${options.timeout}ms`));
        }, options.timeout);
      }
    } catch (error) {
      reject(error);
    }
  });
}
