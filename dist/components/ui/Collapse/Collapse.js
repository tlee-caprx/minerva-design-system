import { jsxs as r, jsx as o } from "react/jsx-runtime";
import { useState as y, useId as v } from "react";
import { Icon as l } from "../Icon/Icon.js";
import { ChevronDownIcon as x } from "../Icon/icons/chevron-down.js";
import { ChevronRightIcon as P } from "../Icon/icons/chevron-right.js";
import { CheckMarkIcon as k } from "../Icon/icons/check-mark.js";
import { Text as N } from "../Text/Text.js";
const w = {
  default: {
    border: "full",
    headerPadding: "px-(--inset-7) py-(--inset-6)",
    bodyPadding: "px-(--inset-7) py-(--inset-6)"
  },
  underline: {
    border: "bottom",
    headerPadding: "px-(--inset-7) py-(--inset-6)",
    bodyPadding: "px-(--inset-7) py-(--inset-6)"
  },
  blank: {
    border: "none",
    headerPadding: "px-(--inset-7) py-(--inset-6)",
    bodyPadding: "px-(--inset-7) py-(--inset-6)"
  },
  "underline-flush": {
    border: "bottom",
    headerPadding: "py-(--inset-6)",
    bodyPadding: "py-(--inset-6)"
  },
  "blank-flush": {
    border: "none",
    headerPadding: "py-(--inset-6)",
    bodyPadding: "py-(--inset-6)"
  },
  unpadded: {
    border: "none",
    headerPadding: "",
    bodyPadding: "py-(--inset-6)"
  }
}, I = {
  full: { border: "var(--space-1) solid var(--border-surface-base)" },
  bottom: { borderBottom: "var(--space-1) solid var(--border-surface-base)" },
  none: {}
};
function B({
  style: d = "default",
  trigger: c = "chevron",
  title: b,
  actions: s,
  defaultOpen: p = !1,
  children: u,
  className: f = ""
}) {
  const [n, m] = y(p), t = v(), i = w[d], a = () => m((e) => !e), g = (e) => {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), a());
  }, h = (e) => e.stopPropagation();
  return /* @__PURE__ */ r(
    "div",
    {
      className: `flex flex-col bg-(--bg-surface-base) ${i.border === "full" ? "rounded-(--radius-sm)" : ""} ${f}`,
      style: I[i.border],
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-expanded": n,
            "aria-controls": t,
            onClick: a,
            onKeyDown: g,
            className: [
              "flex items-center justify-between gap-(--inline-4)",
              "cursor-pointer outline-none",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-(--border-control-default-focus)",
              i.headerPadding
            ].join(" "),
            style: d === "default" && n ? { borderBottom: "var(--space-1) solid var(--border-surface-base)" } : void 0,
            children: [
              /* @__PURE__ */ r("span", { className: "flex items-center gap-(--inline-2) min-w-0", children: [
                c === "chevron" ? /* @__PURE__ */ o(
                  l,
                  {
                    icon: n ? x : P,
                    size: "regular",
                    className: "text-(--icon-action-base-idle) shrink-0"
                  }
                ) : /* @__PURE__ */ o(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: [
                      "inline-flex items-center justify-center shrink-0",
                      "w-(--space-18) h-(--space-18) rounded-(--radius-sm)",
                      n ? "bg-(--bg-control-selected-idle)" : "bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]"
                    ].join(" "),
                    children: n && /* @__PURE__ */ o(l, { icon: k, size: "small", className: "text-(--icon-control-selected-idle)" })
                  }
                ),
                /* @__PURE__ */ o(N, { variant: "body-md", weight: "semibold", className: "text-(--text-action-base-idle) truncate", children: b })
              ] }),
              s && /* @__PURE__ */ o("span", { onClick: h, className: "flex items-center gap-(--inline-3) shrink-0", children: s })
            ]
          }
        ),
        n && /* @__PURE__ */ o("div", { id: t, className: i.bodyPadding, children: u })
      ]
    }
  );
}
export {
  B as Collapse
};
