import { jsx as e, jsxs as i, Fragment as h } from "react/jsx-runtime";
import { MenuGridIcon as k } from "../../ui/Icon/icons/menu-grid.js";
import { MenuBarsIcon as N } from "../../ui/Icon/icons/menu-bars.js";
import { BellIcon as u } from "../../ui/Icon/icons/bell.js";
import { ChevronDownIcon as O } from "../../ui/Icon/icons/chevron-down.js";
import { MessageDotsIcon as I } from "../../ui/Icon/icons/message-dots.js";
import { SettingsIcon as C } from "../../ui/Icon/icons/settings.js";
import { judiLogoSrc as j } from "../../ui/Icon/icons/judi-logo.js";
import { Button as r } from "../../ui/Button/Button.js";
import { Icon as l } from "../../ui/Icon/Icon.js";
function K({
  variant: v = "minerva",
  logoSrc: f = j,
  logoIconSrc: a,
  logoAlt: t = "Judi",
  logoHref: g = "/",
  appName: n,
  onMenuClick: o,
  showMenuButton: s = !0,
  onNotificationsClick: c,
  headerActions: m,
  onAccountClick: b,
  accountLabel: p = "Account",
  onAiClick: x,
  onKeyboardClick: y,
  className: z = ""
}) {
  const d = /* @__PURE__ */ i("a", { href: g, className: "flex items-center h-(--space-24)", children: [
    /* @__PURE__ */ e(
      "img",
      {
        src: f,
        alt: t,
        className: `h-full w-auto ${a ? "hidden sm:block" : ""}`
      }
    ),
    a && /* @__PURE__ */ e(
      "img",
      {
        src: a,
        alt: t,
        className: "h-full w-auto block sm:hidden"
      }
    )
  ] });
  return /* @__PURE__ */ e(
    "header",
    {
      className: `flex items-center px-(--inset-6) py-(--inset-4) ${z}`,
      style: {
        background: "var(--bg-navigation-bar)",
        borderBottom: "var(--space-1) solid var(--border-surface-base)"
      },
      children: v === "evolution" ? (
        // ── Evolution — [menu+name] [logo] [actions+bell+ai+settings] ──────────
        /* @__PURE__ */ i(h, { children: [
          /* @__PURE__ */ i("div", { className: "flex flex-1 items-center gap-(--inline-3)", children: [
            s && /* @__PURE__ */ e(r, { variant: "inverse", iconOnly: !0, onClick: o, "aria-label": "Open menu", children: /* @__PURE__ */ e(l, { icon: N, size: "regular" }) }),
            n && /* @__PURE__ */ e(
              "span",
              {
                className: "text-(--text-surface-inverse)",
                style: {
                  fontSize: "var(--global-header-module-title-size)",
                  lineHeight: "var(--global-header-module-title-line-height)",
                  fontWeight: "var(--global-header-module-title-weight)"
                },
                children: n
              }
            )
          ] }),
          d,
          /* @__PURE__ */ i("div", { className: "flex flex-1 items-center justify-end gap-(--inline-3)", children: [
            m,
            /* @__PURE__ */ e(r, { variant: "inverse", iconOnly: !0, onClick: c, "aria-label": "Notifications", children: /* @__PURE__ */ e(l, { icon: u, size: "regular" }) }),
            /* @__PURE__ */ e(r, { variant: "inverse", iconOnly: !0, onClick: x, "aria-label": "AI assistant", children: /* @__PURE__ */ e(l, { icon: I, size: "regular" }) }),
            /* @__PURE__ */ e(r, { variant: "inverse", iconOnly: !0, onClick: y, "aria-label": "Keyboard shortcuts", children: /* @__PURE__ */ e(l, { icon: C, size: "regular" }) })
          ] })
        ] })
      ) : (
        // ── Minerva — [menu+logo+name] [actions+bell+account] ─────────────────
        /* @__PURE__ */ i(h, { children: [
          /* @__PURE__ */ i("div", { className: "flex flex-1 items-center gap-(--inline-4)", children: [
            s && /* @__PURE__ */ e(r, { variant: "inverse", iconOnly: !0, onClick: o, "aria-label": "Open menu", children: /* @__PURE__ */ e(l, { icon: k, size: "regular" }) }),
            d,
            n && /* @__PURE__ */ e(
              "span",
              {
                className: "text-(--text-surface-inverse)",
                style: {
                  fontSize: "var(--global-header-module-title-size)",
                  lineHeight: "var(--global-header-module-title-line-height)",
                  fontWeight: "var(--global-header-module-title-weight)"
                },
                children: n
              }
            )
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center gap-(--inline-4)", children: [
            m,
            /* @__PURE__ */ e(r, { variant: "inverse", iconOnly: !0, onClick: c, "aria-label": "Notifications", children: /* @__PURE__ */ e(l, { icon: u, size: "regular" }) }),
            /* @__PURE__ */ e(r, { variant: "inverse", rightIcon: O, onClick: b, children: p })
          ] })
        ] })
      )
    }
  );
}
export {
  K as GlobalHeader
};
