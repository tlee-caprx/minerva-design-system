import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { Text as n } from "../Text/Text.js";
import { Icon as a } from "../Icon/Icon.js";
import { XCloseIcon as o } from "../Icon/icons/x-close.js";
function b({ children: r, onClose: s, className: t = "" }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: `inline-flex items-center gap-(--inline-1) rounded-(--radius-sm) py-(--inset-2) px-(--inset-3) bg-(--bg-surface-subtle) ${t}`,
      style: { border: "1px solid var(--border-surface-base)" },
      children: [
        /* @__PURE__ */ e(n, { as: "span", variant: "tag-label", className: "text-(--text-surface-subtle)", children: r }),
        s && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: s,
            "aria-label": "Remove",
            className: "inline-flex items-center justify-center cursor-pointer border-0 bg-transparent p-0 shrink-0",
            children: /* @__PURE__ */ e(a, { icon: o, size: "small", className: "text-(--icon-action-dismiss-idle)" })
          }
        )
      ]
    }
  );
}
export {
  b as Badge
};
