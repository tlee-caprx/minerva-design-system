import { jsx as e } from "react/jsx-runtime";
import { Tooltip as a } from "../../components/ui/Tooltip/Tooltip.js";
import { Icon as l } from "../../components/ui/Icon/Icon.js";
function p({ label: t, icon: n, active: o = !1, onClick: r, padding: i = "sm" }) {
  return /* @__PURE__ */ e(a, { content: t, children: /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      "aria-label": t,
      "aria-pressed": o,
      onMouseDown: (s) => s.preventDefault(),
      onClick: r,
      className: [
        "inline-flex shrink-0 items-center justify-center cursor-pointer rounded-(--radius-sm)",
        i === "sm" ? "p-(--inset-1)" : "p-(--inset-3)",
        "text-(--icon-action-neutral-idle) hover:text-(--icon-action-neutral-hover)",
        o ? "bg-(--bg-action-neutral-press)" : "bg-(--bg-action-neutral-idle) hover:bg-(--bg-action-neutral-hover) active:bg-(--bg-action-neutral-press)",
        "focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)"
      ].join(" "),
      children: /* @__PURE__ */ e(l, { icon: n, size: "regular" })
    }
  ) });
}
export {
  p as ToolbarButton
};
