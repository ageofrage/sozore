import { type Config, DEFAULT_CONFIG, type Size } from "./model.ts";

const ROOT = document.documentElement;

const generateCanvas = (id: string, size: Size) => {
	const canvas = document.createElement("canvas");
	canvas.id = id;
	canvas.width = size[0];
	canvas.height = size[1];
	return canvas;
};

const drawImageToCanvas = (
	canvas: HTMLCanvasElement,
	img: HTMLImageElement,
	drawSize: Size = [canvas.width, canvas.height],
) => {
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Cannot get 2d context");
	ctx.drawImage(img, 0, 0, drawSize[0], drawSize[1]);
	return ctx;
};

type RgbaString = `${number},${number},${number},${number}`;
const countRgbaMap = (
	ctx: CanvasRenderingContext2D,
	validMinAlpha: number,
): Map<RgbaString, number> => {
	const minAlpha = Math.min(255, Math.max(0, validMinAlpha));
	const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	const data = imgData.data;
	const colorCountMap = new Map<RgbaString, number>();
	data.forEach((_, i) => {
		if (i % 4 !== 0) return;
		if (data[i + 3] < minAlpha) return;
		const rgba = [data[i], data[i + 1], data[i + 2], data[i + 3]];
		const key = rgba.join(",") as RgbaString;
		if (colorCountMap.has(key)) {
			const colorCount = colorCountMap.get(key);
			if (colorCount === undefined) throw new Error("Invalid colorCount");
			colorCountMap.set(key, colorCount + 1);
		} else {
			colorCountMap.set(key, 1);
		}
	});
	return colorCountMap;
};

const calcAspectRatio = ([width, height]: Size): number => {
	if (height === 0) throw new Error("Cannot divide by zero");
	return width / height;
};

const resize = ([oWidth, oHeight]: Size, [rWidth, rHeight]: Size): Size => {
	const oAspectRatio = calcAspectRatio([oWidth, oHeight]);
	const rAspectRatio = calcAspectRatio([rWidth, rHeight]);
	if (oAspectRatio === rAspectRatio) return [rWidth, rHeight];
	if (oAspectRatio > rAspectRatio) return [rWidth, rWidth / oAspectRatio];
	return [rHeight * oAspectRatio, rHeight];
};

const setCssVars = (keys: string[], colors: string[], varPrefix?: string) => {
	const prefix = varPrefix || DEFAULT_CONFIG.cssVarPrefix;
	keys.forEach((key, i) => {
		ROOT.style.setProperty(`--${prefix}-${key}`, `rgba(${colors[i]})`);
	});
};

export const sozore = (img: HTMLImageElement, config?: Config) => {
	const sozoreConfig = { ...DEFAULT_CONFIG, ...config };
	const [rWidth, rHeight] = sozoreConfig.resize;
	const [width, height] = resize([img.width, img.height], [rWidth, rHeight]);
	const intWidth = Math.floor(width);
	const intHeight = Math.floor(height);
	const canvas = generateCanvas(sozoreConfig.canvasId, [intWidth, intHeight]);
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
