import { jsx as o } from "react/jsx-runtime";
import { forwardRef as m, useRef as h, useState as d, useEffect as I } from "react";
import { Input as b } from "./Input.js";
import { Icon as u } from "../Icon/Icon.js";
import { XCloseIcon as x } from "../Icon/icons/x-close.js";
import { SearchIcon as g } from "../Icon/icons/search.js";
const B = m(function({ onChange: r, value: e, defaultValue: i, ...p }, n) {
  const l = h(null), [f, s] = d(() => !!(e ?? i));
  return I(() => {
    e !== void 0 && s(!!e);
  }, [e]), /* @__PURE__ */ o(
    b,
    {
      ...p,
      value: e,
      defaultValue: i,
      onChange: (t) => {
        s(t.target.value.length > 0), r == null || r(t);
      },
      type: "text",
      ref: (t) => {
        l.current = t, typeof n == "function" ? n(t) : n && (n.current = t);
      },
      leftIcon: /* @__PURE__ */ o(u, { icon: g, size: "regular", className: "text-(--icon-control-default)" }),
      rightIcon: f ? /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            var a;
            const t = l.current;
            if (!t) return;
            const c = (a = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")) == null ? void 0 : a.set;
            c == null || c.call(t, ""), t.dispatchEvent(new Event("input", { bubbles: !0 })), t.focus();
          },
          "aria-label": "Clear search",
          className: "inline-flex items-center justify-center cursor-pointer bg-transparent p-0 text-(--icon-control-default) hover:text-(--icon-control-strong)",
          children: /* @__PURE__ */ o(u, { icon: x, size: "small" })
        }
      ) : void 0
    }
  );
});
export {
  B as SearchInput
};
