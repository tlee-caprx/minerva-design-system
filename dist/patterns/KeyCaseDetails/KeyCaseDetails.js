import { jsxs as i, jsx as a } from "react/jsx-runtime";
import { useState as m, Fragment as o } from "react";
import { Icon as u } from "../../components/ui/Icon/Icon.js";
import { ChevronRightIcon as b } from "../../components/ui/Icon/icons/chevron-right.js";
import { Text as t } from "../../components/ui/Text/Text.js";
import { LinkOutIcon as v } from "../../components/ui/Icon/icons/link-out.js";
const d = [
  {
    primary: { label: "Member", value: "Walter White" },
    sub: [
      { label: "Member ID", value: "1234567" },
      { label: "Person Code", value: "01" },
      { label: "Date of Birth", value: "01/01/2000" }
    ]
  },
  {
    primary: { label: "Prescriber", value: "Taylor Sweezy, MD" },
    sub: [
      { label: "Phone", value: "(123) 456-7890" },
      { label: "Fax", value: "(123) 456-7890" }
    ]
  },
  {
    primary: { label: "Drug", value: "Humira Pediatric Crohns Start 80MG/0.4ML Prefilled Syringe Kit" },
    sub: [
      { label: "NDC", value: "12345678901" },
      { label: "GPI", value: "12345678901234" },
      { label: "Quantity/Days Supply", value: "30/30", siblings: [{ label: "MONY", value: "Y" }] }
    ]
  },
  {
    primary: { label: "Origin", value: "Fax" },
    sub: []
  },
  {
    primary: { label: "Plan Benefit", value: "J.P. Wynne High School", onClick: () => {
    } },
    sub: [
      { label: "Formulary", value: "Liberty", onClick: () => {
      }, primary: !0 }
    ]
  }
];
function s({ value: l, onClick: r }) {
  return r ? /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: r,
      className: "inline-flex items-center gap-(--inline-1) cursor-pointer bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-surface-inverse)",
      children: [
        /* @__PURE__ */ a(t, { as: "span", variant: "body-md", underline: !0, className: "text-(--text-surface-inverse)", children: l }),
        /* @__PURE__ */ a(u, { icon: v, size: "small", className: "text-(--text-surface-inverse) shrink-0" })
      ]
    }
  ) : /* @__PURE__ */ a(t, { as: "span", variant: "body-md", className: "text-(--text-surface-inverse)", children: l });
}
function p({ section: l, expanded: r }) {
  return /* @__PURE__ */ i("div", { className: "grid grid-cols-[auto_auto] gap-x-(--inline-1) gap-y-(--stack-1) shrink-0", children: [
    /* @__PURE__ */ i(t, { as: "span", variant: "body-md", weight: "semibold", className: "text-(--text-surface-inverse)", children: [
      l.primary.label,
      ":"
    ] }),
    /* @__PURE__ */ a(s, { value: l.primary.value, onClick: l.primary.onClick }),
    r && l.sub.map((e) => {
      var c;
      return e.primary ? /* @__PURE__ */ i(o, { children: [
        /* @__PURE__ */ i(t, { as: "span", variant: "body-md", weight: "semibold", className: "text-(--text-surface-inverse)", children: [
          e.label,
          ":"
        ] }),
        /* @__PURE__ */ a(s, { value: e.value, onClick: e.onClick })
      ] }, e.label) : /* @__PURE__ */ i(o, { children: [
        /* @__PURE__ */ a("span", { "aria-hidden": "true" }),
        /* @__PURE__ */ i("div", { className: "col-start-2 flex items-center gap-(--inline-4)", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-(--inline-1)", children: [
            /* @__PURE__ */ i(t, { as: "span", variant: "body-md", className: "text-(--text-surface-inverse)", children: [
              e.label,
              ":"
            ] }),
            /* @__PURE__ */ a(s, { value: e.value, onClick: e.onClick })
          ] }),
          (c = e.siblings) == null ? void 0 : c.map((n) => /* @__PURE__ */ i("div", { className: "flex items-center gap-(--inline-1)", children: [
            /* @__PURE__ */ i(t, { as: "span", variant: "body-md", className: "text-(--text-surface-inverse)", children: [
              n.label,
              ":"
            ] }),
            /* @__PURE__ */ a(s, { value: n.value })
          ] }, n.label))
        ] })
      ] }, e.label);
    })
  ] });
}
function C() {
  const [l, r] = m(!1);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex items-start gap-(--inline-4) px-(--inset-7) py-(--inset-3) bg-(--bg-surface-brand) w-full",
      children: [
        /* @__PURE__ */ a(
          "div",
          {
            className: "flex items-center shrink-0",
            style: { height: "var(--body-md-line-height)" },
            children: /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: () => r((e) => !e),
                "aria-label": l ? "Collapse case details" : "Expand case details",
                "aria-expanded": l,
                className: "inline-flex items-center justify-center cursor-pointer bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-surface-inverse)",
                children: /* @__PURE__ */ a(
                  u,
                  {
                    icon: b,
                    size: "regular",
                    className: "text-(--text-surface-inverse)",
                    style: {
                      transform: l ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 200ms ease"
                    }
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex items-start gap-(--inline-4) flex-1 min-w-0 overflow-hidden", children: d.map((e) => /* @__PURE__ */ a(p, { section: e, expanded: l }, e.primary.label)) })
      ]
    }
  );
}
export {
  C as KeyCaseDetails
};
