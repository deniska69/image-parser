import * as fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { getUrl, readFile, getTitle, sleep } from './helpers.js';
import { SELECTOR } from './constants.js';

const file = readFile();

if (!fs.existsSync('images')) fs.mkdirSync('images');

const downdloads = async () => {
	console.log('----- START -----');

	const array = [0, 1, 2, 91];

	for (const item of array) {
		const title = getTitle(file, item);
		const url = getUrl(file, item);

		console.log('');
		console.log('title:', title);
		console.log('url:', url);

		if (url) {
			await axios
				.get(url)
				.then(({ data }) => {
					const $ = cheerio.load(data);

					const el = $(SELECTOR).attr();

					const dataLazy = el && 'data-lazy' in el ? el['data-lazy'] : '';
					const href = !dataLazy.includes('placeholder') ? dataLazy : undefined;

					if (href) {
						console.log({ href });
					} else {
						console.log('NO PHOTO');
					}
				})
				.catch((e) => console.error(e))
				.finally(() => {});
		}

		sleep();
	}

	console.log('----- END -----');
};

downdloads();
