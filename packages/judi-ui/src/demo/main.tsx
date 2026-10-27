import { createRoot } from "react-dom/client";
import { App } from "./App";
import "../styles.css";
import "../../../minerva-ds/src/styles/fonts.css";
import "../../../mochi-ds/src/tokens/fonts.css";
import "./demo.css";

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
