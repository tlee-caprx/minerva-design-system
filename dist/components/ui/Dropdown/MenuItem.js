import { jsxs as r, jsx as t } from "react/jsx-runtime";
import { Icon as i } from "../Icon/Icon.js";
import { CheckMarkIcon as s } from "../Icon/icons/check-mark.js";
function v({
  label: c,
  selected: o = !1,
  destructive: n = !1,
  checkbox: l = !1,
  disabled: e = !1,
  className: a = "",
  ...u
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      disabled: e,
      className: [
        "w-full flex items-center justify-between gap-(--inline-2)",
        "py-(--inset-3) px-(--inset-5)",
        "bg-(--bg-surface-base)",
        "border-0 outline-none text-left",
        e ? "text-(--text-control-value-disabled)" : n ? "text-(--text-control-destructive-idle)" : "text-(--text-control-subtle-idle)",
        e ? "cursor-not-allowed" : `cursor-pointer ${e ? "" : n ? "hover:bg-(--bg-control-subtle-destructive-hover) active:bg-(--bg-control-subtle-destructive-hover) focus-visible:bg-(--bg-control-subtle-destructive-hover)" : "hover:bg-(--bg-control-subtle-hover) active:bg-(--bg-control-subtle-hover) focus-visible:bg-(--bg-control-subtle-hover)"}`,
        a
      ].filter(Boolean).join(" "),
      style: {
        fontSize: "var(--menu-item-size)",
        lineHeight: "var(--menu-item-line-height)",
        fontWeight: "var(--menu-item-weight)"
      },
      ...u,
      children: [
        /* @__PURE__ */ r("span", { className: "inline-flex items-center gap-(--inline-2) min-w-0", children: [
          l && /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": "true",
              className: [
                "inline-flex items-center justify-center shrink-0",
                "w-(--space-18) h-(--space-18) rounded-(--radius-sm)",
                e ? "bg-(--bg-control-default-disabled)" : o ? "bg-(--bg-control-selected-idle)" : "bg-(--bg-control-default-idle) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)]"
              ].join(" "),
              children: o && !e && /* @__PURE__ */ t(i, { icon: s, size: "small", className: "text-(--icon-control-selected-idle)" })
            }
          ),
          /* @__PURE__ */ t("span", { className: "truncate", children: c })
        ] }),
        !l && o && /* @__PURE__ */ t(i, { icon: s, size: "small" })
      ]
    }
  );
}
export {
  v as MenuItem
};
