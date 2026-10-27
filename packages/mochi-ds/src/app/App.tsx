import { useEffect, useState, type CSSProperties } from "react";
import "./app.css";

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const PALETTES = [
  "Indigo",
  "Blue",
  "Teal",
  "Green",
  "Yellow",
  "Orange",
  "Pink",
  "Red",
  "Purple",
  "Slate",
  "Stone",
] as const;
const TYPE_SIZES = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"] as const;
const RADII = ["--radius", "--radius-none", "--radius-sm", "--radius-md", "--radius-lg", "--radius-xl", "--radius-xl_5", "--radius-2xl", "--radius-2xl_5", "--radius-3xl", "--radius-4xl", "--radius-full"] as const;
const SHADOW_GROUPS = [
  { title: "Elevation", tokens: ["--shadow", "--shadow-2xs", "--shadow-xs", "--shadow-sm", "--shadow-md", "--shadow-lg", "--shadow-xl", "--shadow-2xl"], effect: "box" },
  { title: "Soft", tokens: ["--shadow-soft-sm", "--shadow-soft-md", "--shadow-soft-lg"], effect: "box" },
  { title: "Inset", tokens: ["--shadow-inner", "--inset-shadow-2xs", "--inset-shadow-xs", "--inset-shadow-sm"], effect: "box" },
  { title: "Drop", tokens: ["--drop-shadow", "--drop-shadow-xs", "--drop-shadow-sm", "--drop-shadow-md", "--drop-shadow-lg", "--drop-shadow-xl", "--drop-shadow-2xl"], effect: "drop" },
  { title: "Text", tokens: ["--text-shadow-2xs", "--text-shadow-xs", "--text-shadow-sm", "--text-shadow-md", "--text-shadow-lg"], effect: "text" },
] as const;

type TokenValues = Record<string, string>;

function readFoundationTokens(): TokenValues {
  const styles = getComputedStyle(document.documentElement);
  const names = [
    ...PALETTES.flatMap((palette) => SHADES.map((shade) => `--color-${palette.toLowerCase()}-${shade}`)),
    ...TYPE_SIZES.flatMap((size) => [`--text-${size}`, `--text-${size}--line-height`]),
    ...RADII,
    ...SHADOW_GROUPS.flatMap((group) => group.tokens),
  ];
  return {
    ...Object.fromEntries(names.map((name) => [name, styles.getPropertyValue(name).trim()])),
    rootFontSize: styles.fontSize,
  };
}

function typeMetrics(values: TokenValues, size: string): string {
  const fontSize = values[`--text-${size}`];
  const lineHeight = values[`--text-${size}--line-height`];
  if (!fontSize || !lineHeight) return "—";
  const fontPixels = fontSize.endsWith("rem")
    ? parseFloat(fontSize) * parseFloat(values.rootFontSize || "16")
    : parseFloat(fontSize);
  const linePixels = parseFloat(lineHeight) * fontPixels;
  return `${Math.round(fontPixels * 10) / 10} / ${Math.round(linePixels * 10) / 10} px`;
}

function shadowPreviewStyle(token: string, effect: "box" | "drop" | "text", values: TokenValues): CSSProperties {
  if (effect === "text") return { textShadow: `var(${token})` };
  if (effect === "drop") {
    const filters = values[token]?.split(",").map((shadow) => `drop-shadow(${shadow.trim()})`).join(" ");
    return { filter: filters || "none" };
  }
  return { boxShadow: `var(${token})` };
}

