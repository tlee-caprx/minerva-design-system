import { jsxs as R, jsx as i } from "react/jsx-runtime";
import { useRef as u, useState as f, useEffect as m, useLayoutEffect as S } from "react";
import { createPortal as T } from "react-dom";
import { useEditorState as j } from "@tiptap/react";
import { ToolbarButton as p } from "./ToolbarButton.js";
import { Input as B } from "../../components/ui/Input/Input.js";
import { Text as F } from "../../components/ui/Text/Text.js";
import { CheckMarkIcon as U } from "../../components/ui/Icon/icons/check-mark.js";
import { EditIcon as $ } from "../../components/ui/Icon/icons/edit.js";
import { DeleteIcon as H } from "../../components/ui/Icon/icons/delete.js";
function Z({ editor: n, addRequested: D, onClose: C }) {
  const c = u(null), [M, h] = f(!1), [k, v] = f(""), [l, w] = f(null), { inLink: g, href: d, focused: A, selectionKey: N } = j({
    editor: n,
    selector: ({ editor: e }) => ({
      inLink: e.isActive("link"),
      href: e.getAttributes("link").href ?? "",
      focused: e.isFocused,
      selectionKey: `${e.state.selection.from}-${e.state.selection.to}`
    })
  }), t = D || M ? "add" : g && A ? "edit" : null, x = u(!1);
  m(() => {
    t === "add" && !x.current && v(d || "https://"), x.current = t === "add";
  });
  const a = (e) => {
    h(!1), C(), e && n.commands.focus();
  };
  S(() => {
    if (!t) {
      w(null);
      return;
    }
    const e = () => {
      var E;
      const r = (E = c.current) == null ? void 0 : E.getBoundingClientRect();
      if (!r) return;
      const s = n.view.coordsAtPos(n.state.selection.from), o = 8, K = Math.max(o, Math.min(s.left, window.innerWidth - r.width - o)), L = s.bottom + o, z = L + r.height <= window.innerHeight ? L : s.top - o - r.height;
      w({ top: z, left: K });
    };
    return e(), window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
      window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
    };
  }, [t, N, n]);
  const b = u(null);
  m(() => {
    var e;
    t === "add" && l && ((e = b.current) == null || e.focus());
  }, [t, l !== null]), m(() => {
    if (t !== "add") return;
    const e = (r) => {
      var o;
      const s = r.target;
      !((o = c.current) != null && o.contains(s)) && !n.view.dom.contains(s) && a(!1);
    };
    return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
  });
  const y = () => {
    const e = k.trim();
    !e || e === "https://" || e === "http://" ? n.chain().focus().extendMarkRange("link").unsetLink().run() : n.state.selection.empty && !g ? n.chain().focus().insertContent({ type: "text", text: e, marks: [{ type: "link", attrs: { href: e } }] }).run() : n.chain().focus().extendMarkRange("link").setLink({ href: e }).run(), a(!1);
  }, I = () => {
    n.chain().focus().extendMarkRange("link").unsetLink().run(), a(!1);
  }, P = (e) => {
    e.key === "Enter" ? (e.preventDefault(), y()) : e.key === "Escape" && (e.preventDefault(), a(!0));
  };
  return t ? T(
    /* @__PURE__ */ R(
      "div",
      {
        ref: c,
        role: "dialog",
        "aria-label": t === "add" ? "Add link" : "Link",
        className: "fixed flex items-center gap-(--inline-2) p-(--inset-3) rounded-(--radius-sm) bg-(--bg-surface-base)",
        style: {
          ...l ?? { top: 0, left: 0 },
          // Hidden for the one layout pass before it's measured and placed.
          visibility: l ? "visible" : "hidden",
          width: "calc(var(--space-30) * 10)",
          boxShadow: "var(--shadow-surface-lg)",
          zIndex: 9e3
        },
        children: [
          /* @__PURE__ */ i("div", { className: "flex flex-1 min-w-0 items-center", children: t === "add" ? /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ i(
            B,
            {
              ref: b,
              "aria-label": "Link URL",
              value: k,
              onChange: (e) => v(e.target.value),
              onKeyDown: P,
              onFocus: (e) => e.currentTarget.select()
            }
          ) }) : /* @__PURE__ */ i(
            "a",
            {
              href: d,
              target: "_blank",
              rel: "noopener noreferrer",
              onMouseDown: (e) => e.preventDefault(),
              className: "min-w-0 truncate text-(--text-action-hyperlink) hover:underline",
              children: /* @__PURE__ */ i(F, { variant: "body-md", className: "truncate", children: d })
            }
          ) }),
          /* @__PURE__ */ R("div", { className: "flex shrink-0 items-center gap-(--inline-1)", children: [
            t === "add" ? /* @__PURE__ */ i(p, { label: "Apply link", icon: U, onClick: y, padding: "md" }) : /* @__PURE__ */ i(p, { label: "Edit link", icon: $, onClick: () => h(!0), padding: "md" }),
            /* @__PURE__ */ i(p, { label: "Remove link", icon: H, onClick: I, padding: "md" })
          ] })
        ]
      }
    ),
    document.body
  ) : null;
}
export {
  Z as LinkPanel
};
