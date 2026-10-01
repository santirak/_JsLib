# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A vanilla JavaScript UI component library (no build step, no package manager, no dependencies, no test framework). Components are native ES modules (`export default class ...`) that import each other with relative paths like `../dropdown/dropdown.js`.

## Running / testing

Each component folder has an `index.html` that is a manual test page (`<script type="module">` that imports and instantiates the component). ES modules don't load over `file://`, so serve the repo root with a static server and open the page, e.g.:

```
python3 -m http.server 8000   # then open http://localhost:8000/dropdown/index.html
```

There is no lint or automated test setup.

## Architecture: ViewController + View

Most components are split into two files in their own folder:

- `<component>.js` — the **ViewController** (logic/data), e.g. `Dropdown`, `Calendar`, `SelectionList`.
- `view.js` — the **View** (DOM only), which `extends` the base `View` in `_class/view.js` (imported as `ViewTemplate`).

Some folders are logic-only with no `view.js` (e.g. `eventHandler`, `responsive`, `thaiIdNumber`, `thaiPhoneNumber`, `file`, `animation`). `_class/dateText.js` is a shared date helper.

Composition: ViewControllers create other ViewControllers in their constructor (e.g. `InputWithCalendar` → `Dropdown` + `Calendar`; `Calendar` → `InputWithOption` → `Dropdown`).

### Rules (from README — follow these when editing/adding components)

**ViewController**
- Never touches DOM elements directly; it only calls getter/setter/modifier methods on `this.view`.
- Constructor order matters: (1) setting values (including settings for child ViewControllers), (2) create child ViewControllers, (3) `this.view = new View(this)` (no elements created yet), (4) stored data, (5) utility hooks such as `extraFunction_xxx` / `afterFunction_xxx`.
- `createViews(elementStyle)` calls `view.createElements(...)`; this is when DOM is actually built. All objects/settings exist before any element is created, so settings can be changed between construction and `createViews()`.
- Its methods are attached to elements as handlers when the View creates them.

**View**
- No logic and no data. Two parts: element creators and element modifiers. Prefer re-creating elements over mutating them.
- Constructor: settings → default `this.elementStyle` → adjust child Views' defaults via `this.viewController.<child>.view.updateStyleObject(newStyle)`.
- `createElements()` builds all elements, including child Views (call the child's `createViews()` without passing `elementStyle`).
- `elementStyle` is an object of `style_xxx: { cssProp: value }` entries applied via `setElementStyle(element, styles)` from the base class.

**Styling / options warnings**
- Never pass element styles inside `options`; avoid `options` generally (only for values needed at construction time).
- Every style name used (general and specific, e.g. `style_input`, `style_inputForYear`) must be declared in the default `elementStyle`.
- Don't mutate `elementStyle` directly: for own View pass it to `createViews(elementStyle)`; for a child View use `updateStyleObject()` *before* elements are created.

**Responsive hooks** (see `selectionList/`): the View exposes a no-op `functionFor_addResponsiveTo_xxx` property, calls it wherever that element is created or recreated, and the consumer assigns it after constructing the ViewController (see `selectionList/index.html`).

### Component file conventions

Classes start with a commented header block (`README`, `STRUCTURE`, `CUSTOMIZATION`, `WARNING`, `DEPENDENCY`) documenting expected inputs (e.g. the `elements` object passed to `createViews`). Keep it updated when changing a component's API.
