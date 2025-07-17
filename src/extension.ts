import * as vscode from "vscode";

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext): void {
  console.log("Congratulations, your extension is now active!");
  const disposable = vscode.commands.registerCommand(
    "extension.myCommand",
    async () => {
      console.log("executed myCommand");
      vscode.window.showInformationMessage(
        "Your extension command is working!"
      );
    }
  );

  context.subscriptions.push(disposable);
}
a;
export function deactivate(): void {}
