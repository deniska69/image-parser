import * as fs from 'fs';
import { inferSchema, initParser } from 'udsv';

export const readFile = (): string[][] => {
	const file = fs.readFileSync('file.csv');
	const decodedString = new TextDecoder('windows-1251').decode(file);
	const parser = initParser(inferSchema(decodedString));
	const parsedFile = parser.typedArrs(decodedString);
	return parsedFile;
};

export const getTitle = (file: string[][], row: number) => {
	return file[row]?.length ? file[row][0] : undefined;
};

export const getUrl = (file: string[][], row: number) => {
	return file[row]?.length ? file[row][1] : undefined;
};

export const sleep = (milliseconds = 1000) => {
	console.info('---sleep---');
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
};
