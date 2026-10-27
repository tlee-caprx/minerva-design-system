import { jsx as o } from "react/jsx-runtime";
import { Text as i } from "../Text/Text.js";
function l({ children: r, selected: e = !1, className: t = "", ...s }) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-pressed": e,
      className: [
        "inline-flex items-center justify-center shrink-0",
        "py-(--inset-1) px-(--inset-5)",
        "rounded-(--radius-full)",
        "cursor-pointer transition-colors duration-150",
        "outline-none focus-visible:outline focus-visible:outline-2",
        "focus-visible:outline-offset-2 focus-visible:outline-(--border-control-default-focus)",
        e ? [
          "bg-(--bg-control-inverse-idle)",
          "hover:bg-(--bg-control-inverse-hover)",
          "text-(--text-surface-inverse)"
        ].join(" ") : [
          "bg-(--bg-surface-base)",
          "text-(--text-surface-subtle)",
          "shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]",
          "hover:bg-(--bg-surface-subtle)",
          "hover:text-(--text-surface-base)",
          "hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-emphasis)]"
        ].join(" "),
        t
      ].filter(Boolean).join(" "),
      ...s,
      children: /* @__PURE__ */ o(i, { as: "span", variant: "body-sm", children: r })
    }
  );
}
export {
  l as Chip
};
