import type { Size } from "../model.ts";

const calcAspectRatio = ([width, height]: Size): number => {
	if (height === 0) throw new Error("Cannot divide by zero");
	return width / height;
};

export const resize = (
	[oWidth, oHeight]: Size,
	[rWidth, rHeight]: Size,
): Size => {
	const oAspectRatio = calcAspectRatio([oWidth, oHeight]);
	const rAspectRatio = calcAspectRatio([rWidth, rHeight]);
	if (oAspectRatio === rAspectRatio) return [rWidth, rHeight];
	if (oAspectRatio > rAspectRatio) return [rWidth, rWidth / oAspectRatio];
	return [rHeight * oAspectRatio, rHeight];
};
