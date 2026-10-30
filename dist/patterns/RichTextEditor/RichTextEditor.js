import { FieldWrapper as e } from "../../components/ui/FieldWrapper/FieldWrapper.js";
import { BoldIcon as t } from "../../components/ui/Icon/icons/bold.js";
import { ItalicIcon as n } from "../../components/ui/Icon/icons/italic.js";
import { LinkIcon as r } from "../../components/ui/Icon/icons/link.js";
import { ListOlIcon as i } from "../../components/ui/Icon/icons/list-ol.js";
import { ListUlIcon as a } from "../../components/ui/Icon/icons/list-ul.js";
import { StrikethroughIcon as o } from "../../components/ui/Icon/icons/strikethrough.js";
import { UnderlineIcon as s } from "../../components/ui/Icon/icons/underline.js";
import { LinkPanel as c } from "./LinkPanel.js";
import { ToolbarButton as l } from "./ToolbarButton.js";
import { useEffect as u, useId as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
import { EditorContent as g, useEditor as _, useEditorState as v } from "@tiptap/react";
import y from "@tiptap/starter-kit";
import { Placeholder as b } from "@tiptap/extensions";
// src/patterns/RichTextEditor/RichTextEditor.tsx
function x({ children: e, divider: t = !0 }) {
	return /* @__PURE__ */ m("div", {
		className: `flex items-center gap-(--inline-1) ${t ? "pr-(--inset-3)" : ""}`,
		style: t ? { borderRight: "var(--space-1) solid var(--border-control-default-idle)" } : void 0,
		children: e
	});
}
function S({ editor: e, onLinkClick: c }) {
	let u = v({
		editor: e,
		selector: ({ editor: e }) => ({
			bold: e.isActive("bold"),
			italic: e.isActive("italic"),
			underline: e.isActive("underline"),
			strike: e.isActive("strike"),
			bulletList: e.isActive("bulletList"),
			orderedList: e.isActive("orderedList"),
			link: e.isActive("link")
		})
	}), d = (t) => t(e.chain().focus()).run();
	return /* @__PURE__ */ h("div", {
		role: "toolbar",
		"aria-label": "Formatting",
		className: "flex items-start gap-(--inline-2) p-(--inset-1)",
		style: { borderBottom: "var(--space-1) solid var(--border-control-default-idle)" },
		children: [
			/* @__PURE__ */ h(x, { children: [
				/* @__PURE__ */ m(l, {
					label: "Bold",
					icon: t,
					active: u.bold,
					onClick: () => d((e) => e.toggleBold())
				}),
				/* @__PURE__ */ m(l, {
					label: "Italic",
					icon: n,
					active: u.italic,
					onClick: () => d((e) => e.toggleItalic())
				}),
				/* @__PURE__ */ m(l, {
					label: "Underline",
					icon: s,
					active: u.underline,
					onClick: () => d((e) => e.toggleUnderline())
				}),
				/* @__PURE__ */ m(l, {
					label: "Strikethrough",
					icon: o,
					active: u.strike,
					onClick: () => d((e) => e.toggleStrike())
				})
			] }),
			/* @__PURE__ */ h(x, { children: [/* @__PURE__ */ m(l, {
				label: "Bulleted list",
				icon: a,
				active: u.bulletList,
				onClick: () => d((e) => e.toggleBulletList())
			}), /* @__PURE__ */ m(l, {
				label: "Numbered list",
				icon: i,
				active: u.orderedList,
				onClick: () => d((e) => e.toggleOrderedList())
			})] }),
			/* @__PURE__ */ m(x, {
				divider: !1,
				children: /* @__PURE__ */ m(l, {
					label: "Link",
					icon: r,
					active: u.link,
					onClick: c
				})
			})
		]
	});
}
function C({ label: t, required: n = !1, tooltip: r, instructions: i, invalid: a = !1, disabled: o = !1, readOnly: s = !1, value: l, defaultValue: v, onChange: x, placeholder: C, height: w = "calc(var(--space-40) * 4.55)", id: T, className: E = "" }) {
	let D = d(), O = T ?? D, k = !o && !s, [A, j] = p(null), M = f(x);
	M.current = x;
	let N = _({
		extensions: [y.configure({
			heading: !1,
			code: !1,
			codeBlock: !1,
			blockquote: !1,
			horizontalRule: !1,
			link: {
				openOnClick: !1,
				autolink: !0,
				defaultProtocol: "https"
			}
		}), b.configure({ placeholder: C ?? "" })],
		content: l ?? v ?? "",
		editable: k,
		editorProps: { attributes: {
			id: O,
			role: "textbox",
			"aria-multiline": "true",
			...a ? { "aria-invalid": "true" } : {},
			...s ? { "aria-readonly": "true" } : {},
			class: "minerva-rte-content"
		} },
		onUpdate: ({ editor: e }) => M.current?.(e.isEmpty ? "" : e.getHTML())
	});
	return u(() => {
		N.isDestroyed || (N.setEditable(k), k || j(null));
	}, [N, k]), u(() => {
		l === void 0 || N.isDestroyed || l !== (N.isEmpty ? "" : N.getHTML()) && N.commands.setContent(l, { emitUpdate: !1 });
	}, [N, l]), /* @__PURE__ */ h("div", {
		className: E,
		children: [/* @__PURE__ */ h(e, {
			inputId: O,
			label: t,
			required: n,
			tooltip: r,
			instructions: i,
			invalid: a,
			disabled: o,
			readOnly: s,
			flush: !0,
			children: [k && /* @__PURE__ */ m(S, {
				editor: N,
				onLinkClick: () => j("add")
			}), /* @__PURE__ */ m("div", {
				className: "minerva-rte-scroll",
				style: { height: w },
				children: /* @__PURE__ */ m(g, {
					editor: N,
					className: "h-full"
				})
			})]
		}), k && /* @__PURE__ */ m(c, {
			editor: N,
			addRequested: A === "add",
			onClose: () => j(null)
		})]
	});
}
export { C as RichTextEditor };
