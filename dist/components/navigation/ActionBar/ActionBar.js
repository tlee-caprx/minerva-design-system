import { jsxs as s, jsx as e, Fragment as d } from "react/jsx-runtime";
import { Breadcrumb as h } from "../Breadcrumb/Breadcrumb.js";
import { Button as x } from "../../ui/Button/Button.js";
import { ArrowLeftIcon as p } from "../../ui/Icon/icons/arrow-left.js";
import { Text as o } from "../../ui/Text/Text.js";
import { CheckMarkIcon as g } from "../../ui/Icon/icons/check-mark.js";
function w({
  breadcrumbs: a = [],
  title: r,
  onBackClick: i,
  secondaryContent: t,
  actions: l,
  titleMeta: c,
  completed: n = !1,
  className: f = ""
}) {
  const m = r || i;
  return /* @__PURE__ */ s(
    "section",
    {
      className: `flex flex-col px-(--layout-4) py-(--inset-6) bg-(--bg-surface-base) ${f}`,
      style: { borderBottom: "var(--space-1) solid var(--border-surface-base)" },
      children: [
        a.length > 0 && /* @__PURE__ */ e(h, { items: a }),
        (m || l) && /* @__PURE__ */ s("div", { className: `flex items-start justify-between gap-(--inline-4) ${a.length > 0 ? "mt-(--space-20)" : ""}`, children: [
          /* @__PURE__ */ s("div", { className: "flex flex-col gap-(--stack-2)", children: [
            m && /* @__PURE__ */ s("div", { className: "flex items-center gap-(--inline-4)", children: [
              i && /* @__PURE__ */ e(
                x,
                {
                  variant: "secondary",
                  leftIcon: p,
                  onClick: i,
                  children: "Back"
                }
              ),
              r && /* @__PURE__ */ e(o, { as: "h1", variant: "heading-xl", className: "text-(--text-surface-base)", style: { margin: 0 }, children: r }),
              (n || c) && /* @__PURE__ */ s("div", { className: "flex items-center gap-(--inline-2)", children: [
                n && /* @__PURE__ */ s(d, { children: [
                  /* @__PURE__ */ e(
                    g,
                    {
                      width: 20,
                      height: 20,
                      style: { color: "var(--icon-feedback-success-base)", flexShrink: 0 }
                    }
                  ),
                  /* @__PURE__ */ e(o, { as: "span", variant: "label-md", className: "text-(--text-feedback-success-base)", children: "Case Completed" })
                ] }),
                c
              ] })
            ] }),
            t && /* @__PURE__ */ e("div", { className: "flex items-center gap-(--inline-4)", children: t })
          ] }),
          l && /* @__PURE__ */ e("div", { className: "shrink-0", children: l })
        ] })
      ]
    }
  );
}
export {
  w as ActionBar
};
