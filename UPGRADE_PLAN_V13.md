# Upgrade Plan: Foundry VTT v13 Compatibility for sfrpg-modern-ui

## Plan

### 1. Research and Audit
- Review all code for deprecated or breaking changes in Foundry VTT v13.
- Identify all usages of Foundry VTT APIs, hooks, and settings registration.
- Check for any CSS or DOM changes that may affect the UI.
- Audit `module.json` for manifest requirements and compatibility fields.

### 2. Update Manifest (`module.json`)
- Ensure `compatibility.minimum` and `compatibility.verified` are set for v13.
- Remove deprecated fields if any.
- Confirm all file paths and URLs are correct.

### 3. Update JavaScript/ESModule Code
- Update all Foundry VTT API usages to v13 standards (e.g., settings, hooks, game object access).
- Refactor deprecated or removed APIs.
- Update settings registration and access patterns.
- Check for changes in how modules inject CSS or interact with the DOM.

### 4. Update CSS
- Review and update CSS selectors for any changes in Foundry's HTML structure.
- Test all integrations in `/css/mods/` for compatibility with v13.
- Ensure variables and custom properties are still valid.

### 5. Test Integrations
- Test all module integrations (e.g., forien-quest-log, monks-enhanced-journal, vtta-tokenizer, etc.) for compatibility.
- Update integration CSS or logic as needed.

### 6. Documentation
- Update `README.md` with new compatibility information.
- Add upgrade notes if necessary.

### 7. Changelog
- Add a new entry in `CHANGELOG.md` describing the v13 upgrade.

---

## Task List

1. [X] Audit all code for v13 breaking changes and deprecated APIs.
2. [X] Update `module.json` for v13 compatibility.
3. [X] Refactor JavaScript code for v13 API changes.
4. [X] Update and test all CSS for v13 DOM changes.
5. [ ] Test and update all module integrations.
6. [X] Update documentation (`README.md`).
7. [X] Update `CHANGELOG.md` with v13 upgrade notes.
