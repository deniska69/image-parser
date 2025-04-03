import * as fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { getUrl, readFile, getTitle } from './helpers.js';
import { SELECTOR } from './constants.js';

const file = readFile();

if (!fs.existsSync('images')) fs.mkdirSync('images');

const downdloads = async () => {
	console.log('----- START -----');

	const a = 0;
	const b = 1;
	const c = 91;

	const n = c;
	const url = getUrl(file, n);

	if (!url) return console.error('url is undefined');

	console.log('---------------');
	console.log(n, getTitle(file, n));
	console.log(getUrl(file, n));
	console.log('---------------');

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
		.finally(() => console.log('----- END -----'));
};

downdloads();
