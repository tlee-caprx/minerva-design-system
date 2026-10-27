import { themes as o } from "./colors.js";
import { spacingThemes as e } from "./spacing.js";
import { typographyThemes as t } from "./typography.js";
const n = {
  minerva: {
    ...o.minerva,
    ...e.minerva,
    ...t.minerva,
    "root-font-size": "16px"
  },
  evolution: {
    ...o.evolution,
    ...e.evolution,
    ...t.evolution,
    "root-font-size": "14px"
  }
};
export {
  n as themes
};
