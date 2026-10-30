import { SearchInput as e } from "../Input/SearchInput.js";
import { jsx as t } from "react/jsx-runtime";
// src/components/ui/Dropdown/MenuSearchBar.tsx
function n(n) {
	return /* @__PURE__ */ t("div", {
		className: "w-full p-(--inset-3) bg-(--bg-surface-base)",
		style: { borderBottom: "var(--space-1) solid var(--border-surface-inverse)" },
		children: /* @__PURE__ */ t(e, { ...n })
	});
}
export { n as MenuSearchBar };
