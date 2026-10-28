import { jsxs as m, jsx as r } from "react/jsx-runtime";
import { useSyncExternalStore as p, useEffect as x } from "react";
import { createPortal as b } from "react-dom";
import { Alert as v } from "./Alert.js";
const w = 5e3;
let i = [], h = 1;
const o = /* @__PURE__ */ new Set();
function d(e) {
  i = e, o.forEach((t) => t());
}
function g(e) {
  return o.add(e), () => {
    o.delete(e);
  };
}
function E({ type: e, variant: t, message: s, duration: n = w }) {
  const c = h++, u = t === "banner" ? i.filter((f) => f.variant !== "banner") : i;
  return d([...u, { id: c, type: e, variant: t, message: s, duration: n }]), c;
}
function l(e) {
  d(i.filter((t) => t.id !== e));
}
function a({ alert: e }) {
  return x(() => {
    const t = window.setTimeout(() => l(e.id), e.duration);
    return () => window.clearTimeout(t);
  }, [e.id, e.duration]), /* @__PURE__ */ r(v, { type: e.type, variant: e.variant, onClose: () => l(e.id), children: e.message });
}
function I() {
  const e = p(g, () => i, () => i);
  if (e.length === 0 || typeof document > "u") return null;
  const t = e.find((n) => n.variant === "banner"), s = e.filter((n) => n.variant === "toast");
  return b(
    /* @__PURE__ */ m(
      "div",
      {
        className: "fixed inset-x-0 top-0 flex flex-col items-center pointer-events-none",
        style: { zIndex: 1e4 },
        children: [
          t && /* @__PURE__ */ r("div", { className: "w-full pointer-events-auto bg-(--bg-surface-base)", children: /* @__PURE__ */ r(a, { alert: t }) }),
          s.length > 0 && /* @__PURE__ */ r("div", { className: "flex flex-col items-center gap-(--stack-2) max-w-full px-(--inset-5)", children: s.map((n) => /* @__PURE__ */ r("div", { className: "flex max-w-full pointer-events-auto rounded-(--radius-sm) bg-(--bg-surface-base)", children: /* @__PURE__ */ r(a, { alert: n }) }, n.id)) })
        ]
      }
    ),
    document.body
  );
}
export {
  I as AlertViewport,
  l as dismissAlert,
  E as showAlert
};
