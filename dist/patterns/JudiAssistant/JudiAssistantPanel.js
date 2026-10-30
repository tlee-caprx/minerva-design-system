import { Button as e } from "../../components/ui/Button/Button.js";
import { AIIcon as t } from "../../components/ui/Icon/icons/ai.js";
import { ArrowUpIcon as n } from "../../components/ui/Icon/icons/arrow-up.js";
import { CheckCircleIcon as r } from "../../components/ui/Icon/icons/check-circle.js";
import { ChevronDownIcon as i } from "../../components/ui/Icon/icons/chevron-down.js";
import { ChevronUpIcon as a } from "../../components/ui/Icon/icons/chevron-up.js";
import { CloseIcon as o } from "../../components/ui/Icon/icons/close.js";
import { CopyIcon as s } from "../../components/ui/Icon/icons/copy.js";
import { DocumentIcon as c } from "../../components/ui/Icon/icons/document.js";
import { Icon as l } from "../../components/ui/Icon/Icon.js";
import { RefreshIcon as u } from "../../components/ui/Icon/icons/refresh.js";
import { XIcon as d } from "../../components/ui/Icon/icons/x.js";
import { Text as f } from "../../components/ui/Text/Text.js";
import { Tooltip as p } from "../../components/ui/Tooltip/Tooltip.js";
import { useEffect as m, useId as h, useRef as g, useState as _ } from "react";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
import { ActionBarPrimitive as x, AssistantRuntimeProvider as S, AuiIf as C, ComposerPrimitive as w, MessagePrimitive as T, ThreadPrimitive as E, groupPartByType as D, useAuiState as O } from "@assistant-ui/react";
// src/patterns/JudiAssistant/JudiAssistantPanel.tsx
var k = new URL("data:image/svg+xml,%3csvg%20width='24'%20height='25'%20viewBox='0%200%2024%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.9459%2024.36C18.5413%2024.36%2023.8879%2018.9068%2023.8879%2012.18C23.8879%205.45317%2018.5413%200%2011.9459%200C5.35053%200%200.00390625%205.45317%200.00390625%2012.18C0.00390625%2018.9068%205.35053%2024.36%2011.9459%2024.36Z'%20fill='url(%23paint0_linear_9652_7090)'/%3e%3cpath%20d='M12.2168%2010.3789V18.7283C14.4773%2018.7283%2016.3099%2016.8592%2016.3099%2014.5536C16.3099%2012.248%2014.4773%2010.3789%2012.2168%2010.3789Z'%20fill='white'/%3e%3cpath%20d='M11.1138%2014.3567V18.5314H9.0647C7.93695%2018.5314%207.01562%2017.5968%207.01562%2016.4415C7.01562%2015.2861%207.93192%2014.3516%209.0647%2014.3516H11.1138V14.3567Z'%20fill='%23A8CCEC'/%3e%3cpath%20d='M11.9445%209.2306C13.6713%209.2306%2015.1868%2010.1651%2016.0376%2011.5618V7.14069C16.0376%205.99047%2015.1213%205.05078%2013.9885%205.05078C12.8557%205.05078%2011.9395%205.98533%2011.9395%207.14069V9.2306H11.9445Z'%20fill='%23A8CCEC'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_9652_7090'%20x1='0.00390625'%20y1='12.18'%20x2='23.8829'%20y2='12.18'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.25'%20stop-color='%231A4687'/%3e%3cstop%20offset='1'%20stop-color='%230777B9'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e", "" + import.meta.url).href;
function A({ title: e, detail: t }) {
	return /* @__PURE__ */ b("div", {
		className: "judi-assistant-review-step grid grid-cols-[var(--space-4)_minmax(0,1fr)] gap-(--inline-2)",
		children: [/* @__PURE__ */ y("span", {
			"aria-hidden": "true",
			className: "mt-(--space-8) size-(--space-4) rounded-(--radius-full) bg-(--icon-surface-subtle)"
		}), /* @__PURE__ */ b("div", {
			className: "flex min-w-0 flex-col gap-(--stack-1)",
			children: [/* @__PURE__ */ y(f, {
				variant: "body-md",
				weight: "semibold",
				className: "text-(--text-surface-base)",
				children: e
			}), t && /* @__PURE__ */ y(f, {
				variant: "body-md",
				className: "text-(--text-surface-subtle)",
				children: t
			})]
		})]
	});
}
function j({ text: e, details: t }) {
	return /* @__PURE__ */ y(v, { children: e.split("\n").filter((e) => e.trim().length > 0).map((e) => /* @__PURE__ */ y(A, {
		title: e,
		detail: t?.[e]
	}, e)) });
}
function M({ children: e }) {
	let t = O((e) => e.message.status?.type === "running"), n = O((e) => e.message.parts.some((e) => e.type === "text" && e.text.length > 0)), r = t && !n, [o, s] = _(!0), [c, u] = _(0), d = g(null);
	return m(() => {
		if (r) {
			d.current = performance.now(), u(0), s(!0);
			let e = window.setInterval(() => {
				u(Math.max(1, Math.round((performance.now() - d.current) / 1e3)));
			}, 1e3);
			return () => window.clearInterval(e);
		}
		d.current !== null && (u(Math.max(1, Math.round((performance.now() - d.current) / 1e3))), d.current = null), s(!1);
	}, [r]), /* @__PURE__ */ b("div", {
		className: "mb-(--stack-3)",
		children: [/* @__PURE__ */ b("button", {
			type: "button",
			"aria-expanded": o,
			onClick: () => s((e) => !e),
			className: "flex items-center gap-(--inline-1) text-left text-(--text-surface-subtle) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)",
			children: [/* @__PURE__ */ y(f, {
				variant: "body-md",
				className: r ? "judi-assistant-thinking-shimmer" : "",
				children: r ? "Thinking…" : c > 0 ? `Thought for ${c}s` : "Review steps"
			}), /* @__PURE__ */ y(l, {
				icon: o ? a : i,
				size: "small"
			})]
		}), o && /* @__PURE__ */ y("div", {
			className: "mt-(--stack-3) flex flex-col gap-(--stack-3)",
			children: e
		})]
	});
}
function N({ count: e, children: t }) {
	let [n, r] = _(!1), o = h();
	return /* @__PURE__ */ b("div", {
		className: "mt-(--stack-3)",
		children: [/* @__PURE__ */ b("button", {
			type: "button",
			"aria-expanded": n,
			"aria-controls": o,
			onClick: () => r((e) => !e),
			className: "inline-flex items-center gap-(--inline-2) rounded-(--radius-full) bg-(--bg-surface-subtle) px-(--inset-3) py-(--inset-1) text-(--text-surface-base) hover:bg-(--bg-action-neutral-hover) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)",
			children: [
				/* @__PURE__ */ y("span", {
					"aria-hidden": "true",
					className: "flex items-center",
					children: Array.from({ length: Math.min(e, 3) }, (e, t) => /* @__PURE__ */ y("span", {
						className: "flex size-(--space-20) items-center justify-center rounded-(--radius-full) border border-(--border-surface-base) bg-(--bg-surface-base) text-(--icon-surface-base)",
						style: { marginLeft: t === 0 ? void 0 : "calc(-1 * var(--space-4))" },
						children: /* @__PURE__ */ y(l, {
							icon: c,
							size: "small"
						})
					}, t))
				}),
				/* @__PURE__ */ b(f, {
					variant: "body-sm",
					weight: "semibold",
					children: [
						"Sources (",
						e,
						")"
					]
				}),
				/* @__PURE__ */ y(l, {
					icon: n ? a : i,
					size: "small"
				})
			]
		}), n && /* @__PURE__ */ y("div", {
			id: o,
			className: "mt-(--stack-3) grid grid-cols-1 gap-(--layout-1) @min-[36rem]:grid-cols-2",
			children: t
		})]
	});
}
function P({ source: e }) {
	let t = /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ b("span", {
		className: "flex min-w-0 items-center gap-(--inline-2) text-(--text-surface-subtle)",
		children: [/* @__PURE__ */ y("span", {
			"aria-hidden": "true",
			className: "flex size-(--space-20) shrink-0 items-center justify-center rounded-(--radius-sm) bg-(--bg-surface-subtle)",
			children: /* @__PURE__ */ y(l, {
				icon: c,
				size: "small"
			})
		}), /* @__PURE__ */ y(f, {
			variant: "body-sm",
			className: "truncate",
			children: "Source document"
		})]
	}), /* @__PURE__ */ y(f, {
		variant: "body-sm",
		weight: "semibold",
		className: "line-clamp-2",
		children: e.title ?? e.id
	})] }), n = "flex min-w-0 flex-col gap-(--stack-1) rounded-(--radius-md) border border-(--border-surface-base) bg-(--bg-surface-base) p-(--inset-5) text-(--text-surface-base)";
	return e.url ? /* @__PURE__ */ y("a", {
		href: e.url,
		className: `${n} hover:bg-(--bg-surface-subtle) focus-visible:outline-2 focus-visible:outline-(--border-control-default-focus)`,
		"aria-label": `View source: ${e.title ?? "Source document"}`,
		children: t
	}) : /* @__PURE__ */ y("div", {
		className: n,
		children: t
	});
}
function F() {
	return /* @__PURE__ */ y(T.Root, {
		className: "ml-auto max-w-[90%] rounded-(--radius-sm) bg-(--bg-surface-subtle) p-(--inset-4)",
		children: /* @__PURE__ */ y(T.Parts, { children: ({ part: e }) => e.type === "text" ? /* @__PURE__ */ y(f, {
			variant: "body-md",
			className: "whitespace-pre-wrap text-(--text-surface-base)",
			children: e.text
		}) : null })
	});
}
var I = D({
	reasoning: ["group-work"],
	"tool-call": ["group-work"],
	source: ["group-sources"]
});
function L() {
	let t = O((e) => e.message.isCopied);
	return /* @__PURE__ */ b(x.Root, {
		hideWhenRunning: !0,
		className: "mt-(--stack-2) flex items-center gap-(--inline-1)",
		children: [
			/* @__PURE__ */ y(p, {
				content: t ? "Copied" : "Copy answer",
				beak: "none",
				children: /* @__PURE__ */ y(x.Copy, {
					asChild: !0,
					copiedDuration: 1500,
					children: /* @__PURE__ */ y(e, {
						variant: "tertiary",
						iconOnly: !0,
						"aria-label": t ? "Copied to clipboard" : "Copy answer",
						style: { padding: "var(--inset-1)" },
						children: /* @__PURE__ */ y(l, {
							icon: t ? r : s,
							size: "small",
							className: t ? "text-(--icon-feedback-success-base)" : void 0
						})
					})
				})
			}),
			/* @__PURE__ */ y(p, {
				content: "Regenerate answer",
				beak: "none",
				children: /* @__PURE__ */ y(x.Reload, {
					asChild: !0,
					children: /* @__PURE__ */ y(e, {
						variant: "tertiary",
						iconOnly: !0,
						"aria-label": "Regenerate answer",
						style: { padding: "var(--inset-1)" },
						children: /* @__PURE__ */ y(l, {
							icon: u,
							size: "small"
						})
					})
				})
			}),
			/* @__PURE__ */ y("span", {
				role: "status",
				className: "sr-only",
				children: t ? "Copied to clipboard" : ""
			})
		]
	});
}
function R({ reasoningDetails: e, renderAnswer: t, renderSource: n, renderToolCall: r }) {
	return /* @__PURE__ */ b(T.Root, {
		className: "flex min-w-0 flex-col gap-(--stack-2)",
		children: [/* @__PURE__ */ b("div", {
			className: "flex shrink-0 items-center gap-(--inline-3)",
			children: [/* @__PURE__ */ y("img", {
				src: k,
				alt: "",
				"aria-hidden": "true",
				width: "24",
				height: "25",
				className: "h-auto w-(--space-24) shrink-0"
			}), /* @__PURE__ */ y(f, {
				variant: "body-md",
				weight: "semibold",
				className: "text-(--text-surface-base)",
				children: "Judi AI"
			})]
		}), /* @__PURE__ */ b("div", {
			className: "@container ml-[calc(var(--space-24)+var(--inline-3))] min-w-0",
			children: [/* @__PURE__ */ y(T.GroupedParts, {
				groupBy: I,
				indicator: "empty",
				children: ({ part: i, children: a }) => {
					switch (i.type) {
						case "group-work": return /* @__PURE__ */ y(M, { children: a });
						case "reasoning": return /* @__PURE__ */ y(j, {
							text: i.text,
							details: e
						});
						case "tool-call": return r?.({
							toolName: i.toolName,
							args: i.args,
							result: i.result
						}) ?? null;
						case "text": return /* @__PURE__ */ y(f, {
							as: "div",
							variant: "body-md",
							className: "whitespace-pre-wrap text-(--text-surface-base)",
							children: t ? t(i.text) : i.text
						});
						case "group-sources": return /* @__PURE__ */ y(N, {
							count: i.indices.length,
							children: a
						});
						case "source": return n ? n({
							id: i.id,
							url: i.url,
							title: i.title
						}) : /* @__PURE__ */ y(P, { source: {
							id: i.id,
							url: i.url,
							title: i.title
						} });
						case "indicator": return /* @__PURE__ */ y(f, {
							variant: "body-sm",
							className: "text-(--text-surface-subtle)",
							children: "Thinking…"
						});
						default: return null;
					}
				}
			}), /* @__PURE__ */ y(L, {})]
		})]
	});
}
function z({ onClose: r, suggestions: i = [], emptyTitle: a = "Ask Judi AI.", emptyDescription: s = "Ask about the current work and its supporting sources.", reasoningDetails: c, renderAnswer: u, renderSource: p, renderToolCall: m }) {
	return /* @__PURE__ */ b(E.Root, {
		className: "flex h-full min-h-0 flex-col bg-(--bg-surface-base)",
		children: [
			/* @__PURE__ */ b("header", {
				className: "flex items-center justify-between border-b border-(--border-surface-base) px-(--inset-7) py-(--inset-5)",
				children: [/* @__PURE__ */ b("div", {
					className: "flex items-center gap-(--inline-2)",
					children: [/* @__PURE__ */ y(l, {
						icon: t,
						size: "regular"
					}), /* @__PURE__ */ y(f, {
						variant: "body-md",
						weight: "semibold",
						className: "text-(--text-surface-base)",
						children: "Judi AI"
					})]
				}), r && /* @__PURE__ */ y(e, {
					variant: "tertiary",
					iconOnly: !0,
					"aria-label": "Close Judi AI",
					onClick: r,
					children: /* @__PURE__ */ y(l, {
						icon: o,
						size: "regular"
					})
				})]
			}),
			/* @__PURE__ */ b(E.Viewport, {
				className: "flex min-h-0 flex-1 flex-col gap-(--layout-3) overflow-y-auto p-(--inset-7)",
				children: [/* @__PURE__ */ y(C, {
					condition: (e) => e.thread.isEmpty,
					children: /* @__PURE__ */ b("div", {
						className: "mt-auto flex flex-col gap-(--layout-3)",
						children: [/* @__PURE__ */ b("div", {
							className: "flex flex-col gap-(--stack-2)",
							children: [/* @__PURE__ */ y(f, {
								as: "h2",
								variant: "heading-sm",
								className: "text-(--text-surface-base)",
								children: a
							}), /* @__PURE__ */ y(f, {
								variant: "body-md",
								className: "text-(--text-surface-subtle)",
								children: s
							})]
						}), /* @__PURE__ */ y("div", {
							className: "flex flex-col items-start gap-(--stack-3)",
							children: i.map((t) => /* @__PURE__ */ y(E.Suggestion, {
								prompt: t,
								send: !0,
								asChild: !0,
								children: /* @__PURE__ */ b(e, {
									variant: "tertiary",
									unpadded: !0,
									className: "text-left no-underline hover:no-underline",
									children: [/* @__PURE__ */ y("span", {
										"aria-hidden": "true",
										className: "text-(--text-surface-subtle)",
										children: ">"
									}), t]
								})
							}, t))
						})]
					})
				}), /* @__PURE__ */ y(E.Messages, { children: ({ message: e }) => e.role === "user" ? /* @__PURE__ */ y(F, {}) : /* @__PURE__ */ y(R, {
					reasoningDetails: c,
					renderAnswer: u,
					renderSource: p,
					renderToolCall: m
				}) })]
			}),
			/* @__PURE__ */ b(w.Root, {
				className: "m-(--inset-7) mt-0 flex min-h-[calc(var(--space-48)*2)] items-stretch gap-(--inline-2) rounded-(--radius-sm) bg-(--bg-control-default-idle) px-(--inset-3) py-(--inset-3) shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-idle)] hover:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-hover)] focus-within:shadow-[inset_0_0_0_var(--space-1)_var(--border-control-default-focus),var(--shadow-input-engaged)]",
				children: [
					/* @__PURE__ */ y(w.Input, {
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
					}),
					/* @__PURE__ */ y(C, {
						condition: (e) => e.thread.isRunning,
						children: /* @__PURE__ */ y(w.Cancel, {
							asChild: !0,
							children: /* @__PURE__ */ y(e, {
								variant: "secondary",
								iconOnly: !0,
								"aria-label": "Stop response",
								title: "Stop response",
								className: "self-end",
								children: /* @__PURE__ */ y(l, {
									icon: d,
									size: "small"
								})
							})
						})
					}),
					/* @__PURE__ */ y(C, {
						condition: (e) => !e.thread.isRunning,
						children: /* @__PURE__ */ y(w.Send, {
							asChild: !0,
							children: /* @__PURE__ */ y(e, {
								variant: "primary",
								iconOnly: !0,
								"aria-label": "Send message",
								title: "Send message",
								className: "self-end",
								children: /* @__PURE__ */ y(l, {
									icon: n,
									size: "small"
								})
							})
						})
					})
				]
			})
		]
	});
}
function B({ runtime: e, ...t }) {
	return /* @__PURE__ */ y(S, {
		runtime: e,
		children: /* @__PURE__ */ y(z, { ...t })
	});
}
export { B as JudiAssistantPanel, A as JudiAssistantReviewStep };
