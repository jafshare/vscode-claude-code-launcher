# Claude Code Quick Launch

A VSCode extension that allows you to quickly launch Claude Code from the current directory with convenient commands and configuration options.

[🇨🇳 中文](README.md) | [🇺🇸 English](README.en.md)

## Features

- 🚀 **Quick Launch** - Launch Claude Code quickly using `Ctrl + Shift + P` command palette
- 🛠️ **Flexible Configuration** - Support for configuring Claude Code path, launch arguments, and working directory
- 🔧 **Command Configuration** - Configure through VSCode command palette
- 📢 **Notification System** - Configurable operation notifications
- 🖥️ **Terminal Selection** - Support for system terminal and VSCode integrated terminal

## Installation

### Install from VSCode Marketplace (Recommended)

1. Open VSCode
2. Press `Ctrl+Shift+X` to open the Extensions panel
3. Search for "Claude Code Quick Launch"
4. Click "Install"

### Install from Source

```bash
# Clone the repository
git clone https://github.com/jafshare/vscode-claude-code-launcher.git
cd vscode-claude-code-launcher

# Install dependencies
bun install

# Package the extension
bun run package

# Install the extension
code --install-extension vscode-claude-code-launcher-X.X.X.vsix
```

## Usage

### Command Palette

Press `Ctrl+Shift+P` to open the command palette and search for "Claude Code" to use the following commands:

- **Claude Code: Launch Claude Code** - Launch Claude Code
- **Claude Code: Open Settings** - Open VSCode settings page for configuration
- **Claude Code: Configure Claude Code Path** - Set Claude Code executable path
- **Claude Code: Configure Launch Arguments** - Set command line arguments for launch
- **Claude Code: Configure Terminal Type** - Choose between system terminal and VSCode integrated terminal
- **Claude Code: Reset All Settings** - Restore to default configuration

## Configuration

### Command Configuration

Configure through VSCode command palette (`Ctrl+Shift+P`):

- **Claude Code: Configure Claude Code Path** - Set Claude Code executable path
- **Claude Code: Configure Launch Arguments** - Set command line arguments for launch
- **Claude Code: Configure Terminal Type** - Choose between system terminal and VSCode integrated terminal
- **Claude Code: Reset All Settings** - Restore to default configuration

### Configuration Options

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `claudeCode.path` | string | `""` | Full path to Claude Code executable, auto-detected if empty |
| `claudeCode.defaultWorkingDirectory` | string | `"${workspaceFolder}"` | Default working directory, supports variables: `${workspaceFolder}`, `${home}` |
| `claudeCode.launchArgs` | string | `""` | Command line arguments when launching Claude Code |
| `claudeCode.showNotifications` | boolean | `true` | Whether to show notification messages |
| `claudeCode.terminalType` | string | `"system"` | Terminal type: `system` for system terminal, `vscode` for VSCode integrated terminal |

### Supported Variables

- `${workspaceFolder}` - Current workspace folder path
- `${home}` - User home directory path
- `${userHome}` - User home directory path (same as `${home}`)

## Development

### Requirements

- Bun
- VSCode >= 1.96.0

### Development Setup

```bash
# Clone the repository
git clone https://github.com/jafshare/vscode-claude-code-launcher.git
cd vscode-claude-code-launcher

# Install dependencies
bun install

# Start development mode
bun run dev
```

### Available Commands

```bash
# Build the extension
bun run build

# Development mode (watch file changes)
bun run dev
bun run watch

# Run tests
bun test

# Code linting and formatting
bun run lint
```

### Project Structure

```
src/
├── extension.ts              # Extension entry point
├── extension.test.ts         # Extension test file
├── manager/                  # Core business logic
│   ├── claudeCodeManager.ts  # Claude Code launch management
│   ├── configManager.ts      # Configuration management
│   └── commandManager.ts     # Command management
├── utils/                    # Utility functions
│   ├── path.ts               # Path handling utilities
│   └── process.ts            # Process management utilities
└── types/                    # Type definitions
    ├── common.d.ts           # Common types
    └── config.d.ts           # Configuration types
```

## Troubleshooting

### Common Issues

#### 1. Claude Code won't launch

**Issue**: No response after clicking the launch button

**Solutions**:
1. Check if Claude Code is properly installed
2. Verify the `claudeCode.path` configuration is correct
3. Check the VSCode Developer Console for error messages

#### 2. Path Configuration Error

**Issue**: Configured path cannot find Claude Code

**Solutions**:
- Windows: Check if the path is correct, e.g., `%USERPROFILE%\scoop\shims\claude-code`
- macOS: Check if the path is `/usr/local/bin/claude-code`
- Linux: Check if the path is `/usr/bin/claude-code`

#### 3. Working Directory Issues

**Issue**: Claude Code launches with incorrect working directory

**Solutions**:
1. Check the `claudeCode.defaultWorkingDirectory` configuration
2. Verify variable syntax is correct
3. Confirm the target directory exists

## Contributing

Contributions are welcome! Feel free to submit issues and feature requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this extension helpful, please give it a ⭐️ Star!

### Feedback and Issues

- Submit issues: [GitHub Issues](https://github.com/jafshare/vscode-claude-code-launcher/issues)