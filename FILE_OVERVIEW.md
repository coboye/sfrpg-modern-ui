# File Purpose Overview: sfrpg-modern-ui

This document describes the purpose of each file and major folder in the `sfrpg-modern-ui` codebase. This module provides a modern, dark UI for the Starfinder system in Foundry VTT, with support for multiple themes and integrations with popular Foundry modules.

---

## Top-Level Files

- **README.md**: Project overview, installation instructions, compatibility, and maintenance notes.
- **CHANGELOG.md**: Chronological list of changes, updates, and fixes for each release.
- **LICENSE**: Legal terms for using, modifying, and distributing the project.
- **module.json**: Foundry VTT module manifest, declaring metadata, compatibility, scripts, styles, and language files.
- **UPGRADE_PLAN_V13.md**: Planning and checklist for upgrading the module to Foundry VTT v13 compatibility.
- **sfrpg-modern-ui.js**: Main JavaScript entry point. Initializes the module, settings, and UI engine on Foundry startup.
- **sfrpg-modern-ui.css**: Core CSS for the module, providing global UI fixes and style overrides for the Starfinder system.

---

## Folders

### `css/`
- **main.css**: Main stylesheet for the module, defining custom properties and UI tweaks for the Starfinder system.
- **mods/**: Contains CSS files for integration with other Foundry modules (e.g., always-hp, df-chat-enhance, forien-quest-log, etc.), ensuring visual consistency.

### `i18n/`
- **en.json**: English localization strings for UI labels, settings, and theme names.
- **it.json**: Italian localization strings.

### `module/`
- **colors.js**: Color manipulation utilities and classes (e.g., Color, ColorStep, LinearGradient) used for theming.
- **constants.js**: Centralized constants (module name, logger name, settings keys).
- **engine.js**: The UI engine. Applies themes, manages integration stylesheets, and updates the UI based on settings.
- **logger.js**: Logging utility for consistent debug, info, and error output.
- **settings.js**: Settings provider and definitions for user-configurable options (theme, opacity, blur, etc.).
- **utils.js**: Utility functions (e.g., string conversion, localization helper).

### `themes/`
- **index.js**: Exports available themes and integration list.
- **theme.js**: Abstract base class for themes, defining color properties and theme logic.
- **specs/**: Contains individual theme definitions:
  - **starfinder.js**: Starfinder theme colors and gradients.
  - **neon.js**: Neon cyberpunk theme.
  - **terminal.js**: Terminal/green-on-black theme.
  - **illusive-man.js**: Orange/green theme inspired by the Illusive Man.
  - **unitologist.js**: Red/purple theme.
  - **velstrac.js**: Dark red/teal theme.

---

