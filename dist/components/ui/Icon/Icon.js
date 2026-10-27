import { jsx as c } from "react/jsx-runtime";
const e = {
  regular: 20,
  small: 14
};
function l({ icon: o, size: t = "regular", ...n }) {
  const r = e[t];
  return /* @__PURE__ */ c(o, { width: r, height: r, ...n });
}
export {
  l as Icon
};
