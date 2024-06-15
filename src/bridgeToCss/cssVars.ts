import { DEFAULT_CONFIG } from "../model.ts";

const ROOT = document.documentElement;

export const setCssVars = (
	keys: string[],
	colors: string[],
	varPrefix?: string,
) => {
	const prefix = varPrefix || DEFAULT_CONFIG.cssVarPrefix;
	keys.forEach((key, i) => {
		ROOT.style.setProperty(`--${prefix}-${key}`, `rgba(${colors[i]})`);
	});
};
