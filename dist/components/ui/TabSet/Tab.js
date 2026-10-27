import { jsxs as n, jsx as i } from "react/jsx-runtime";
function l({ label: t, selected: e = !1, onClick: a, leftSlot: o, rightSlot: r }) {
  return /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": e,
      onClick: a,
      className: "relative inline-flex items-center px-(--inset-1) py-(--inset-3) bg-(--bg-navigation-item-secondary-idle) cursor-pointer select-none whitespace-nowrap outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--border-navigation-primary-active)",
      style: { border: "none", boxShadow: "inset 0 -2px 0 var(--border-surface-base)" },
      children: [
        /* @__PURE__ */ i(
          "span",
          {
            className: ["px-(--inline-2) py-(--inset-1) rounded-(--radius-sm) transition-colors duration-150", !e && "hover:bg-(--bg-navigation-item-secondary-hover)"].filter(Boolean).join(" "),
            children: /* @__PURE__ */ n("span", { className: "relative inline-flex items-center gap-(--inline-1)", children: [
              o,
              /* @__PURE__ */ i(
                "span",
                {
                  className: "text-(--text-navigation-item-secondary-idle)",
                  style: {
                    fontSize: "var(--menu-item-size)",
                    lineHeight: "var(--menu-item-line-height)",
                    fontWeight: "var(--menu-item-weight)"
                  },
                  children: t
                }
              ),
              r
            ] })
          }
        ),
        e && /* @__PURE__ */ i("span", { className: "absolute bottom-0 left-0 right-0 h-[2px] bg-(--border-navigation-primary-active)" })
      ]
    }
  );
}
export {
  l as Tab
};
