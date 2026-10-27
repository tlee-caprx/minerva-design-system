import { useState } from "react";
import { Button } from "../components/Button";

type JudiTheme = "minerva" | "mochi";

export function App() {
  const [theme, setTheme] = useState<JudiTheme>("minerva");

  function chooseTheme(nextTheme: JudiTheme) {
    document.documentElement.dataset.judiTheme = nextTheme;
    setTheme(nextTheme);
  }

  return (
    <main className="pilot-page">
      <div className="pilot-content">
        <p className="pilot-eyebrow">Judi UI · Architecture pilot</p>
        <h1>One Button, two root styles</h1>
        <p className="pilot-description">
          This tests theme selection and token isolation. Mochi Button geometry is
          provisional until its component specification exists.
        </p>

        <div className="pilot-switcher" role="group" aria-label="Judi theme">
          <button
            type="button"
            aria-pressed={theme === "minerva"}
            onClick={() => chooseTheme("minerva")}
          >
            Minerva
          </button>
          <button
            type="button"
            aria-pressed={theme === "mochi"}
            onClick={() => chooseTheme("mochi")}
          >
            Mochi
          </button>
        </div>

        <section className="pilot-panel" aria-labelledby="button-title">
          <div>
            <p className="pilot-eyebrow">Primary · default</p>
            <h2 id="button-title">Button pilot</h2>
            <p>Current root style: <strong>{theme}</strong></p>
          </div>
          <Button onClick={() => window.alert(`${theme} Button clicked`)}>
            Continue
          </Button>
        </section>
      </div>
    </main>
  );
}
