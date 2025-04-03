import axios from 'axios';
import * as fs from 'fs';
import { inferSchema, initParser } from 'udsv';

export const readFile = (): string[][] => {
	const file = fs.readFileSync('file.csv');
	const decodedString = new TextDecoder('windows-1251').decode(file);
	const parser = initParser(inferSchema(decodedString));
	const parsedFile = parser.typedArrs(decodedString);
	return parsedFile;
};

export const sleep = (milliseconds = 1000) => {
	console.info('---sleep---');
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
};

export const getHref = (string: string) => {
	return !string.includes('placeholder') && string.includes('https://') ? string : undefined;
};

export const download = async (title: string, url: string) => {
	try {
		const filepath = `images/${title}.jpg`;

		if (fs.existsSync(filepath)) {
			console.log('\x1b[31m%s\x1b[0m', 'The image already exists');
			return Promise.resolve();
		}

		sleep();

		const response = await axios({
			url,
			method: 'GET',
			responseType: 'stream',
		});

		return await new Promise((resolve, reject) => {
			response.data
				.pipe(fs.createWriteStream(filepath))
				.on('error', reject)
				.once('close', () => resolve(filepath));
		});
	} catch (e) {
		console.log('\x1b[31m%s\x1b[0m', 'download() error #1:');
		console.error(e);
	}
};
