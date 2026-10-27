import { jsx as e, jsxs as c } from "react/jsx-runtime";
import { useRef as u, useEffect as f, forwardRef as m, useId as p } from "react";
import { createPortal as x } from "react-dom";
import { Text as b } from "../Text/Text.js";
import { Icon as y } from "../Icon/Icon.js";
import { XCloseIcon as v } from "../Icon/icons/x-close.js";
import { ButtonGroup as h } from "../ButtonGroup/ButtonGroup.js";
const g = m(function({ onClose: r, title: l, children: a, leftAction: i, rightActions: t, className: s = "" }, n) {
  const d = p();
  return /* @__PURE__ */ c(
    "div",
    {
      ref: n,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": d,
      tabIndex: -1,
      className: `flex flex-col gap-(--stack-5) w-[528px] p-(--inset-7) rounded-(--radius-sm) bg-(--bg-surface-base) outline-none ${s}`,
      style: { boxShadow: "var(--shadow-surface-lg)" },
      children: [
        /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-(--inline-4)", children: [
          /* @__PURE__ */ e(b, { id: d, as: "h2", variant: "heading-xs", className: "text-(--text-surface-base)", children: l }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "aria-label": "Close",
              onClick: r,
              className: "shrink-0 inline-flex items-center justify-center cursor-pointer bg-transparent p-0",
              style: { border: "none" },
              children: /* @__PURE__ */ e(y, { icon: v, size: "regular", className: "text-(--icon-action-dismiss-idle)" })
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "text-(--text-surface-base)", children: a }),
        (i || t) && /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-(--inline-4)", children: [
          /* @__PURE__ */ e("div", { children: i }),
          t && /* @__PURE__ */ e(h, { children: t })
        ] })
      ]
    }
  );
});
function M({ open: o, onClose: r, ...l }) {
  const a = u(null), i = u(null);
  return f(() => {
    var s;
    if (!o) return;
    i.current = document.activeElement, (s = a.current) == null || s.focus();
    const t = (n) => {
      n.key === "Escape" && r();
    };
    return document.addEventListener("keydown", t), () => {
      var n;
      document.removeEventListener("keydown", t), (n = i.current) == null || n.focus();
    };
  }, [o, r]), o ? x(
    /* @__PURE__ */ e(
      "div",
      {
        className: "fixed inset-0 z-[9999] flex items-center justify-center",
        style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
        onClick: r,
        children: /* @__PURE__ */ e("div", { onClick: (t) => t.stopPropagation(), children: /* @__PURE__ */ e(g, { ref: a, onClose: r, ...l }) })
      }
    ),
    document.body
  ) : null;
}
export {
  M as Modal,
  g as ModalContent
};
