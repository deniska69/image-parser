import * as fs from 'fs';
import { getUrl, readFile, getTitle } from './helpers.js';

console.log('');
console.log('------------- START -------------');
console.log('');

const file = readFile();

console.log(0, getTitle(file, 0));
console.log(getUrl(file, 0), '\n');
console.log(1, getTitle(file, 1));
console.log(getUrl(file, 1), '\n');
console.log(2, getTitle(file, 2));
console.log(getUrl(file, 2));

console.log('');
console.log('------------- END -------------');
console.log('');

if (!fs.existsSync('images')) fs.mkdirSync('images');

const downdloads = () => {};

downdloads();
