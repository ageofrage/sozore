import type { Size } from "../model.ts";

export const createCanvas = (id: string, size: Size) => {
	const canvas = document.createElement("canvas");
	canvas.id = id;
	canvas.width = size[0];
	canvas.height = size[1];
	return canvas;
};
