import { themes as e } from "./colors.js";
import { spacingThemes as t } from "./spacing.js";
import { typographyThemes as n } from "./typography.js";
// src/tokens/semantic/index.ts
var r = {
	minerva: {
		...e.minerva,
		...t.minerva,
		...n.minerva,
		"root-font-size": "16px"
	},
	evolution: {
		...e.evolution,
		...t.evolution,
		...n.evolution,
		"root-font-size": "14px"
	}
};
export { r as themes };
