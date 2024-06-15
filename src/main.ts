import { setCssVars } from "./bridgeToCss/cssVars.ts";
import { createCanvas } from "./canvas/create.ts";
import { drawImageToCanvas } from "./canvas/draw.ts";
import { countRgbaMap } from "./color/countRgbaMap.ts";
import { resize } from "./geometry/resize.ts";
import { type Config, DEFAULT_CONFIG } from "./model.ts";

export const sozore = (img: HTMLImageElement, config?: Config) => {
	const sozoreConfig = { ...DEFAULT_CONFIG, ...config };
	const [rWidth, rHeight] = sozoreConfig.resize;
	const [width, height] = resize([img.width, img.height], [rWidth, rHeight]);
	const intWidth = Math.floor(width);
	const intHeight = Math.floor(height);
	const canvas = createCanvas(sozoreConfig.canvasId, [intWidth, intHeight]);
	const ctx = drawImageToCanvas(canvas, img, [intWidth, intHeight]);
	const rgbaList = Array.from(
		countRgbaMap(ctx, sozoreConfig.validMinAlpha).entries(),
	);
	const descRgbaList = rgbaList.sort((a, b) => b[1] - a[1]);
	const colorNames = Object.keys(sozoreConfig.grayScales);
	const rgbaStrings = descRgbaList
		.slice(0, colorNames.length)
		.map(([rgba]) => rgba);
	setCssVars(colorNames, rgbaStrings);
	console.table(descRgbaList.slice(0, 10));
};
