import { fontFamily as t, fontWeight as e, lineHeight as i, fontSize as l } from "../primitive/typography.js";
const g = {
  // ─── Fonts ────────────────────────────────────────────────────────────────
  "font-base": t["source-sans-3"],
  "font-code": t["fira-code"],
  // ─── Font Weights ─────────────────────────────────────────────────────────
  "font-weight-regular": e.regular,
  "font-weight-semibold": e.semibold,
  // ─── Body ─────────────────────────────────────────────────────────────────
  "body-sm-size": l[100],
  // 12px / 0.75rem
  "body-sm-line-height": i[200],
  // 16px / 1rem
  "body-sm-weight": e.regular,
  "body-md-size": l[200],
  // 14px / 0.875rem
  "body-md-line-height": i[400],
  // 20px / 1.25rem
  "body-md-weight": e.regular,
  "body-lg-size": l[400],
  // 16px / 1rem
  "body-lg-line-height": i[500],
  // 24px / 1.5rem
  "body-lg-weight": e.regular,
  // ─── Option (checkbox / radio labels) ────────────────────────────────────
  "option-default-size": l[200],
  // 14px / 0.875rem
  "option-default-line-height": i[300],
  // 18px / 1.125rem
  "option-default-weight": e.regular,
  // ─── Heading ──────────────────────────────────────────────────────────────
  "heading-xs-size": l[500],
  "heading-xs-line-height": i[500],
  "heading-xs-weight": e.semibold,
  "heading-sm-size": l[600],
  "heading-sm-line-height": i[500],
  "heading-sm-weight": e.semibold,
  "heading-md-size": l[600],
  "heading-md-line-height": i[550],
  "heading-md-weight": e.semibold,
  "heading-lg-size": l[700],
  "heading-lg-line-height": i[600],
  "heading-lg-weight": e.semibold,
  "heading-xl-size": l[800],
  "heading-xl-line-height": i[700],
  "heading-xl-weight": e.semibold,
  // ─── Label ────────────────────────────────────────────────────────────────
  "label-sm-size": l["050"],
  "label-sm-line-height": i["050"],
  "label-sm-weight": e.semibold,
  "label-md-size": l[100],
  "label-md-line-height": i[100],
  "label-md-weight": e.semibold,
  "label-lg-size": l[200],
  "label-lg-line-height": i[200],
  "label-lg-weight": e.semibold,
  // ─── Global Header ────────────────────────────────────────────────────────
  "global-header-module-title-size": l[200],
  "global-header-module-title-line-height": i[100],
  "global-header-module-title-weight": e.semibold,
  // ─── Breadcrumb ───────────────────────────────────────────────────────────
  "breadcrumb-label-size": l["050"],
  // 10px / 0.625rem
  "breadcrumb-label-line-height": i[200],
  // 16px / 1rem
  "breadcrumb-label-weight": e.regular,
  // ─── Menu ─────────────────────────────────────────────────────────────────
  "menu-item-size": l[200],
  // 14px / 0.875rem
  "menu-item-line-height": i[400],
  // 20px / 1.25rem
  "menu-item-weight": e.regular,
  "menu-item-lg-size": l[400],
  // 16px / 1rem
  "menu-item-lg-line-height": i[500],
  // 24px / 1.5rem
  "menu-item-lg-weight": e.regular,
  // ─── Button Label ─────────────────────────────────────────────────────────
  "button-label-size": l[300],
  "button-label-line-height": i[400],
  "button-label-weight": e.semibold,
  // ─── Tag Label ────────────────────────────────────────────────────────────
  "tag-label-size": l[100],
  // 12px / 0.75rem
  "tag-label-line-height": i["050"],
  // 12px / 0.75rem (tight, fits pill shape)
  "tag-label-weight": e.semibold,
  // ─── Alert ────────────────────────────────────────────────────────────────
  "banner-text-size": l[600],
  // 20px / 1.25rem
  "banner-text-line-height": i[600],
  // 32px / 2rem
  "banner-text-weight": e.semibold,
  "toast-text-size": l[200],
  // 14px / 0.875rem
  "toast-text-line-height": i[500],
  // 24px / 1.5rem
  "toast-text-weight": e.semibold
}, h = {
  ...g,
  // ─── Fonts ────────────────────────────────────────────────────────────────
  "font-base": t.inter
}, n = {
  minerva: g,
  evolution: h
};
export {
  n as typographyThemes
};
