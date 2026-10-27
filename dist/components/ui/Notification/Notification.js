import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { Text as l } from "../Text/Text.js";
import { Button as t } from "../Button/Button.js";
function f({
  title: s = "Notifications",
  children: a,
  onMarkAllAsRead: r,
  onViewAll: n,
  className: c = ""
}) {
  return /* @__PURE__ */ i("section", { className: `w-[400px] rounded-(--radius-sm) bg-(--bg-surface-base) p-(--inset-6) shadow-(--shadow-surface-md) ${c}`, children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-(--inline-3)", children: [
      /* @__PURE__ */ e(l, { as: "h2", variant: "heading-sm", className: "text-(--text-surface-base)", children: s }),
      /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center gap-(--inline-2)", children: [
        /* @__PURE__ */ e(t, { variant: "tertiary", onClick: r, children: "Mark All As Read" }),
        /* @__PURE__ */ e(t, { variant: "tertiary", onClick: n, children: "View All" })
      ] })
    ] }),
    a && /* @__PURE__ */ e("div", { className: "mt-(--stack-4)", children: a })
  ] });
}
export {
  f as Notification
};
