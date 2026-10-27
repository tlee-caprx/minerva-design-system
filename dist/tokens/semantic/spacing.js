import { spacing as e } from "../primitive/spacing.js";
const s = {
  // ─── Base scale (pass-through from primitive) ────────────────────────────
  "space-0": e["space-0"],
  "space-1": e["space-1"],
  "space-2": e["space-2"],
  "space-4": e["space-4"],
  "space-6": e["space-6"],
  "space-8": e["space-8"],
  "space-9": e["space-9"],
  "space-10": e["space-10"],
  "space-11": e["space-11"],
  "space-12": e["space-12"],
  "space-16": e["space-16"],
  "space-18": e["space-18"],
  "space-20": e["space-20"],
  "space-24": e["space-24"],
  "space-30": e["space-30"],
  "space-32": e["space-32"],
  "space-36": e["space-36"],
  "space-40": e["space-40"],
  "space-48": e["space-48"],
  // ─── Inset — padding inside containers ───────────────────────────────────
  "inset-1": e["space-4"],
  //  4px — tight lozenges, badges
  "inset-2": e["space-6"],
  //  6px — dense table cells
  "inset-3": e["space-8"],
  //  8px — compact inputs, nav items
  "inset-4": e["space-10"],
  // 10px — default table cells, list items
  "inset-5": e["space-12"],
  // 12px — comfortable inputs
  "inset-6": e["space-16"],
  // 16px — cards, panels
  "inset-7": e["space-24"],
  // 24px — dialogs, page sections
  // ─── Stack — vertical gap between elements ────────────────────────────────
  "stack-1": e["space-4"],
  //  4px — icon + label, tightly related
  "stack-2": e["space-8"],
  //  8px — between related items
  "stack-3": e["space-12"],
  // 12px — between grouped items
  "stack-4": e["space-16"],
  // 16px — between distinct groups
  "stack-5": e["space-24"],
  // 24px — between major sections
  // ─── Inline — horizontal gap between elements ─────────────────────────────
  "inline-1": e["space-4"],
  //  4px — icon + label, tight pairs
  "inline-2": e["space-8"],
  //  8px — button groups, tags
  "inline-3": e["space-12"],
  // 12px — form fields side by side
  "inline-4": e["space-16"],
  // 16px — card grid columns
  "inline-5": e["space-24"],
  // 24px — wide column gaps
  // ─── Layout — page-level structure ───────────────────────────────────────
  "layout-1": e["space-16"],
  // 16px — TBC
  "layout-2": e["space-24"],
  // 24px
  "layout-3": e["space-32"],
  // 32px
  "layout-4": e["space-40"],
  // 40px
  "layout-5": e["space-48"],
  // 48px
  // ─── Component ────────────────────────────────────────────────────────────
  "sidenav-width-expanded": "256px"
}, a = {
  ...s
  // ─── Inset ────────────────────────────────────────────────────────────────
  // TODO: fill in tightened Evolution values
  // 'inset-1': spacing['space-2'],
  // 'inset-2': spacing['space-4'],
  // ...
  // ─── Stack ────────────────────────────────────────────────────────────────
  // TODO: fill in tightened Evolution values
  // ─── Inline ───────────────────────────────────────────────────────────────
  // TODO: fill in tightened Evolution values
  // ─── Layout ───────────────────────────────────────────────────────────────
  // TODO: fill in tightened Evolution values
}, p = {
  minerva: s,
  evolution: a
};
export {
  p as spacingThemes
};
