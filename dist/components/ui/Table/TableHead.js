import { jsx as n, jsxs as u } from "react/jsx-runtime";
import { Text as g } from "../Text/Text.js";
import { Tooltip as h } from "../Tooltip/Tooltip.js";
import { Icon as v } from "../Icon/Icon.js";
import { InfoCircleIcon as b } from "../Icon/icons/info-circle.js";
import { SortIcon as x } from "../Icon/icons/sort.js";
function T({
  children: o,
  tooltip: a,
  sortable: i = !1,
  sortDirection: s,
  onSort: t,
  align: r = "left",
  grow: c = !1,
  className: l = "",
  style: f,
  ...d
}) {
  const m = (e) => {
    !i || e.target !== e.currentTarget || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), t == null || t());
  }, p = (e) => e.stopPropagation();
  return (
    // The th itself is the sort trigger (aria-sort + tabIndex + keys) rather
    // than a nested button: the tooltip trigger below is focusable too, and
    // a focusable element inside a button is invalid nesting.
    /* @__PURE__ */ n(
      "th",
      {
        ...d,
        scope: "col",
        "data-grow": c || void 0,
        tabIndex: i ? 0 : void 0,
        "aria-sort": i ? s === "asc" ? "ascending" : s === "desc" ? "descending" : "none" : void 0,
        onClick: i ? t : void 0,
        onKeyDown: m,
        style: f,
        className: [
          "p-(--inset-5) align-middle font-[inherit]",
          i ? "cursor-pointer outline-none hover:bg-(--bg-control-subtle-hover) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--border-control-default-focus)" : "",
          l
        ].join(" "),
        children: /* @__PURE__ */ u("div", { className: `flex items-center gap-(--inline-1) ${r === "center" ? "justify-center" : ""}`, children: [
          typeof o == "string" || typeof o == "number" ? /* @__PURE__ */ n(g, { variant: "body-md", weight: "semibold", className: "text-(--text-surface-base) whitespace-nowrap", children: o }) : o,
          a && /* @__PURE__ */ n(h, { content: a, children: /* @__PURE__ */ n("span", { tabIndex: 0, onClick: p, children: /* @__PURE__ */ n(v, { icon: b, size: "small", className: "text-(--icon-surface-base)" }) }) }),
          i && /* @__PURE__ */ n(x, { direction: s, width: 14, height: 14, className: "shrink-0" })
        ] })
      }
    )
  );
}
export {
  T as TableHead
};
