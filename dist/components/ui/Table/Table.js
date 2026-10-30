import { Children as e, createContext as t, useContext as n, useEffect as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
// src/components/ui/Table/Table.tsx
var l = t("body");
function u({ children: e, stickyFirstColumn: t = !1, paginationTop: n, paginationBottom: o, className: l = "" }) {
	let u = i(null), d = i(null), [f, p] = a(!1), [m, h] = a(!1), [g, _] = a(), v = () => {
		let e = u.current;
		e && (p(e.scrollLeft > 0), h(e.scrollLeft < e.scrollWidth - e.clientWidth - 1), _(e.clientWidth));
	};
	return r(() => {
		let e = u.current, t = d.current;
		if (!e || !t) return;
		v();
		let n = new ResizeObserver(v);
		return n.observe(e), n.observe(t), () => n.disconnect();
	}, []), /* @__PURE__ */ c("div", {
		className: `minerva-table-frame flex flex-col max-w-full rounded-(--radius-sm) overflow-hidden ${l}`,
		style: { border: "var(--space-1) solid var(--border-surface-base)" },
		children: [
			n,
			n && /* @__PURE__ */ s("div", { className: "h-(--space-1) bg-(--border-surface-base)" }),
			/* @__PURE__ */ s("div", {
				ref: u,
				onScroll: v,
				className: "w-full overflow-x-auto",
				style: g ? { "--table-visible-width": `${g}px` } : void 0,
				children: /* @__PURE__ */ s("table", {
					ref: d,
					className: "minerva-table",
					"data-sticky-first": t || void 0,
					"data-scrolled-start": f || void 0,
					"data-scrolled-end": m || void 0,
					children: e
				})
			}),
			o && /* @__PURE__ */ s("div", { className: "h-(--space-1) bg-(--border-surface-base)" }),
			o
		]
	});
}
function d({ children: e, ...t }) {
	return /* @__PURE__ */ s(l.Provider, {
		value: "head",
		children: /* @__PURE__ */ s("thead", {
			...t,
			children: e
		})
	});
}
function f({ children: e, ...t }) {
	return /* @__PURE__ */ s(l.Provider, {
		value: "body",
		children: /* @__PURE__ */ s("tbody", {
			...t,
			children: e
		})
	});
}
function p({ children: t, onClick: r, detail: i, expanded: a = !1, className: u = "", onKeyDown: d, ...f }) {
	let p = n(l), m = p === "body" && !!r, h = (e) => {
		d?.(e), m && e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), r?.());
	};
	return /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("tr", {
		...f,
		"data-row": "",
		"data-clickable": m || void 0,
		"aria-expanded": p === "body" && i !== void 0 ? a : void 0,
		tabIndex: m ? 0 : void 0,
		onClick: m ? r : void 0,
		onKeyDown: h,
		className: [m ? "cursor-pointer" : "", u].join(" "),
		children: t
	}), p === "body" && a && i !== void 0 && /* @__PURE__ */ s("tr", {
		"data-detail": "",
		children: /* @__PURE__ */ s("td", {
			colSpan: e.toArray(t).length,
			className: "p-0",
			children: /* @__PURE__ */ s("div", {
				className: "sticky left-0 w-(--table-visible-width) p-(--inset-5)",
				children: i
			})
		})
	})] });
}
export { u as Table, f as TableBody, d as TableHeader, p as TableRow };
