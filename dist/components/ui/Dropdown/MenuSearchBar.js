import { jsx as r } from "react/jsx-runtime";
import { SearchInput as a } from "../Input/SearchInput.js";
function t(e) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: "w-full p-(--inset-3) bg-(--bg-surface-base)",
      style: { borderBottom: "var(--space-1) solid var(--border-surface-inverse)" },
      children: /* @__PURE__ */ r(a, { ...e })
    }
  );
}
export {
  t as MenuSearchBar
};
