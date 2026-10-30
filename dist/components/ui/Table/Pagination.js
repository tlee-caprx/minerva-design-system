import { Icon as e } from "../Icon/Icon.js";
import { ChevronStartIcon as t } from "../Icon/icons/chevron-start.js";
import { ChevronLeftIcon as n } from "../Icon/icons/chevron-left.js";
import { ChevronRightIcon as r } from "../Icon/icons/chevron-right.js";
import { ChevronEndIcon as i } from "../Icon/icons/chevron-end.js";
import { Text as a } from "../Text/Text.js";
import { Button as o } from "../Button/Button.js";
import { ButtonGroup as s } from "../ButtonGroup/ButtonGroup.js";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
// src/components/ui/Table/Pagination.tsx
function u({ currentPage: u, pageSize: d, totalItems: f, onPageChange: p, className: m = "" }) {
	if (f <= d) return null;
	let h = Math.ceil(f / d), g = (u - 1) * d + 1, _ = Math.min(u * d, f), v = u <= 1, y = u >= h;
	return /* @__PURE__ */ l("div", {
		className: `flex items-center justify-between p-(--inset-6) bg-(--bg-surface-base) ${m}`,
		children: [/* @__PURE__ */ l(a, {
			variant: "body-md",
			className: "text-(--text-surface-base)",
			children: [
				"Showing ",
				g,
				"-",
				_,
				" of ",
				f
			]
		}), /* @__PURE__ */ l(s, { children: [
			/* @__PURE__ */ c(o, {
				variant: "secondary",
				iconOnly: !0,
				"aria-disabled": v || void 0,
				onClick: () => !v && p(1),
				"aria-label": "First page",
				children: /* @__PURE__ */ c(e, {
					icon: t,
					size: "regular"
				})
			}),
			/* @__PURE__ */ c(o, {
				variant: "secondary",
				iconOnly: !0,
				"aria-disabled": v || void 0,
				onClick: () => !v && p(u - 1),
				"aria-label": "Previous page",
				children: /* @__PURE__ */ c(e, {
					icon: n,
					size: "regular"
				})
			}),
			/* @__PURE__ */ c(o, {
				variant: "secondary",
				iconOnly: !0,
				"aria-disabled": y || void 0,
				onClick: () => !y && p(u + 1),
				"aria-label": "Next page",
				children: /* @__PURE__ */ c(e, {
					icon: r,
					size: "regular"
				})
			}),
			/* @__PURE__ */ c(o, {
				variant: "secondary",
				iconOnly: !0,
				"aria-disabled": y || void 0,
				onClick: () => !y && p(h),
				"aria-label": "Last page",
				children: /* @__PURE__ */ c(e, {
					icon: i,
					size: "regular"
				})
			})
		] })]
	});
}
export { u as Pagination };
