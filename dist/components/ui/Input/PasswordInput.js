import { Input as e } from "./Input.js";
import { Icon as t } from "../Icon/Icon.js";
import { EyeIcon as n } from "../Icon/icons/eye.js";
import { EyeSlashIcon as r } from "../Icon/icons/eye-slash.js";
import { forwardRef as i, useState as a } from "react";
import { jsx as o } from "react/jsx-runtime";
// src/components/ui/Input/PasswordInput.tsx
var s = i(function(i, s) {
	let [c, l] = a(!1);
	return /* @__PURE__ */ o(e, {
		...i,
		ref: s,
		type: c ? "text" : "password",
		rightIcon: /* @__PURE__ */ o("button", {
			type: "button",
			onClick: () => l((e) => !e),
			"aria-label": c ? "Hide password" : "Show password",
			className: "inline-flex items-center justify-center cursor-pointer bg-transparent p-0 text-(--icon-action-secondary-idle) hover:text-(--icon-action-secondary-hover)",
			children: /* @__PURE__ */ o(t, {
				icon: c ? r : n,
				size: "regular"
			})
		})
	});
});
export { s as PasswordInput };