export function App() {
  const [tokenValues, setTokenValues] = useState<TokenValues>({});

  useEffect(() => {
    setTokenValues(readFoundationTokens());
  }, []);

  return (
    <div className="foundations-page">
      <header className="foundations-header">
        <div className="foundations-header-inner">
          <span className="foundations-wordmark">mochi<span className="foundations-wordmark-dot">.</span></span>
          <span className="foundations-header-label">Design system / Foundations</span>
        </div>
      </header>

      <main className="foundations-main">
        <div className="foundations-intro">
          <div>
            <p className="foundations-eyebrow">Mochi design system</p>
            <h1>Foundations</h1>
            <p className="foundations-lede">
              A working reference for Mochi’s primitive colors and typeface. Review these raw values
              before assigning brand, semantic, or component roles.
            </p>
          </div>
          <div className="foundations-review-note">
            <span className="foundations-review-dot" aria-hidden="true" />
            Color values transcribed from screenshots · Pending design review
          </div>
        </div>

        <nav className="foundations-nav" aria-label="Foundations sections">
          <a href="#colors">Colors</a>
          <a href="#typography">Typography</a>
          <a href="#radii">Corner radius</a>
          <a href="#shadows">Shadows</a>
        </nav>

        <section className="foundations-section" id="colors" aria-labelledby="colors-title">
          <div className="foundations-section-heading">
            <div>
              <p className="foundations-eyebrow">01 / Primitives</p>
              <h2 id="colors-title">Color palette</h2>
              <p>11 scales · 121 swatches. Values shown below come from the current CSS tokens.</p>
            </div>
          </div>

          <div className="foundations-palettes">
            {PALETTES.map((palette) => (
              <section className="foundations-palette" key={palette} aria-label={`${palette} color scale`}>
                <h3>{palette}</h3>
                <div className="foundations-swatches">
                  {SHADES.map((shade) => {
                    const token = `--color-${palette.toLowerCase()}-${shade}`;
                    return (
                      <div className="foundations-swatch" key={shade}>
                        <div className="foundations-swatch-color" style={{ backgroundColor: `var(${token})` }} />
                        <span className="foundations-swatch-shade">{shade}</span>
                        <span className="foundations-swatch-value">{tokenValues[token] || "—"}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="foundations-section foundations-type-section" id="typography" aria-labelledby="typography-title">
          <div className="foundations-section-heading">
            <div>
              <p className="foundations-eyebrow">02 / Typeface</p>
              <h2 id="typography-title">Work Sans</h2>
              <p>Self-hosted variable font. These are weight specimens, not a finalized type scale.</p>
            </div>
          </div>

          <div className="foundations-type-card">
            <div className="foundations-type-hero" aria-label="Work Sans letter specimen">Aa</div>
            <div className="foundations-type-details">
              <p className="foundations-type-alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz 0123456789</p>
              <div className="foundations-type-weights">
                {[400, 500, 600, 700].map((weight) => (
                  <div className="foundations-type-weight" key={weight}>
                    <span>{weight}</span>
                    <p style={{ fontWeight: weight }}>The quick brown fox jumps over the lazy dog.</p>
                  </div>
                ))}
                <div className="foundations-type-weight">
                  <span>Italic</span>
                  <p className="foundations-type-italic">The quick brown fox jumps over the lazy dog.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="foundations-subsection-heading">
            <h3>Type scale</h3>
            <p>Font size / line height in pixels, resolved from the current tokens.</p>
          </div>
          <div className="foundations-type-scale">
            {TYPE_SIZES.map((size) => (
              <div className="foundations-type-scale-row" key={size}>
                <div className="foundations-token-meta">
                  <code>--text-{size}</code>
                  <span>{typeMetrics(tokenValues, size)}</span>
                </div>
                <p style={{ fontSize: `var(--text-${size})`, lineHeight: `var(--text-${size}--line-height)` }}>
                  {TYPE_SIZES.indexOf(size) >= 7 ? "Ag" : "The quick brown fox jumps over the lazy dog."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="foundations-section" id="radii" aria-labelledby="radii-title">
          <div className="foundations-section-heading">
            <div>
              <p className="foundations-eyebrow">03 / Shape</p>
              <h2 id="radii-title">Corner radius</h2>
              <p>Primitive radii shown on the same-size surface for easy comparison.</p>
            </div>
          </div>
          <div className="foundations-radius-grid">
            {RADII.map((radius) => {
              const token = radius;
              return (
                <div className="foundations-radius-card" key={radius}>
                  <div className="foundations-radius-shape" style={{ borderRadius: `var(${token})` }} />
                  <code>{token}</code>
                  <span>{tokenValues[token] || "—"}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="foundations-section" id="shadows" aria-labelledby="shadows-title">
          <div className="foundations-section-heading">
            <div>
              <p className="foundations-eyebrow">04 / Effects</p>
              <h2 id="shadows-title">Shadows</h2>
              <p>Elevation, soft, inset, drop, and text effects from the primitive layer.</p>
            </div>
          </div>
          <div className="foundations-shadow-groups">
            {SHADOW_GROUPS.map((group) => (
              <section className="foundations-shadow-group" key={group.title} aria-label={`${group.title} shadows`}>
                <h3>{group.title}</h3>
                <div className="foundations-shadow-grid">
                  {group.tokens.map((token) => (
                    <div className="foundations-shadow-card" key={token}>
                      <div className="foundations-shadow-stage">
                        <div
                          className={group.effect === "text" ? "foundations-shadow-text" : "foundations-shadow-sample"}
                          style={shadowPreviewStyle(token, group.effect, tokenValues)}
                        >
                          {group.effect === "text" ? "Aa" : null}
                        </div>
                      </div>
                      <code>{token}</code>
                      <span>{tokenValues[token] || "—"}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
