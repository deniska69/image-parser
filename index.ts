import * as fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { readFile, sleep, getHref, download } from './helpers.js';
import { SELECTOR } from './constants.js';

const file = readFile();

if (!fs.existsSync('images')) fs.mkdirSync('images');

const downdloads = async () => {
	console.log('----- START -----');

	let total = 0;
	let exist = 0;
	let errors = 0;
	let errorsArray: string[] = [];

	for (const item of file) {
		total++;

		const title = item[0];
		const url = item[1];

		console.log('');
		console.log(total, '/', file.length);
		console.log('title:', title);
		console.log('url:', url);

		if (url && title) {
			await axios
				.get(url)
				.then(async ({ data }) => {
					const $ = cheerio.load(data);
					const el = $(SELECTOR).attr();
					const dataLazy = el && 'data-lazy' in el ? el['data-lazy'] : '';
					const href = getHref(dataLazy);

					if (href) {
						exist++;
						console.log('\x1b[32m%s\x1b[0m', '[EXIST PHOTO]');
						await download(title, href);
					} else {
						console.log('\x1b[31m%s\x1b[0m', '[NO PHOTO]');
					}
				})
				.catch((e) => {
					errors++;
					errorsArray.push(title || url || 'undefined');
					console.error(e);
				});
		} else {
			console.error({ title, url });
		}
	}

	console.log('----- END -----');
	console.log({ total, exist, errors });
	if (errors) console.log(errorsArray);
};

downdloads();
