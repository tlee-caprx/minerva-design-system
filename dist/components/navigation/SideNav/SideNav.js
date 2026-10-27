import { jsx as e, jsxs as o, Fragment as l } from "react/jsx-runtime";
import { MenuBarsIcon as c } from "../../ui/Icon/icons/menu-bars.js";
import { XCloseIcon as d } from "../../ui/Icon/icons/x-close.js";
import { Button as n } from "../../ui/Button/Button.js";
import { Icon as t } from "../../ui/Icon/Icon.js";
function x({ isOpen: i, onToggle: r, children: a, className: s = "" }) {
  return /* @__PURE__ */ e(
    "aside",
    {
      className: `flex flex-col shrink-0 h-full bg-(--bg-surface-base) ${s}`,
      style: {
        width: i ? "var(--sidenav-width-expanded)" : void 0,
        borderRight: "var(--space-1) solid var(--border-surface-base)",
        transition: "width 0.2s ease"
      },
      children: i ? (
        // ── Expanded ──────────────────────────────────────────────────────────
        /* @__PURE__ */ o(l, { children: [
          /* @__PURE__ */ e("div", { className: "flex justify-end shrink-0 px-(--inset-7) pt-(--inset-7)", children: /* @__PURE__ */ e(
            n,
            {
              variant: "tertiary",
              iconOnly: !0,
              onClick: r,
              "aria-label": "Close navigation",
              children: /* @__PURE__ */ e(t, { icon: d, size: "regular" })
            }
          ) }),
          a && /* @__PURE__ */ e("div", { className: "flex flex-col overflow-y-auto px-(--inset-7) pb-(--inset-7)", children: a })
        ] })
      ) : (
        // ── Collapsed ─────────────────────────────────────────────────────────
        /* @__PURE__ */ e("div", { className: "flex justify-center pt-(--inset-7) px-(--inset-3)", children: /* @__PURE__ */ e(
          n,
          {
            variant: "tertiary",
            iconOnly: !0,
            onClick: r,
            "aria-label": "Open navigation",
            children: /* @__PURE__ */ e(
              t,
              {
                icon: c,
                size: "regular",
                className: "text-(--icon-action-secondary-idle)"
              }
            )
          }
        ) })
      )
    }
  );
}
export {
  x as SideNav
};
