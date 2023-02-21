# Changelog
## [1.7.2] - TBD
### Fixed
- Compendium browser items hover color
- Default Roll Mode header background
## [1.7.1] - 2023-02-16
### Fixed
- additional UI buttons layout [GH-33]
- locked keys style in controls window [GH-30]
- non gm scene button
## [1.7.0] - 2022-09-21
### Added
- v10 compatibility [GH-31]
## [1.6.3] - 2022-04-13
### Fixed
- "use" button color
### Added
- vtta-tokenizer module integration
## [1.6.0] - 2022-02-06
### Fixed
- Incorrect colouring on dropdown menus (thanks to LebombJames)[GH-27]
- Package sfrpg-modern-ui was using the old "systems" manifest key where a "system" key is expected [GH-25]
## [1.5.4] - 2021-10-24
### Added
- Workaround to fix new actor resources presentation in combat tracker
- Chat font size modifier in module options [GH-24]
### Fixed
- Tidy UI import/export text area
- Tidy UI modules settings collassible fab color
## [1.5.3] - 2021-10-22
### Fixed
- Monk's Enhanced Journal module css
- Furnace module css  
## [1.5.3] - 2021-10-22
### Fixed
- Monk's Enhanced Journal module css
- Furnace module css 
## [1.5.0] - 2021-10-21
### Added
- new Velstrac Theme palette
- Compact mode (experimental) mainly for compendiums (list and content) and some SciFi-like small-caps text scattered around the UI
### Fixed
- minor css fixes
### Changed
- some engine tweak to live render checkbox options changes (compact mode)
## [1.4.3] - 2021-10-20
### Fixed
- Compendium's header search field background
### Changed
- improved visibility for table's headers
- combat phase/round alert chat card style
### Added
- Monk's TokenBar integration
- Monk's Little Details integration
- Monk's Active Tile Triggers integration
- minor system css tweaks

## [1.4.2] - 2021-07-21
### Fixed
- chat card custom item's name color

## [1.4.1] - 2021-07-20
### Fixed
- module version
  
## [1.4.0] - 2021-07-20
### Changed
- modules integration on-demand loading (a separate css file in /css/mods folder named as module id, included only if the module is active)
### Fixed
- character sheet inputs background
### Added
- Monk's Enhanced Journal integration (beta) [GH-21]
  
- ## [1.3.2] - 2021-07-20
### Fixed
- input backgrounds rule typo
### Added
- Always HP integration [GH-22]
  
## [1.3.1] - 2021-07-13
### Fixed
- Furnace macros text area background color
  
## [1.3.0] - 2021-07-13
### Changed
- FoundrVTT core versione 0.8.8
### Fixed
- System items browser table header filters text hover color
- Compendiums text filter background
- Chat rolls details alignment

## [1.2.10] - 2021-07-09
### Fixed
- CSS selector for strong tags to preserve wysiwyg custom font color

## [1.2.9] - 2021-07-07
### Added
- override editor-content h3, h4, h5 and h6 to small-caps
- some minor changes to increase normal vs strong text contrast
- editor-content blockquote styling

## [1.2.8] - 2021-06-18
### Added
- override compact chat items flex-box

## [1.2.7] - 2021-06-17
### Fixed
- Furnace macro editor's caret color
- Tox dialogs colors
### Added
- Illandrill's Token Tooltips integration

## [1.2.6] - 2021-06-17
### Fixed
- wrong main css name

## [1.2.5] - 2021-06-17
### Fixed
- Custom chat card items's span color GH-20
### Added
- main css QOL override

## [1.2.4] - 2021-06-08
### Added
- Forien's Quest Log integration GH-19

## [1.2.3 HOTFIX] - 2021-04-09
### Fixed
- wrong css import

## [1.2.2] - 2021-04-09
### Added
- Furnace integration
- Tidy UI integration

### Fixed
- Macros editor visibility
- Chat message visibility GH-16
- Chat message out of bounduary content headers
- OneJournal contrast text color

## [1.2.1] - 2021-04-09
### Fixed
- Borders color in drone sheet
- Borders color in npc sheet
- Text color of grid unit notes (token sheet)
- Range sliders thumb color
- Pause text shadow color
- Controls reference keys
- Core themplate switching

## [1.2.0] - 2021-04-08
### Added
- Scroll bars override
- Progress bars override
- Theme: Unitologist
- Colors settings
- More screenshots

### Changed 
- Major module refactor
- Removed terminal theme variants, obsolte after hue shift implementation

## [1.1.2] - 2021-04-07
### Fixed
- Chat item context menu visibility GH-10
- Typo in theme choise GH-11
- Table in feat modifiers tab is not themed GH-12
### Changed 
- Windows background alpha for non blur-radius supported browsers
- Theme harmony: Terminal Green 
### Added
- Settings instant preview
- Theme: Terminal Cyan
- Theme: Terminal Amber
- Theme: Illusive Man

## [1.1.1] - 2021-04-01
### Fixed
- Wrong manifest in module.json **CLEAN REINSTALL REQUIRED** for FoundryVTT standalone client

## [1.1.0] - 2021-04-01
### Added
- Theme configuration in module settings GH-9 GH-6
- Two new color palettes
- Tidy UI integration
### Changed
- Dynamic stylesheet injection

## [1.0.4] - 2021-03-31
### Fixed
- Currency-value foreground color
- Heading 3 in editor and item description style
- Core sheet active tabs foreground color
- Macros hotbar theme
- Filter list and Sub navigation items theme

## [1.0.3] - 2021-03-31
### Changed
- Release versioning & distribution

## [1.0.2] - 2021-03-31
### Added
- Starfinder Statblock Parser integration GH-8
- text selection color
### Fixed
- OneJournal maximized titlebar
- Select and textarea focus style
- Compendium list and browser windows theme GH-7
- Other minor fixes

## [1.0.1] - 2021-03-30
### Changed
- Semitransparent windows background would be used only if the browser support blur backdrop-filter (eg. full opaque in Firefox)

## [1.0.0] - 2021-03-30
First release after FoundryVTT approval.
### Added
- Token Action HUD integration GH-1
- DF Chat Enhancements integration GH-5
- OneJournal integration
- tagify lib integration
### Changed
- GM Screen integration
- minimumCoreVersion in module manifest raised to Starfinder system min required
### Fixed
- Sidebar footer buttons alignment GH-2
- Vehicle actor sheet GH-3
- Journal Entries link GH-4
- Actor sheet tab hover style
- TinyMCE background color

## [0.0.2] - 2021-03-29
### Changed
- color palette redesign

## [0.0.1]  - 2021-03-28
first push
