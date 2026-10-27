import { jsx as e } from "react/jsx-runtime";
import { PDFViewer as c } from "@embedpdf/react-pdf-viewer";
function s({ src: r, config: i, className: o = "", style: f }) {
  const { theme: n, ...t } = i ?? {};
  return /* @__PURE__ */ e("div", { className: `overflow-hidden bg-(--bg-surface-base) ${o}`, style: f, children: /* @__PURE__ */ e(
    c,
    {
      className: "h-full w-full",
      config: {
        ...t,
        src: r,
        theme: {
          preference: "light",
          ...n
        }
      }
    }
  ) });
}
export {
  s as DocumentViewer
};
