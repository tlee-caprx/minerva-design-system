import { Button as e } from "../Button/Button.js";
import { ChevronDownIcon as t } from "../Icon/icons/chevron-down.js";
import { ChevronRightIcon as n } from "../Icon/icons/chevron-right.js";
import { Icon as r } from "../Icon/Icon.js";
import { jsx as i } from "react/jsx-runtime";
// src/components/ui/Table/TableExpandButton.tsx
function a({ expanded: a, onClick: o, "aria-label": s }) {
	return /* @__PURE__ */ i(e, {
		variant: "tertiary",
		iconOnly: !0,
		"aria-expanded": a,
		"aria-label": s ?? (a ? "Hide details" : "Show details"),
		onClick: o,
		children: /* @__PURE__ */ i(r, {
			icon: a ? t : n,
			size: "small"
		})
	});
}
export { a as TableExpandButton };
