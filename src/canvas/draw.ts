import type { Size } from "../model.ts";

export const drawImageToCanvas = (
	canvas: HTMLCanvasElement,
	img: HTMLImageElement,
	drawSize: Size = [canvas.width, canvas.height],
) => {
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Cannot get 2d context");
	ctx.drawImage(img, 0, 0, drawSize[0], drawSize[1]);
	return ctx;
};
