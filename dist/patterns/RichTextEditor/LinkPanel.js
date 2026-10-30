import { Input as e } from "../../components/ui/Input/Input.js";
import { Text as t } from "../../components/ui/Text/Text.js";
import { CheckMarkIcon as n } from "../../components/ui/Icon/icons/check-mark.js";
import { DeleteIcon as r } from "../../components/ui/Icon/icons/delete.js";
import { EditIcon as i } from "../../components/ui/Icon/icons/edit.js";
import { ToolbarButton as a } from "./ToolbarButton.js";
import { useEffect as o, useLayoutEffect as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
import { createPortal as f } from "react-dom";
import { useEditorState as p } from "@tiptap/react";
// src/patterns/RichTextEditor/LinkPanel.tsx
function m({ editor: m, addRequested: h, onClose: g }) {
	let _ = c(null), [v, y] = l(!1), [b, x] = l(""), [S, C] = l(null), { inLink: w, href: T, focused: E, selectionKey: D } = p({
		editor: m,
		selector: ({ editor: e }) => ({
			inLink: e.isActive("link"),
			href: e.getAttributes("link").href ?? "",
			focused: e.isFocused,
			selectionKey: `${e.state.selection.from}-${e.state.selection.to}`
		})
	}), O = h || v ? "add" : w && E ? "edit" : null, k = c(!1);
	o(() => {
		O === "add" && !k.current && x(T || "https://"), k.current = O === "add";
	});
	let A = (e) => {
		y(!1), g(), e && m.commands.focus();
	};
	s(() => {
		if (!O) {
			C(null);
			return;
		}
		let e = () => {
			let e = _.current?.getBoundingClientRect();
			if (!e) return;
			let t = m.view.coordsAtPos(m.state.selection.from), n = Math.max(8, Math.min(t.left, window.innerWidth - e.width - 8)), r = t.bottom + 8, i = r + e.height <= window.innerHeight ? r : t.top - 8 - e.height;
			C({
				top: i,
				left: n
			});
		};
		return e(), window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [
		O,
		D,
		m
	]);
	let j = c(null);
	o(() => {
		O === "add" && S && j.current?.focus();
	}, [O, S !== null]), o(() => {
		if (O !== "add") return;
		let e = (e) => {
			let t = e.target;
			!_.current?.contains(t) && !m.view.dom.contains(t) && A(!1);
		};
		return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
	});
	let M = () => {
		let e = b.trim();
		!e || e === "https://" || e === "http://" ? m.chain().focus().extendMarkRange("link").unsetLink().run() : m.state.selection.empty && !w ? m.chain().focus().insertContent({
			type: "text",
			text: e,
			marks: [{
				type: "link",
				attrs: { href: e }
			}]
		}).run() : m.chain().focus().extendMarkRange("link").setLink({ href: e }).run(), A(!1);
	}, N = () => {
		m.chain().focus().extendMarkRange("link").unsetLink().run(), A(!1);
	}, P = (e) => {
		e.key === "Enter" ? (e.preventDefault(), M()) : e.key === "Escape" && (e.preventDefault(), A(!0));
	};
	return O ? f(/* @__PURE__ */ d("div", {
		ref: _,
		role: "dialog",
		"aria-label": O === "add" ? "Add link" : "Link",
		className: "fixed flex items-center gap-(--inline-2) p-(--inset-3) rounded-(--radius-sm) bg-(--bg-surface-base)",
		style: {
			...S ?? {
				top: 0,
				left: 0
			},
			visibility: S ? "visible" : "hidden",
			width: "calc(var(--space-30) * 10)",
			boxShadow: "var(--shadow-surface-lg)",
			zIndex: 9e3
		},
		children: [/* @__PURE__ */ u("div", {
			className: "flex flex-1 min-w-0 items-center",
			children: O === "add" ? /* @__PURE__ */ u("div", {
				className: "flex-1 min-w-0",
				children: /* @__PURE__ */ u(e, {
					ref: j,
					"aria-label": "Link URL",
					value: b,
					onChange: (e) => x(e.target.value),
					onKeyDown: P,
					onFocus: (e) => e.currentTarget.select()
				})
			}) : /* @__PURE__ */ u("a", {
				href: T,
				target: "_blank",
				rel: "noopener noreferrer",
				onMouseDown: (e) => e.preventDefault(),
				className: "min-w-0 truncate text-(--text-action-hyperlink) hover:underline",
				children: /* @__PURE__ */ u(t, {
					variant: "body-md",
					className: "truncate",
					children: T
				})
			})
		}), /* @__PURE__ */ d("div", {
			className: "flex shrink-0 items-center gap-(--inline-1)",
			children: [O === "add" ? /* @__PURE__ */ u(a, {
				label: "Apply link",
				icon: n,
				onClick: M,
				padding: "md"
			}) : /* @__PURE__ */ u(a, {
				label: "Edit link",
				icon: i,
				onClick: () => y(!0),
				padding: "md"
			}), /* @__PURE__ */ u(a, {
				label: "Remove link",
				icon: r,
				onClick: N,
				padding: "md"
			})]
		})]
	}), document.body) : null;
}
export { m as LinkPanel };
