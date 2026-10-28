import { jsx as r } from "react/jsx-runtime";
import { Button as n } from "../Button/Button.js";
import { Icon as a } from "../Icon/Icon.js";
import { ChevronDownIcon as e } from "../Icon/icons/chevron-down.js";
import { ChevronRightIcon as l } from "../Icon/icons/chevron-right.js";
function s({ expanded: o, onClick: i, "aria-label": t }) {
  return /* @__PURE__ */ r(
    n,
    {
      variant: "tertiary",
      iconOnly: !0,
      "aria-expanded": o,
      "aria-label": t ?? (o ? "Hide details" : "Show details"),
      onClick: i,
      children: /* @__PURE__ */ r(a, { icon: o ? e : l, size: "small" })
    }
  );
}
export {
  s as TableExpandButton
};
