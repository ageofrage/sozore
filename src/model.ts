export type Size = [number, number];

export const DEFAULT_CONFIG = {
	canvasId: "sozore-canvas",
	cssVarPrefix: "sozore",
	validMinAlpha: 255,
	resize: [480, 480] as Size,
	grayScales: {
		["main" as string]: 50,
		["sub" as string]: 80,
		["accent" as string]: 100,
		["accent2" as string]: 200,
	},
};

export type Config = Partial<typeof DEFAULT_CONFIG>;
