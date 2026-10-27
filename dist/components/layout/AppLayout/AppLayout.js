import { jsx as a, jsxs as t, Fragment as j } from "react/jsx-runtime";
import { useState as O, useRef as K } from "react";
import { judiLogoSrc as T } from "../../ui/Icon/icons/judi-logo.js";
import { GlobalHeader as U } from "../../navigation/GlobalHeader/GlobalHeader.js";
import { SideNav as q } from "../../navigation/SideNav/SideNav.js";
import { ActionBar as J } from "../../navigation/ActionBar/ActionBar.js";
function C({
  variant: o = "minerva",
  // Shared header
  logoSrc: r = T,
  logoIconSrc: w,
  logoAlt: l,
  logoHref: n,
  appName: s,
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
  secondaryContent: h,
  actions: N,
  titleMeta: F,
  completed: G,
  // SideNav
  sideNavContent: g,
  defaultSideNavOpen: H = !0,
  rightUtilityContent: v,
  rightPanelContent: p,
  rightPanelOpen: L = !1,
  rightPanelDefaultWidth: R = 480,
  rightPanelMinWidth: z = 360,
  // Content
  subBar: b,
  noPadding: M = !1,
  children: $,
  className: I = ""
}) {
  const [W, E] = O(H), A = /* @__PURE__ */ a(
    U,
    {
      variant: o,
      logoSrc: r,
      logoIconSrc: w,
      logoAlt: l,
      logoHref: n,
      appName: s,
      onMenuClick: () => E((k) => !k),
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
      secondaryContent: h,
      actions: N,
      titleMeta: F,
      completed: G
    }
  ), S = g ? /* @__PURE__ */ a(
    q,
    {
      isOpen: W,
      onToggle: () => E((k) => !k),
      children: g
    }
  ) : null;
  return /* @__PURE__ */ a("div", { className: `flex flex-col h-screen overflow-hidden bg-(--bg-surface-base) ${I}`, children: o === "evolution" ? (
    // ── Evolution — SideNav spans full height alongside ActionBar + content ──
    /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ a("div", { className: "sticky top-0 z-50", children: A }),
      /* @__PURE__ */ t("div", { className: "flex flex-1 overflow-hidden", children: [
        W && S,
        /* @__PURE__ */ t("div", { className: "flex flex-col flex-1 min-w-0 overflow-hidden", children: [
          D,
          b && /* @__PURE__ */ a("div", { className: "shrink-0", children: b }),
          /* @__PURE__ */ a("main", { "aria-label": "Page content", className: `flex-1 overflow-auto bg-(--bg-surface-subtle) ${M ? "" : "p-(--layout-4)"}`, children: $ })
        ] }),
        p && /* @__PURE__ */ a(B, { open: L, defaultWidth: R, minWidth: z, children: p }),
        v && /* @__PURE__ */ a(X, { children: v })
      ] })
    ] })
  ) : (
    // ── Minerva — SideNav sits below ActionBar ────────────────────────────────
    /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ t("div", { className: "sticky top-0 z-50", children: [
        A,
        D,
        b && /* @__PURE__ */ a("div", { className: "shrink-0", children: b })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-1 overflow-hidden", children: [
        S,
        /* @__PURE__ */ a("main", { "aria-label": "Page content", className: `flex-1 overflow-auto bg-(--bg-surface-subtle) ${M ? "" : "p-(--layout-4)"}`, children: $ }),
        p && /* @__PURE__ */ a(B, { open: L, defaultWidth: R, minWidth: z, children: p }),
        v && /* @__PURE__ */ a(X, { children: v })
      ] })
    ] })
  ) });
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
  open: r,
  defaultWidth: w,
  minWidth: l
}) {
  const n = K(null), [s, c] = O(w), d = () => {
    var e, i;
    return Math.max(l, Math.floor((((i = (e = n.current) == null ? void 0 : e.parentElement) == null ? void 0 : i.clientWidth) ?? window.innerWidth) / 2));
  }, f = (e) => Math.min(d(), Math.max(l, e)), x = (e) => {
    e.preventDefault();
    const i = e.clientX, y = s, m = (N) => {
      c(f(y + i - N.clientX));
    }, h = () => {
      window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", h);
    };
    window.addEventListener("pointermove", m), window.addEventListener("pointerup", h);
  }, u = (e) => c((i) => f(i + e));
  return /* @__PURE__ */ a(
    "aside",
    {
      ref: n,
      "aria-label": "Utility panel",
      "aria-hidden": !r,
      className: "relative shrink-0 overflow-hidden transition-[width] duration-200 ease-out",
      style: { width: r ? `${s}px` : "0px" },
      children: /* @__PURE__ */ t(
        "div",
        {
          className: `relative h-full bg-(--bg-surface-base) transition-transform duration-200 ease-out ${r ? "translate-x-0" : "translate-x-full"}`,
          style: { width: `${s}px`, borderLeft: "var(--space-1) solid var(--border-surface-base)" },
          children: [
            /* @__PURE__ */ a(
              "div",
              {
                role: "separator",
                "aria-label": "Resize utility panel",
                "aria-orientation": "vertical",
                "aria-valuemin": l,
                "aria-valuemax": d(),
                "aria-valuenow": s,
                tabIndex: r ? 0 : -1,
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
  C as AppLayout
};
