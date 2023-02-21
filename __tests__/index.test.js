import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');
const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');
const result = readFile('expectedStylish.txt');

test.each([
  { a: jsonFile1, b: jsonFile2, expected: result },
  { a: yamlFile1, b: yamlFile2, expected: result },
  { a: ymlFile1, b: ymlFile2, expected: result },
])('.add($a, $b)', ({ a, b, expected }) => {
  expect(genDiff(a, b)).toBe(expected);
});
// format??
