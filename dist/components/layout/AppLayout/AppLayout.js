import { jsxs as r, jsx as a, Fragment as j } from "react/jsx-runtime";
import { useState as O, useRef as K } from "react";
import { judiLogoSrc as T } from "../../ui/Icon/icons/judi-logo.js";
import { AlertViewport as U } from "../../ui/Alert/AlertViewport.js";
import { GlobalHeader as V } from "../../navigation/GlobalHeader/GlobalHeader.js";
import { SideNav as q } from "../../navigation/SideNav/SideNav.js";
import { ActionBar as J } from "../../navigation/ActionBar/ActionBar.js";
function ae({
  variant: o = "minerva",
  // Shared header
  logoSrc: t = T,
  logoIconSrc: w,
  logoAlt: s,
  logoHref: n,
  appName: l,
  onNotificationsClick: c,
  onAccountClick: d,
  // Minerva-only
  headerActions: f,
  accountLabel: x,
  // Evolution-only
  onAiClick: u,
  onKeyboardClick: e,
  // ActionBar
  breadcrumbs: i,
  title: y,
  onBackClick: m,
  secondaryContent: p,
  actions: N,
  titleMeta: F,
  completed: G,
  // SideNav
  sideNavContent: g,
  defaultSideNavOpen: H = !0,
  rightUtilityContent: h,
  rightPanelContent: v,
  rightPanelOpen: L = !1,
  rightPanelDefaultWidth: R = 480,
  rightPanelMinWidth: z = 360,
  // Content
  subBar: b,
  noPadding: M = !1,
  children: $,
  className: I = ""
}) {
  const [W, A] = O(H), E = /* @__PURE__ */ a(
    V,
    {
      variant: o,
      logoSrc: t,
      logoIconSrc: w,
      logoAlt: s,
      logoHref: n,
      appName: l,
      onMenuClick: () => A((k) => !k),
      showMenuButton: !!g,
      onNotificationsClick: c,
      onAccountClick: d,
      headerActions: f,
      accountLabel: x,
      onAiClick: u,
      onKeyboardClick: e
    }
  ), D = /* @__PURE__ */ a(
    J,
    {
      breadcrumbs: i,
      title: y,
      onBackClick: m,
      secondaryContent: p,
      actions: N,
      titleMeta: F,
      completed: G
    }
  ), S = g ? /* @__PURE__ */ a(
    q,
    {
      isOpen: W,
      onToggle: () => A((k) => !k),
      children: g
    }
  ) : null;
  return /* @__PURE__ */ r("div", { className: `flex flex-col h-screen overflow-hidden bg-(--bg-surface-base) ${I}`, children: [
    /* @__PURE__ */ a(U, {}),
    o === "evolution" ? (
      // ── Evolution — SideNav spans full height alongside ActionBar + content ──
      /* @__PURE__ */ r(j, { children: [
        /* @__PURE__ */ a("div", { className: "sticky top-0 z-50", children: E }),
        /* @__PURE__ */ r("div", { className: "flex flex-1 overflow-hidden", children: [
          W && S,
          /* @__PURE__ */ r("div", { className: "flex flex-col flex-1 min-w-0 overflow-hidden", children: [
            D,
            b && /* @__PURE__ */ a("div", { className: "shrink-0", children: b }),
            /* @__PURE__ */ a("main", { "aria-label": "Page content", className: `flex-1 overflow-auto bg-(--bg-surface-subtle) ${M ? "" : "p-(--layout-4)"}`, children: $ })
          ] }),
          v && /* @__PURE__ */ a(B, { open: L, defaultWidth: R, minWidth: z, children: v }),
          h && /* @__PURE__ */ a(X, { children: h })
        ] })
      ] })
    ) : (
      // ── Minerva — SideNav sits below ActionBar ────────────────────────────────
      /* @__PURE__ */ r(j, { children: [
        /* @__PURE__ */ r("div", { className: "sticky top-0 z-50", children: [
          E,
          D,
          b && /* @__PURE__ */ a("div", { className: "shrink-0", children: b })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex flex-1 overflow-hidden", children: [
          S,
          /* @__PURE__ */ a("main", { "aria-label": "Page content", className: `flex-1 overflow-auto bg-(--bg-surface-subtle) ${M ? "" : "p-(--layout-4)"}`, children: $ }),
          v && /* @__PURE__ */ a(B, { open: L, defaultWidth: R, minWidth: z, children: v }),
          h && /* @__PURE__ */ a(X, { children: h })
        ] })
      ] })
    )
  ] });
}
function X({ children: o }) {
  return /* @__PURE__ */ a(
    "aside",
    {
      "aria-label": "Utility navigation",
      className: "flex h-full w-(--space-48) shrink-0 flex-col items-center gap-(--stack-2) bg-(--bg-surface-base) px-(--inset-2) py-(--inset-3)",
      style: { borderLeft: "var(--space-1) solid var(--border-surface-base)" },
      children: o
    }
  );
}
function B({
  children: o,
  open: t,
  defaultWidth: w,
  minWidth: s
}) {
  const n = K(null), [l, c] = O(w), d = () => {
    var e, i;
    return Math.max(s, Math.floor((((i = (e = n.current) == null ? void 0 : e.parentElement) == null ? void 0 : i.clientWidth) ?? window.innerWidth) / 2));
  }, f = (e) => Math.min(d(), Math.max(s, e)), x = (e) => {
    e.preventDefault();
    const i = e.clientX, y = l, m = (N) => {
      c(f(y + i - N.clientX));
    }, p = () => {
      window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", p);
    };
    window.addEventListener("pointermove", m), window.addEventListener("pointerup", p);
  }, u = (e) => c((i) => f(i + e));
  return /* @__PURE__ */ a(
    "aside",
    {
      ref: n,
      "aria-label": "Utility panel",
      "aria-hidden": !t,
      className: "relative shrink-0 overflow-hidden transition-[width] duration-200 ease-out",
      style: { width: t ? `${l}px` : "0px" },
      children: /* @__PURE__ */ r(
        "div",
        {
          className: `relative h-full bg-(--bg-surface-base) transition-transform duration-200 ease-out ${t ? "translate-x-0" : "translate-x-full"}`,
          style: { width: `${l}px`, borderLeft: "var(--space-1) solid var(--border-surface-base)" },
          children: [
            /* @__PURE__ */ a(
              "div",
              {
                role: "separator",
                "aria-label": "Resize utility panel",
                "aria-orientation": "vertical",
                "aria-valuemin": s,
                "aria-valuemax": d(),
                "aria-valuenow": l,
                tabIndex: t ? 0 : -1,
                onPointerDown: x,
                onKeyDown: (e) => {
                  e.key === "ArrowLeft" && (e.preventDefault(), u(16)), e.key === "ArrowRight" && (e.preventDefault(), u(-16));
                },
                className: "absolute inset-y-0 left-0 z-10 w-(--space-4) -translate-x-1/2 cursor-col-resize bg-transparent hover:bg-(--border-control-emphasis) focus-visible:bg-(--border-control-default-focus) focus-visible:outline-none"
              }
            ),
            o
          ]
        }
      )
    }
  );
}
export {
  ae as AppLayout
};
