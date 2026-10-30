import { jsx as e } from "react/jsx-runtime";
import { PDFViewer as t } from "@embedpdf/react-pdf-viewer";
// src/patterns/DocumentViewer/DocumentViewer.tsx
function n({ src: n, config: r, className: i = "", style: a }) {
	let { theme: o, ...s } = r ?? {};
	return /* @__PURE__ */ e("div", {
		className: `overflow-hidden bg-(--bg-surface-base) ${i}`,
		style: a,
		children: /* @__PURE__ */ e(t, {
			className: "h-full w-full",
			config: {
				...s,
				src: n,
				theme: {
					preference: "light",
					...o
				}
			}
		})
	});
}
export { n as DocumentViewer };
