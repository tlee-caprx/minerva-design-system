import { jsxs as d, jsx as t } from "react/jsx-runtime";
import { useId as U, useState as N, useRef as T, useEffect as L } from "react";
import { useEditor as y, EditorContent as M, useEditorState as P } from "@tiptap/react";
import R from "@tiptap/starter-kit";
import { Placeholder as j } from "@tiptap/extensions";
import { LinkPanel as q } from "./LinkPanel.js";
import { ToolbarButton as r } from "./ToolbarButton.js";
import { FieldWrapper as F } from "../../components/ui/FieldWrapper/FieldWrapper.js";
import { BoldIcon as H } from "../../components/ui/Icon/icons/bold.js";
import { ItalicIcon as z } from "../../components/ui/Icon/icons/italic.js";
import { UnderlineIcon as K } from "../../components/ui/Icon/icons/underline.js";
import { StrikethroughIcon as O } from "../../components/ui/Icon/icons/strikethrough.js";
import { ListUlIcon as W } from "../../components/ui/Icon/icons/list-ul.js";
import { ListOlIcon as $ } from "../../components/ui/Icon/icons/list-ol.js";
import { LinkIcon as w } from "../../components/ui/Icon/icons/link.js";
function k({ children: n, divider: c = !0 }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: `flex items-center gap-(--inline-1) ${c ? "pr-(--inset-3)" : ""}`,
      style: c ? { borderRight: "var(--space-1) solid var(--border-control-default-idle)" } : void 0,
      children: n
    }
  );
}
function D({ editor: n, onLinkClick: c }) {
  const i = P({
    editor: n,
    selector: ({ editor: e }) => ({
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      bulletList: e.isActive("bulletList"),
      orderedList: e.isActive("orderedList"),
      link: e.isActive("link")
    })
  }), l = (e) => e(n.chain().focus()).run();
  return /* @__PURE__ */ d(
    "div",
    {
      role: "toolbar",
      "aria-label": "Formatting",
      className: "flex items-start gap-(--inline-2) p-(--inset-1)",
      style: { borderBottom: "var(--space-1) solid var(--border-control-default-idle)" },
      children: [
        /* @__PURE__ */ d(k, { children: [
          /* @__PURE__ */ t(r, { label: "Bold", icon: H, active: i.bold, onClick: () => l((e) => e.toggleBold()) }),
          /* @__PURE__ */ t(r, { label: "Italic", icon: z, active: i.italic, onClick: () => l((e) => e.toggleItalic()) }),
          /* @__PURE__ */ t(r, { label: "Underline", icon: K, active: i.underline, onClick: () => l((e) => e.toggleUnderline()) }),
          /* @__PURE__ */ t(r, { label: "Strikethrough", icon: O, active: i.strike, onClick: () => l((e) => e.toggleStrike()) })
        ] }),
        /* @__PURE__ */ d(k, { children: [
          /* @__PURE__ */ t(r, { label: "Bulleted list", icon: W, active: i.bulletList, onClick: () => l((e) => e.toggleBulletList()) }),
          /* @__PURE__ */ t(r, { label: "Numbered list", icon: $, active: i.orderedList, onClick: () => l((e) => e.toggleOrderedList()) })
        ] }),
        /* @__PURE__ */ t(k, { divider: !1, children: /* @__PURE__ */ t(r, { label: "Link", icon: w, active: i.link, onClick: c }) })
      ]
    }
  );
}
function ce({
  label: n,
  required: c = !1,
  tooltip: i,
  instructions: l,
  invalid: e = !1,
  disabled: b = !1,
  readOnly: f = !1,
  value: a,
  defaultValue: I,
  onChange: v,
  placeholder: C,
  height: x = "calc(var(--space-40) * 4.55)",
  id: B,
  className: E = ""
}) {
  const A = U(), g = B ?? A, s = !b && !f, [S, p] = N(null), u = T(v);
  u.current = v;
  const o = y({
    extensions: [
      R.configure({
        // Only what the toolbar offers: no headings, code or quotes sneaking
        // in through Markdown shortcuts like "# ".
        heading: !1,
        code: !1,
        codeBlock: !1,
        blockquote: !1,
        horizontalRule: !1,
        link: { openOnClick: !1, autolink: !0, defaultProtocol: "https" }
      }),
      j.configure({ placeholder: C ?? "" })
    ],
    content: a ?? I ?? "",
    editable: s,
    editorProps: {
      attributes: {
        id: g,
        role: "textbox",
        "aria-multiline": "true",
        ...e ? { "aria-invalid": "true" } : {},
        ...f ? { "aria-readonly": "true" } : {},
        class: "minerva-rte-content"
      }
    },
    onUpdate: ({ editor: m }) => {
      var h;
      return (h = u.current) == null ? void 0 : h.call(u, m.isEmpty ? "" : m.getHTML());
    }
  });
  return L(() => {
    o.setEditable(s), s || p(null);
  }, [o, s]), L(() => {
    if (a === void 0) return;
    const m = o.isEmpty ? "" : o.getHTML();
    a !== m && o.commands.setContent(a, { emitUpdate: !1 });
  }, [o, a]), /* @__PURE__ */ d("div", { className: E, children: [
    /* @__PURE__ */ d(
      F,
      {
        inputId: g,
        label: n,
        required: c,
        tooltip: i,
        instructions: l,
        invalid: e,
        disabled: b,
        readOnly: f,
        flush: !0,
        children: [
          s && /* @__PURE__ */ t(D, { editor: o, onLinkClick: () => p("add") }),
          /* @__PURE__ */ t("div", { className: "minerva-rte-scroll", style: { height: x }, children: /* @__PURE__ */ t(M, { editor: o, className: "h-full" }) })
        ]
      }
    ),
    s && /* @__PURE__ */ t(q, { editor: o, addRequested: S === "add", onClose: () => p(null) })
  ] });
}
export {
  ce as RichTextEditor
};
