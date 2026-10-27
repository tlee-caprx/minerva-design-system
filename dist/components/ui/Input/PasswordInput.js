import { jsx as t } from "react/jsx-runtime";
import { forwardRef as s, useState as a } from "react";
import { Input as c } from "./Input.js";
import { Icon as p } from "../Icon/Icon.js";
import { EyeSlashIcon as m } from "../Icon/icons/eye-slash.js";
import { EyeIcon as l } from "../Icon/icons/eye.js";
const h = s(function(r, e) {
  const [o, n] = a(!1);
  return /* @__PURE__ */ t(
    c,
    {
      ...r,
      ref: e,
      type: o ? "text" : "password",
      rightIcon: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n((i) => !i),
          "aria-label": o ? "Hide password" : "Show password",
          className: "inline-flex items-center justify-center cursor-pointer bg-transparent p-0 text-(--icon-action-secondary-idle) hover:text-(--icon-action-secondary-hover)",
          children: /* @__PURE__ */ t(p, { icon: o ? m : l, size: "regular" })
        }
      )
    }
  );
});
export {
  h as PasswordInput
};
