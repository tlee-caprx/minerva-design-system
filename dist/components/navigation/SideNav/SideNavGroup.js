import { jsx as t } from "react/jsx-runtime";
function i({ label: e, className: a = "" }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: `text-(--text-surface-base) uppercase ${a}`,
      style: {
        fontSize: "var(--label-lg-size)",
        lineHeight: "var(--space-18)",
        fontWeight: "var(--label-lg-weight)",
        letterSpacing: "var(--space-1)"
      },
      children: e
    }
  );
}
export {
  i as SideNavGroup
};
