import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { Icon as a } from "../Icon/Icon.js";
import { Text as n } from "../Text/Text.js";
import { LinkOutIcon as c } from "../Icon/icons/link-out.js";
function b({ icon: i, label: l, value: r, onClick: s, className: o = "" }) {
  return /* @__PURE__ */ t("div", { className: `inline-flex items-center gap-(--inline-1) ${o}`, children: [
    i && /* @__PURE__ */ e(a, { icon: i, size: "small", className: "text-(--icon-surface-base) shrink-0" }),
    /* @__PURE__ */ t(n, { variant: "body-md", weight: "semibold", className: "text-(--text-surface-base)", children: [
      l,
      ":"
    ] }),
    s ? /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: s,
        className: "inline-flex items-center gap-(--inline-1) cursor-pointer bg-transparent p-0",
        style: { border: "none" },
        children: [
          /* @__PURE__ */ e(n, { variant: "body-md", className: "text-(--text-action-hyperlink) underline", children: r }),
          /* @__PURE__ */ e(a, { icon: c, size: "small", className: "text-(--icon-action-hyperlink) shrink-0" })
        ]
      }
    ) : /* @__PURE__ */ e(n, { variant: "body-md", className: "text-(--text-surface-base)", children: r })
  ] });
}
export {
  b as MetaItem
};
