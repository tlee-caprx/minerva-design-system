import { jsxs as e, jsx as t } from "react/jsx-runtime";
import { Icon as s } from "../Icon/Icon.js";
import { Text as n } from "../Text/Text.js";
import { LinkOutIcon as m } from "../Icon/icons/link-out.js";
function x({ icon: i, label: l, value: a, onClick: r, className: o = "" }) {
  return /* @__PURE__ */ e("div", { className: `inline-flex items-start gap-(--inline-1) max-w-full ${o}`, children: [
    i && // Line-height tall, so the icon centers on the first line of text.
    /* @__PURE__ */ t("span", { className: "inline-flex items-center shrink-0 h-(--body-md-line-height)", children: /* @__PURE__ */ t(s, { icon: i, size: "small", className: "text-(--icon-surface-base)" }) }),
    /* @__PURE__ */ e(n, { variant: "body-md", className: "min-w-0 text-(--text-surface-base) [overflow-wrap:anywhere]", children: [
      /* @__PURE__ */ e(n, { variant: "body-md", weight: "semibold", className: "whitespace-nowrap", children: [
        l,
        ":"
      ] }),
      " ",
      r ? /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "inline cursor-pointer bg-transparent p-0 text-left",
          style: { border: "none" },
          children: [
            /* @__PURE__ */ t(n, { variant: "body-md", className: "text-(--text-action-hyperlink) underline", children: a }),
            " ",
            /* @__PURE__ */ t(s, { icon: m, size: "small", className: "inline-block align-middle text-(--icon-action-hyperlink)" })
          ]
        }
      ) : a
    ] })
  ] });
}
export {
  x as MetaItem
};
