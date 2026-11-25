# Platform — desktop apps (Electron, Tauri, native)

- **Prototype**: build in the detected stack. Otherwise HTML at 1280×800 and 1440×900 inside drawn window chrome (macOS traffic lights or Windows caption buttons, chosen by the primary OS). Also check the minimum window size, typically 960×600.
- **Density**: 13–14px UI text, 28–32px control heights, 4px base spacing. Users run it for hours, so keep it calm with low chrome.
- **Layout**: sidebar (source list), a resizable split view with persistent pane widths, toolbar, status bar where useful. Optional inspector panel on the right.
- **Keyboard-first**:
  - Every action is reachable by shortcut; show shortcuts in menus and tooltips.
  - Command palette, arrow-key navigation in lists and tables, type-to-select.
  - Platform modifiers: ⌘ on macOS, Ctrl on Windows/Linux.
- **Menus**: app menu bar (macOS) or in-window menu or hamburger (Windows), plus right-click context menus on every object.
- **Selection model**: single, multi (⇧ range, ⌘/Ctrl toggle), with bulk actions appearing in context.
- **Drag and drop**: with drop-target highlighting and a keyboard alternative.
- **Window states**: empty first-run, multiple windows or tabs, offline, update available, and unsaved changes on close.
- **OS integration**: native-feeling scrollbars, system accent and dark mode respected, notifications, tray/menu-bar item if relevant.
- **Avoid**: web-marketing patterns inside the app (hero banners, big rounded cards, 16px+ body), and hover-only discovery.
