type RgbaString = `${number},${number},${number},${number}`;

export const countRgbaMap = (
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
