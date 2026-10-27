import { jsxs as f, jsx as i } from "react/jsx-runtime";
import { Text as p } from "../Text/Text.js";
import { Tooltip as h } from "../Tooltip/Tooltip.js";
import { Icon as u } from "../Icon/Icon.js";
import { InfoCircleIcon as g } from "../Icon/icons/info-circle.js";
import { SortIcon as x } from "../Icon/icons/sort.js";
function j({
  label: c,
  tooltip: t,
  sortable: e = !1,
  sortDirection: r,
  onSort: o,
  align: a = "left",
  className: s = "",
  style: l
}) {
  const d = (n) => {
    e && (n.key === "Enter" || n.key === " ") && (n.preventDefault(), o == null || o());
  }, m = (n) => n.stopPropagation();
  return (
    // role="columnheader" always (this is a table header cell); sortable
    // interactivity is layered on top via aria-sort + tabIndex + key
    // handling rather than a separate role="button" — a button role can't
    // coexist with columnheader, and it previously left the tooltip
    // trigger below as a focusable element nested inside a button-role
    // container, which assistive tech treats as invalid nesting.
    /* @__PURE__ */ f(
      "div",
      {
        role: "columnheader",
        tabIndex: e ? 0 : void 0,
        "aria-sort": e ? r === "asc" ? "ascending" : r === "desc" ? "descending" : "none" : void 0,
        onClick: e ? o : void 0,
        onKeyDown: d,
        style: l,
        className: [
          "flex items-center gap-(--inline-1)",
          a === "center" ? "justify-center" : "",
          "p-(--inset-5) bg-(--bg-surface-base)",
          e ? "cursor-pointer outline-none hover:bg-(--bg-control-subtle-hover)" : "",
          s
        ].join(" "),
        children: [
          /* @__PURE__ */ i(p, { variant: "body-md", weight: "semibold", className: "text-(--text-surface-base) whitespace-nowrap", children: c }),
          t && /* @__PURE__ */ i(h, { content: t, children: /* @__PURE__ */ i("span", { tabIndex: 0, onClick: m, children: /* @__PURE__ */ i(u, { icon: g, size: "small", className: "text-(--icon-surface-base)" }) }) }),
          e && /* @__PURE__ */ i(x, { direction: r, width: 14, height: 14, className: "shrink-0" })
        ]
      }
    )
  );
}
export {
  j as TableCellHeader
};
