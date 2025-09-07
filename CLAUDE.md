# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VSCode extension project that provides a quick launch feature for Claude Code. The extension allows users to quickly open Claude Code from the current directory with configurable commands and options, supporting cross-platform usage (Windows, macOS, Linux).

## Development Commands

### Build and Development
- `bun run build` - Build the extension using Rslib and copy images to dist
- `bun run dev` - Build in watch mode for development
- `bun run watch` - Alias for dev command
- `bun run vscode:prepublish` - Build before publishing (runs automatically)

### Testing and Quality
- `bun test` - Run tests using Vitest
- `bun run lint` - Run Biome linting with auto-fix (`biome check --write .`)

### Package Management
- Uses Bun as package manager (based on bun.lock file)
- Commands use npm but Bun handles them

## Technology Stack

- **Core Framework**: VSCode Extension API
- **Language**: TypeScript
- **Build Tool**: Rslib (bundler for VSCode extensions)
- **Testing**: Vitest
- **Linting**: Biome (includes formatter and linter)
- **Package Manager**: Bun

## Architecture

### Module Structure
```
src/
├── extension.ts              # Main entry point with activate/deactivate
├── manager/                  # Core business logic managers
│   ├── claudeCodeManager.ts  # Claude Code launch and process management
│   ├── configManager.ts      # Configuration management via command palette
│   └── commandManager.ts     # VSCode command registration and execution
├── utils/                    # Utility modules
│   ├── logger.ts             # Logging and error handling
│   ├── pathUtils.ts          # Cross-platform path handling
│   └── processUtils.ts       # Process management utilities
└── types/                    # TypeScript type definitions
    ├── config.ts             # Configuration interfaces
    └── common.ts             # Common types and enums
```

### Key Design Decisions
- **No dedicated UI**: Configuration handled through VSCode command palette (Ctrl+Shift+P)
- **Cross-platform support**: Abstracted platform-specific logic in utils
- **Modular architecture**: Clear separation of concerns between managers
- **Command-driven interface**: All interactions through VSCode commands

### Configuration System
Configuration is managed through VSCode commands rather than settings UI:
- `claudeCode.configurePath` - Set Claude Code executable path
- `claudeCode.configureArgs` - Configure launch arguments
- `claudeCode.resetSettings` - Reset to defaults
- Settings stored in VSCode workspaceState/globalState

## Build Configuration

### Rslib Configuration
- Bundles all files in `src/` directory
- Outputs CommonJS format for VSCode compatibility
- Copies `images/` directory to dist for extension icon
- No bundling (bundle: false) to maintain individual files

### TypeScript Configuration
- Target: ES2021
- Module: ESNext
- Strict mode enabled
- Module resolution: bundler
- Includes only `src/` directory

## Code Style and Linting

### Biome Configuration
- **Formatter**: 2-space indentation, double quotes, LF line endings
- **Line width**: 80 characters
- **Linting rules**: 
  - Disabled: a11y rules (not relevant for VSCode extension)
  - Disabled: suspicious noExplicitAny (allowed for extension development)
  - Enabled: organize imports
- **Files ignored**: node_modules, dist, temp, cache, config files

## VSCode Extension Structure

### Package.json Structure
- Main entry: `./dist/extension.js`
- VSCode engine requirement: `^1.96.0`
- Commands registered in `contributes.commands`
- No configuration UI (configuration handled via commands)

### Extension Lifecycle
- `activate()` function called when extension first activates
- Commands registered with `vscode.commands.registerCommand`
- Disposables managed through `context.subscriptions`

## Testing

### Vitest Configuration
- Minimal configuration (empty test object)
- Test files should follow `*.test.ts` pattern
- Tests located in appropriate directories alongside source code

## Development Workflow

1. Make changes to TypeScript files in `src/`
2. Run `bun run dev` to build in watch mode
3. Test extension in VSCode (F5 to launch debug session)
4. Use `bun run lint` to ensure code quality
5. Run `bun test` to execute tests

## Cross-Platform Considerations

- Platform detection via `process.platform`
- Path handling abstracted in `pathUtils.ts`
- Default Claude Code paths vary by platform:
  - Windows: `%USERPROFILE%\\scoop\\shims\\claude-code`
  - macOS: `/usr/local/bin/claude-code`
  - Linux: `/usr/bin/claude-code`