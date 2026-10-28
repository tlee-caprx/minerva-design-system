import { jsxs as l, jsx as i } from "react/jsx-runtime";
import { Text as b } from "../Text/Text.js";
import { ButtonGroup as u } from "../ButtonGroup/ButtonGroup.js";
import { Button as s } from "../Button/Button.js";
import { Icon as c } from "../Icon/Icon.js";
import { ChevronStartIcon as p } from "../Icon/icons/chevron-start.js";
import { ChevronLeftIcon as h } from "../Icon/icons/chevron-left.js";
import { ChevronRightIcon as y } from "../Icon/icons/chevron-right.js";
import { ChevronEndIcon as x } from "../Icon/icons/chevron-end.js";
function I({ currentPage: r, pageSize: o, totalItems: n, onPageChange: a, className: m = "" }) {
  if (n <= o) return null;
  const d = Math.ceil(n / o), f = (r - 1) * o + 1, v = Math.min(r * o, n), t = r <= 1, e = r >= d;
  return /* @__PURE__ */ l("div", { className: `flex items-center justify-between p-(--inset-6) bg-(--bg-surface-base) ${m}`, children: [
    /* @__PURE__ */ l(b, { variant: "body-md", className: "text-(--text-surface-base)", children: [
      "Showing ",
      f,
      "-",
      v,
      " of ",
      n
    ] }),
    /* @__PURE__ */ l(u, { children: [
      /* @__PURE__ */ i(s, { variant: "secondary", iconOnly: !0, "aria-disabled": t || void 0, onClick: () => !t && a(1), "aria-label": "First page", children: /* @__PURE__ */ i(c, { icon: p, size: "regular" }) }),
      /* @__PURE__ */ i(s, { variant: "secondary", iconOnly: !0, "aria-disabled": t || void 0, onClick: () => !t && a(r - 1), "aria-label": "Previous page", children: /* @__PURE__ */ i(c, { icon: h, size: "regular" }) }),
      /* @__PURE__ */ i(s, { variant: "secondary", iconOnly: !0, "aria-disabled": e || void 0, onClick: () => !e && a(r + 1), "aria-label": "Next page", children: /* @__PURE__ */ i(c, { icon: y, size: "regular" }) }),
      /* @__PURE__ */ i(s, { variant: "secondary", iconOnly: !0, "aria-disabled": e || void 0, onClick: () => !e && a(d), "aria-label": "Last page", children: /* @__PURE__ */ i(c, { icon: x, size: "regular" }) })
    ] })
  ] });
}
export {
  I as Pagination
};
