import { jsxs as d, jsx as t } from "react/jsx-runtime";
import { useId as y, useState as U, useRef as N, useEffect as L } from "react";
import { useEditor as T, EditorContent as M, useEditorState as P } from "@tiptap/react";
import R from "@tiptap/starter-kit";
import { Placeholder as j } from "@tiptap/extensions";
import { LinkPanel as q } from "./LinkPanel.js";
import { ToolbarButton as l } from "./ToolbarButton.js";
import { FieldWrapper as D } from "../../components/ui/FieldWrapper/FieldWrapper.js";
import { BoldIcon as F } from "../../components/ui/Icon/icons/bold.js";
import { ItalicIcon as H } from "../../components/ui/Icon/icons/italic.js";
import { UnderlineIcon as z } from "../../components/ui/Icon/icons/underline.js";
import { StrikethroughIcon as K } from "../../components/ui/Icon/icons/strikethrough.js";
import { ListUlIcon as O } from "../../components/ui/Icon/icons/list-ul.js";
import { ListOlIcon as W } from "../../components/ui/Icon/icons/list-ol.js";
import { LinkIcon as $ } from "../../components/ui/Icon/icons/link.js";
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
function w({ editor: n, onLinkClick: c }) {
  const o = P({
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
  }), r = (e) => e(n.chain().focus()).run();
  return /* @__PURE__ */ d(
    "div",
    {
      role: "toolbar",
      "aria-label": "Formatting",
      className: "flex items-start gap-(--inline-2) p-(--inset-1)",
      style: { borderBottom: "var(--space-1) solid var(--border-control-default-idle)" },
      children: [
        /* @__PURE__ */ d(k, { children: [
          /* @__PURE__ */ t(l, { label: "Bold", icon: F, active: o.bold, onClick: () => r((e) => e.toggleBold()) }),
          /* @__PURE__ */ t(l, { label: "Italic", icon: H, active: o.italic, onClick: () => r((e) => e.toggleItalic()) }),
          /* @__PURE__ */ t(l, { label: "Underline", icon: z, active: o.underline, onClick: () => r((e) => e.toggleUnderline()) }),
          /* @__PURE__ */ t(l, { label: "Strikethrough", icon: K, active: o.strike, onClick: () => r((e) => e.toggleStrike()) })
        ] }),
        /* @__PURE__ */ d(k, { children: [
          /* @__PURE__ */ t(l, { label: "Bulleted list", icon: O, active: o.bulletList, onClick: () => r((e) => e.toggleBulletList()) }),
          /* @__PURE__ */ t(l, { label: "Numbered list", icon: W, active: o.orderedList, onClick: () => r((e) => e.toggleOrderedList()) })
        ] }),
        /* @__PURE__ */ t(k, { divider: !1, children: /* @__PURE__ */ t(l, { label: "Link", icon: $, active: o.link, onClick: c }) })
      ]
    }
  );
}
function ce({
  label: n,
  required: c = !1,
  tooltip: o,
  instructions: r,
  invalid: e = !1,
  disabled: b = !1,
  readOnly: m = !1,
  value: a,
  defaultValue: I,
  onChange: v,
  placeholder: C,
  height: x = "calc(var(--space-40) * 4.55)",
  id: B,
  className: E = ""
}) {
  const A = y(), g = B ?? A, s = !b && !m, [S, p] = U(null), u = N(v);
  u.current = v;
  const i = T({
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
        ...m ? { "aria-readonly": "true" } : {},
        class: "minerva-rte-content"
      }
    },
    onUpdate: ({ editor: f }) => {
      var h;
      return (h = u.current) == null ? void 0 : h.call(u, f.isEmpty ? "" : f.getHTML());
    }
  });
  return L(() => {
    i.isDestroyed || (i.setEditable(s), s || p(null));
  }, [i, s]), L(() => {
    if (a === void 0 || i.isDestroyed) return;
    const f = i.isEmpty ? "" : i.getHTML();
    a !== f && i.commands.setContent(a, { emitUpdate: !1 });
  }, [i, a]), /* @__PURE__ */ d("div", { className: E, children: [
    /* @__PURE__ */ d(
      D,
      {
        inputId: g,
        label: n,
        required: c,
        tooltip: o,
        instructions: r,
        invalid: e,
        disabled: b,
        readOnly: m,
        flush: !0,
        children: [
          s && /* @__PURE__ */ t(w, { editor: i, onLinkClick: () => p("add") }),
          /* @__PURE__ */ t("div", { className: "minerva-rte-scroll", style: { height: x }, children: /* @__PURE__ */ t(M, { editor: i, className: "h-full" }) })
        ]
      }
    ),
    s && /* @__PURE__ */ t(q, { editor: i, addRequested: S === "add", onClose: () => p(null) })
  ] });
}
export {
  ce as RichTextEditor
};
