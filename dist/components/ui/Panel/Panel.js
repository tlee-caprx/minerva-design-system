import { jsxs as f, jsx as n } from "react/jsx-runtime";
const d = [
  'after:content-[""] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none',
  "after:shadow-[inset_0_0_0_var(--space-1)_var(--border-surface-base)]"
].join(" "), i = {
  default: `bg-(--bg-surface-base) shadow-(--shadow-surface-sm) ${d}`,
  nested: "bg-(--bg-surface-subtle)"
};
function u({ variant: o = "default", tabs: e, children: s, className: a = "", ...r }) {
  const t = `relative rounded-(--radius-sm) ${i[o]}`;
  return e ? /* @__PURE__ */ f("div", { ...r, className: `${t} flex flex-col overflow-hidden ${a}`, children: [
    e,
    /* @__PURE__ */ n("div", { className: "p-(--inset-7)", children: s })
  ] }) : /* @__PURE__ */ n("div", { ...r, className: `${t} p-(--inset-7) ${a}`, children: s });
}
export {
  u as Panel
};
