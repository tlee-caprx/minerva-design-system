import { jsx as e } from "react/jsx-runtime";
// src/components/ui/Icon/Icon.tsx
var t = {
	regular: 20,
	small: 14
};
function n({ icon: n, size: r = "regular", ...i }) {
	let a = t[r];
	return /* @__PURE__ */ e(n, {
		width: a,
		height: a,
		...i
	});
}
export { n as Icon };
