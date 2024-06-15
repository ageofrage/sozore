import type { Size } from "../model.ts";
import { resize } from "./resize.ts";

describe("resize", () => {
	it("should return resized Size when original Size aspect ratio equal to resized Size aspect ratio", () => {
		const originalSize: Size = [1920, 1920];
		const resizedSize: Size = [480, 480];
		expect(resize(originalSize, resizedSize)).toEqual(resizedSize);
	});

	it("should resize to base on resized width when original Size aspect ratio greater than resized Size aspect ratio", () => {
		const originalSize: Size = [1920, 1080];
		const resizedSize: Size = [480, 480];
		expect(resize(originalSize, resizedSize)).toEqual([480, 270]);
	});

	it("should resize to base on resized height when original Size aspect ratio less than resized Size aspect ratio", () => {
		const originalSize: Size = [1080, 1920];
		const resizedSize: Size = [480, 480];
		expect(resize(originalSize, resizedSize)).toEqual([270, 480]);
	});

	it("should throw an error when original height is zero", () => {
		const originalSize: Size = [1920, 0];
		const resizedSize: Size = [480, 480];
		expect(() => resize(originalSize, resizedSize)).toThrowError();
	});

	it("should throw an error when resized height is zero", () => {
		const originalSize: Size = [1920, 1920];
		const resizedSize: Size = [480, 0];
		expect(() => resize(originalSize, resizedSize)).toThrowError();
	});
});
