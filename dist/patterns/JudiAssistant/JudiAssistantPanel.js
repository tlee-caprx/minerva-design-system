import { jsx as e, jsxs as a, Fragment as k } from "react/jsx-runtime";
import { useState as y, useId as S, useRef as R, useEffect as z } from "react";
import { AssistantRuntimeProvider as M, ThreadPrimitive as g, AuiIf as v, ComposerPrimitive as b, MessagePrimitive as x, groupPartByType as P, useAuiState as N, ActionBarPrimitive as w } from "@assistant-ui/react";
import { Text as l } from "../../components/ui/Text/Text.js";
import { Icon as d } from "../../components/ui/Icon/Icon.js";
import { AIIcon as j } from "../../components/ui/Icon/icons/ai.js";
import { Button as h } from "../../components/ui/Button/Button.js";
import { CloseIcon as J } from "../../components/ui/Icon/icons/close.js";
import { XIcon as E } from "../../components/ui/Icon/icons/x.js";
import { ArrowUpIcon as V } from "../../components/ui/Icon/icons/arrow-up.js";
import { DocumentIcon as A } from "../../components/ui/Icon/icons/document.js";
import { ChevronUpIcon as I } from "../../components/ui/Icon/icons/chevron-up.js";
import { ChevronDownIcon as _ } from "../../components/ui/Icon/icons/chevron-down.js";
import { Tooltip as C } from "../../components/ui/Tooltip/Tooltip.js";
import { CheckCircleIcon as B } from "../../components/ui/Icon/icons/check-circle.js";
import { CopyIcon as O } from "../../components/ui/Icon/icons/copy.js";
import { RefreshIcon as U } from "../../components/ui/Icon/icons/refresh.js";
const H = new URL("data:image/svg+xml,%3csvg%20width='24'%20height='25'%20viewBox='0%200%2024%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.9459%2024.36C18.5413%2024.36%2023.8879%2018.9068%2023.8879%2012.18C23.8879%205.45317%2018.5413%200%2011.9459%200C5.35053%200%200.00390625%205.45317%200.00390625%2012.18C0.00390625%2018.9068%205.35053%2024.36%2011.9459%2024.36Z'%20fill='url(%23paint0_linear_9652_7090)'/%3e%3cpath%20d='M12.2168%2010.3789V18.7283C14.4773%2018.7283%2016.3099%2016.8592%2016.3099%2014.5536C16.3099%2012.248%2014.4773%2010.3789%2012.2168%2010.3789Z'%20fill='white'/%3e%3cpath%20d='M11.1138%2014.3567V18.5314H9.0647C7.93695%2018.5314%207.01562%2017.5968%207.01562%2016.4415C7.01562%2015.2861%207.93192%2014.3516%209.0647%2014.3516H11.1138V14.3567Z'%20fill='%23A8CCEC'/%3e%3cpath%20d='M11.9445%209.2306C13.6713%209.2306%2015.1868%2010.1651%2016.0376%2011.5618V7.14069C16.0376%205.99047%2015.1213%205.05078%2013.9885%205.05078C12.8557%205.05078%2011.9395%205.98533%2011.9395%207.14069V9.2306H11.9445Z'%20fill='%23A8CCEC'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_9652_7090'%20x1='0.00390625'%20y1='12.18'%20x2='23.8829'%20y2='12.18'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.25'%20stop-color='%231A4687'/%3e%3cstop%20offset='1'%20stop-color='%230777B9'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e", import.meta.url).href;
function Z({ title: t, detail: i }) {
  return /* @__PURE__ */ a("div", { className: "judi-assistant-review-step grid grid-cols-[var(--space-4)_minmax(0,1fr)] gap-(--inline-2)", children: [
    /* @__PURE__ */ e("span", { "aria-hidden": "true", className: "mt-(--space-8) size-(--space-4) rounded-(--radius-full) bg-(--icon-surface-subtle)" }),
    /* @__PURE__ */ a("div", { className: "flex min-w-0 flex-col gap-(--stack-1)", children: [
      /* @__PURE__ */ e(l, { variant: "body-md", weight: "semibold", className: "text-(--text-surface-base)", children: t }),
      i && /* @__PURE__ */ e(l, { variant: "body-md", className: "text-(--text-surface-subtle)", children: i })
    ] })
  ] });
}
function D({ text: t, details: i }) {
  return /* @__PURE__ */ e(k, { children: t.split(`
`).filter((r) => r.trim().length > 0).map((r) => /* @__PURE__ */ e(Z, { title: r, detail: i == null ? void 0 : i[r] }, r)) });
}
function G({ children: t }) {
  const i = N((m) => {
    var p;
    return ((p = m.message.status) == null ? void 0 : p.type) === "running";
  }), r = N((m) => m.message.parts.some((p) => p.type === "text" && p.text.length > 0)), c = i && !r, [s, o] = y(!0), [u, f] = y(0), n = R(null);
  return z(() => {
    if (c) {
      n.current = performance.now(), f(0), o(!0);
      const m = window.setInterval(() => {
        f(Math.max(1, Math.round((performance.now() - n.current) / 1e3)));
      }, 1e3);
      return () => window.clearInterval(m);
    }
    n.current !== null && (f(Math.max(1, Math.round((performance.now() - n.current) / 1e3))), n.current = null), o(!1);
  }, [c]), /* @__PURE__ */ a("div", { className: "mb-(--stack-3)", children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        "aria-expanded": s,
        onClick: () => o((m) => !m),
        className: "flex items-center gap-(--inline-1) text-left text-(--text-surface-subtle) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)",
        children: [
          /* @__PURE__ */ e(l, { variant: "body-md", className: c ? "judi-assistant-thinking-shimmer" : "", children: c ? "Thinking…" : u > 0 ? `Thought for ${u}s` : "Review steps" }),
          /* @__PURE__ */ e(d, { icon: s ? I : _, size: "small" })
        ]
      }
    ),
    s && /* @__PURE__ */ e("div", { className: "mt-(--stack-3) flex flex-col gap-(--stack-3)", children: t })
  ] });
}
function T({ count: t, children: i }) {
  const [r, c] = y(!1), s = S();
  return /* @__PURE__ */ a("div", { className: "mt-(--stack-3)", children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        "aria-expanded": r,
        "aria-controls": s,
        onClick: () => c((o) => !o),
        className: "inline-flex items-center gap-(--inline-2) rounded-(--radius-full) bg-(--bg-surface-subtle) px-(--inset-3) py-(--inset-1) text-(--text-surface-base) hover:bg-(--bg-action-neutral-hover) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)",
        children: [
          /* @__PURE__ */ e("span", { "aria-hidden": "true", className: "flex items-center", children: Array.from({ length: Math.min(t, 3) }, (o, u) => /* @__PURE__ */ e(
            "span",
            {
              className: "flex size-(--space-20) items-center justify-center rounded-(--radius-full) border border-(--border-surface-base) bg-(--bg-surface-base) text-(--icon-surface-base)",
              style: { marginLeft: u === 0 ? void 0 : "calc(-1 * var(--space-4))" },
              children: /* @__PURE__ */ e(d, { icon: A, size: "small" })
            },
            u
          )) }),
          /* @__PURE__ */ a(l, { variant: "body-sm", weight: "semibold", children: [
            "Sources (",
            t,
            ")"
          ] }),
          /* @__PURE__ */ e(d, { icon: r ? I : _, size: "small" })
        ]
      }
    ),
    r && /* @__PURE__ */ e("div", { id: s, className: "mt-(--stack-3) grid grid-cols-1 gap-(--layout-1) @min-[36rem]:grid-cols-2", children: i })
  ] });
}
function W({ source: t }) {
  const i = /* @__PURE__ */ a(k, { children: [
    /* @__PURE__ */ a("span", { className: "flex min-w-0 items-center gap-(--inline-2) text-(--text-surface-subtle)", children: [
      /* @__PURE__ */ e("span", { "aria-hidden": "true", className: "flex size-(--space-20) shrink-0 items-center justify-center rounded-(--radius-sm) bg-(--bg-surface-subtle)", children: /* @__PURE__ */ e(d, { icon: A, size: "small" }) }),
      /* @__PURE__ */ e(l, { variant: "body-sm", className: "truncate", children: "Source document" })
    ] }),
    /* @__PURE__ */ e(l, { variant: "body-sm", weight: "semibold", className: "line-clamp-2", children: t.title ?? t.id })
  ] }), r = "flex min-w-0 flex-col gap-(--stack-1) rounded-(--radius-md) border border-(--border-surface-base) bg-(--bg-surface-base) p-(--inset-5) text-(--text-surface-base)";
  return t.url ? /* @__PURE__ */ e("a", { href: t.url, className: `${r} hover:bg-(--bg-surface-subtle) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)`, "aria-label": `View source: ${t.title ?? "Source document"}`, children: i }) : /* @__PURE__ */ e("div", { className: r, children: i });
}
function $() {
  return /* @__PURE__ */ e(x.Root, { className: "ml-auto max-w-[90%] rounded-(--radius-sm) bg-(--bg-surface-subtle) p-(--inset-4)", children: /* @__PURE__ */ e(x.Parts, { children: ({ part: t }) => t.type === "text" ? /* @__PURE__ */ e(l, { variant: "body-md", className: "whitespace-pre-wrap text-(--text-surface-base)", children: t.text }) : null }) });
}
const q = P({ reasoning: ["group-work"], "tool-call": ["group-work"], source: ["group-sources"] });
function L() {
  const t = N((i) => i.message.isCopied);
  return /* @__PURE__ */ a(w.Root, { hideWhenRunning: !0, className: "mt-(--stack-2) flex items-center gap-(--inline-1)", children: [
    /* @__PURE__ */ e(C, { content: t ? "Copied" : "Copy answer", beak: "none", children: /* @__PURE__ */ e(w.Copy, { asChild: !0, copiedDuration: 1500, children: /* @__PURE__ */ e(h, { variant: "tertiary", iconOnly: !0, "aria-label": t ? "Copied to clipboard" : "Copy answer", style: { padding: "var(--inset-1)" }, children: /* @__PURE__ */ e(d, { icon: t ? B : O, size: "small", className: t ? "text-(--icon-feedback-success-base)" : void 0 }) }) }) }),
    /* @__PURE__ */ e(C, { content: "Regenerate answer", beak: "none", children: /* @__PURE__ */ e(w.Reload, { asChild: !0, children: /* @__PURE__ */ e(h, { variant: "tertiary", iconOnly: !0, "aria-label": "Regenerate answer", style: { padding: "var(--inset-1)" }, children: /* @__PURE__ */ e(d, { icon: U, size: "small" }) }) }) }),
    /* @__PURE__ */ e("span", { role: "status", className: "sr-only", children: t ? "Copied to clipboard" : "" })
  ] });
}
function F({ reasoningDetails: t, renderAnswer: i, renderSource: r, renderToolCall: c }) {
  return /* @__PURE__ */ a(x.Root, { className: "flex min-w-0 flex-col gap-(--stack-2)", children: [
    /* @__PURE__ */ a("div", { className: "flex shrink-0 items-center gap-(--inline-3)", children: [
      /* @__PURE__ */ e("img", { src: H, alt: "", "aria-hidden": "true", width: "24", height: "25", className: "h-auto w-(--space-24) shrink-0" }),
      /* @__PURE__ */ e(l, { variant: "body-md", weight: "semibold", className: "text-(--text-surface-base)", children: "Judi AI" })
    ] }),
    /* @__PURE__ */ a("div", { className: "@container ml-[calc(var(--space-24)+var(--inline-3))] min-w-0", children: [
      /* @__PURE__ */ e(x.GroupedParts, { groupBy: q, indicator: "empty", children: ({ part: s, children: o }) => {
        switch (s.type) {
          case "group-work":
            return /* @__PURE__ */ e(G, { children: o });
          case "reasoning":
            return /* @__PURE__ */ e(D, { text: s.text, details: t });
          case "tool-call":
            return (c == null ? void 0 : c({ toolName: s.toolName, args: s.args, result: s.result })) ?? null;
          case "text":
            return /* @__PURE__ */ e(l, { as: "div", variant: "body-md", className: "whitespace-pre-wrap text-(--text-surface-base)", children: i ? i(s.text) : s.text });
          case "group-sources":
            return /* @__PURE__ */ e(T, { count: s.indices.length, children: o });
          case "source":
            return r ? r({ id: s.id, url: s.url, title: s.title }) : /* @__PURE__ */ e(W, { source: { id: s.id, url: s.url, title: s.title } });
          case "indicator":
            return /* @__PURE__ */ e(l, { variant: "body-sm", className: "text-(--text-surface-subtle)", children: "Thinking…" });
          default:
            return null;
        }
      } }),
      /* @__PURE__ */ e(L, {})
    ] })
  ] });
}
function X({ onClose: t, suggestions: i = [], emptyTitle: r = "Ask Judi AI.", emptyDescription: c = "Ask about the current work and its supporting sources.", reasoningDetails: s, renderAnswer: o, renderSource: u, renderToolCall: f }) {
  return /* @__PURE__ */ a(g.Root, { className: "flex h-full min-h-0 flex-col bg-(--bg-surface-base)", children: [
    /* @__PURE__ */ a("header", { className: "flex items-center justify-between border-b border-(--border-surface-base) px-(--inset-7) py-(--inset-5)", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-(--inline-2)", children: [
        /* @__PURE__ */ e(d, { icon: j, size: "regular" }),
        /* @__PURE__ */ e(l, { variant: "body-md", weight: "semibold", className: "text-(--text-surface-base)", children: "Judi AI" })
      ] }),
      t && /* @__PURE__ */ e(h, { variant: "tertiary", iconOnly: !0, "aria-label": "Close Judi AI", onClick: t, children: /* @__PURE__ */ e(d, { icon: J, size: "regular" }) })
    ] }),
    /* @__PURE__ */ a(g.Viewport, { className: "flex min-h-0 flex-1 flex-col gap-(--layout-3) overflow-y-auto p-(--inset-7)", children: [
      /* @__PURE__ */ e(v, { condition: (n) => n.thread.isEmpty, children: /* @__PURE__ */ a("div", { className: "mt-auto flex flex-col gap-(--layout-3)", children: [
        /* @__PURE__ */ a("div", { className: "flex flex-col gap-(--stack-2)", children: [
          /* @__PURE__ */ e(l, { as: "h2", variant: "heading-sm", className: "text-(--text-surface-base)", children: r }),
          /* @__PURE__ */ e(l, { variant: "body-md", className: "text-(--text-surface-subtle)", children: c })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex flex-col items-start gap-(--stack-3)", children: i.map((n) => /* @__PURE__ */ e(g.Suggestion, { prompt: n, send: !0, asChild: !0, children: /* @__PURE__ */ a(h, { variant: "tertiary", unpadded: !0, className: "text-left no-underline hover:no-underline", children: [
          /* @__PURE__ */ e("span", { "aria-hidden": "true", className: "text-(--text-surface-subtle)", children: ">" }),
          n
        ] }) }, n)) })
      ] }) }),
      /* @__PURE__ */ e(g.Messages, { children: ({ message: n }) => n.role === "user" ? /* @__PURE__ */ e($, {}) : /* @__PURE__ */ e(F, { reasoningDetails: s, renderAnswer: o, renderSource: u, renderToolCall: f }) })
    ] }),
    /* @__PURE__ */ a(b.Root, { className: "m-(--inset-7) mt-0 flex min-h-[calc(var(--space-48)*2)] items-stretch gap-(--inline-2) rounded-(--radius-sm) bg-(--bg-control-default-idle) px-(--inset-3) py-(--inset-3) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)] hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)] focus-within:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-focus),var(--shadow-input-engaged)]", children: [
      /* @__PURE__ */ e(
        b.Input,
        {
          "aria-label": "Ask Judi AI a question",
          placeholder: "Ask a question…",
          rows: 2,
          className: "min-h-(--space-40) min-w-0 flex-1 self-stretch resize-none bg-transparent outline-none placeholder:text-(--text-surface-subtle)",
          style: {
            fontSize: "var(--body-md-size)",
            lineHeight: "var(--body-md-line-height)",
            fontWeight: "var(--body-md-weight)",
            color: "var(--text-control-value)"
          }
        }
      ),
      /* @__PURE__ */ e(v, { condition: (n) => n.thread.isRunning, children: /* @__PURE__ */ e(b.Cancel, { asChild: !0, children: /* @__PURE__ */ e(h, { variant: "secondary", iconOnly: !0, "aria-label": "Stop response", title: "Stop response", className: "self-end", children: /* @__PURE__ */ e(d, { icon: E, size: "small" }) }) }) }),
      /* @__PURE__ */ e(v, { condition: (n) => !n.thread.isRunning, children: /* @__PURE__ */ e(b.Send, { asChild: !0, children: /* @__PURE__ */ e(h, { variant: "primary", iconOnly: !0, "aria-label": "Send message", title: "Send message", className: "self-end", children: /* @__PURE__ */ e(d, { icon: V, size: "small" }) }) }) })
    ] })
  ] });
}
function fe({ runtime: t, ...i }) {
  return /* @__PURE__ */ e(M, { runtime: t, children: /* @__PURE__ */ e(X, { ...i }) });
}
export {
  fe as JudiAssistantPanel,
  Z as JudiAssistantReviewStep
};
