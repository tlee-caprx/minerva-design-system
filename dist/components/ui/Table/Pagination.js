import { jsxs as s, jsx as i } from "react/jsx-runtime";
import { Text as u } from "../Text/Text.js";
import { ButtonGroup as p } from "../ButtonGroup/ButtonGroup.js";
import { Button as e } from "../Button/Button.js";
import { Icon as a } from "../Icon/Icon.js";
import { ChevronStartIcon as h } from "../Icon/icons/chevron-start.js";
import { ChevronLeftIcon as v } from "../Icon/icons/chevron-left.js";
import { ChevronRightIcon as y } from "../Icon/icons/chevron-right.js";
import { ChevronEndIcon as x } from "../Icon/icons/chevron-end.js";
function I({ currentPage: r, pageSize: o, totalItems: n, onPageChange: t, className: m = "" }) {
  if (n <= o) return null;
  const c = Math.ceil(n / o), f = (r - 1) * o + 1, b = Math.min(r * o, n), l = r <= 1, d = r >= c;
  return /* @__PURE__ */ s("div", { className: `flex items-center justify-between p-(--inset-6) bg-(--bg-surface-base) ${m}`, children: [
    /* @__PURE__ */ s(u, { variant: "body-md", className: "text-(--text-surface-base)", children: [
      "Showing ",
      f,
      "-",
      b,
      " of ",
      n
    ] }),
    /* @__PURE__ */ s(p, { children: [
      /* @__PURE__ */ i(e, { variant: "secondary", iconOnly: !0, disabled: l, onClick: () => t(1), "aria-label": "First page", children: /* @__PURE__ */ i(a, { icon: h, size: "regular" }) }),
      /* @__PURE__ */ i(e, { variant: "secondary", iconOnly: !0, disabled: l, onClick: () => t(r - 1), "aria-label": "Previous page", children: /* @__PURE__ */ i(a, { icon: v, size: "regular" }) }),
      /* @__PURE__ */ i(e, { variant: "secondary", iconOnly: !0, disabled: d, onClick: () => t(r + 1), "aria-label": "Next page", children: /* @__PURE__ */ i(a, { icon: y, size: "regular" }) }),
      /* @__PURE__ */ i(e, { variant: "secondary", iconOnly: !0, disabled: d, onClick: () => t(c), "aria-label": "Last page", children: /* @__PURE__ */ i(a, { icon: x, size: "regular" }) })
    ] })
  ] });
}
export {
  I as Pagination
};
