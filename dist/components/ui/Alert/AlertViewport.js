import { Alert as e } from "./Alert.js";
import { useEffect as t, useSyncExternalStore as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { createPortal as a } from "react-dom";
// src/components/ui/Alert/AlertViewport.tsx
var o = 5e3, s = [], c = 1, l = /* @__PURE__ */ new Set();
function u(e) {
	s = e, l.forEach((e) => e());
}
function d(e) {
	return l.add(e), () => {
		l.delete(e);
	};
}
function f({ type: e, variant: t, message: n, duration: r = o }) {
	let i = c++;
	return u([...t === "banner" ? s.filter((e) => e.variant !== "banner") : s, {
		id: i,
		type: e,
		variant: t,
		message: n,
		duration: r
	}]), i;
}
function p(e) {
	u(s.filter((t) => t.id !== e));
}
function m({ alert: n }) {
	return t(() => {
		let e = window.setTimeout(() => p(n.id), n.duration);
		return () => window.clearTimeout(e);
	}, [n.id, n.duration]), /* @__PURE__ */ r(e, {
		type: n.type,
		variant: n.variant,
		onClose: () => p(n.id),
		children: n.message
	});
}
function h() {
	let e = n(d, () => s, () => s);
	if (e.length === 0 || typeof document > "u") return null;
	let t = e.find((e) => e.variant === "banner"), o = e.filter((e) => e.variant === "toast");
	return a(/* @__PURE__ */ i("div", {
		className: "fixed inset-x-0 top-0 flex flex-col items-center pointer-events-none",
		style: { zIndex: 1e4 },
		children: [t && /* @__PURE__ */ r("div", {
			className: "w-full pointer-events-auto bg-(--bg-surface-base)",
			children: /* @__PURE__ */ r(m, { alert: t })
		}), o.length > 0 && /* @__PURE__ */ r("div", {
			className: "flex flex-col items-center gap-(--stack-2) max-w-full px-(--inset-5)",
			children: o.map((e) => /* @__PURE__ */ r("div", {
				className: "flex max-w-full pointer-events-auto rounded-(--radius-sm) bg-(--bg-surface-base)",
				children: /* @__PURE__ */ r(m, { alert: e })
			}, e.id))
		})]
	}), document.body);
}
export { h as AlertViewport, p as dismissAlert, f as showAlert };
