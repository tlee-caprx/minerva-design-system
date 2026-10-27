import { jsx as e, jsxs as s } from "react/jsx-runtime";
import { Icon as c } from "../../ui/Icon/Icon.js";
import { ChevronRightIcon as o } from "../../ui/Icon/icons/chevron-right.js";
const l = {
  fontSize: "var(--breadcrumb-label-size)",
  lineHeight: "var(--breadcrumb-label-line-height)",
  fontWeight: "var(--breadcrumb-label-weight)"
};
function b({ items: a, className: i = "" }) {
  return /* @__PURE__ */ e("nav", { "aria-label": "Breadcrumb", className: i, children: /* @__PURE__ */ e("ol", { className: "flex items-center gap-(--inline-2)", children: a.map((n, r) => {
    const t = r === a.length - 1;
    return /* @__PURE__ */ s("li", { className: "flex items-center gap-(--inline-2)", children: [
      r > 0 && /* @__PURE__ */ e(
        c,
        {
          icon: o,
          size: "small",
          className: "text-(--text-navigation-link) shrink-0"
        }
      ),
      t ? (
        // Current page — no hover, no link
        /* @__PURE__ */ e(
          "span",
          {
            "aria-current": "page",
            className: "text-(--text-navigation-link) cursor-default",
            style: l,
            children: n.label
          }
        )
      ) : (
        // Ancestor — hoverable with underline, focus ring for keyboard nav
        /* @__PURE__ */ e(
          "a",
          {
            href: n.href ?? "/",
            className: "text-(--text-navigation-link) no-underline hover:underline focus-visible:underline outline-none",
            style: l,
            children: n.label
          }
        )
      )
    ] }, r);
  }) }) });
}
export {
  b as Breadcrumb
};
