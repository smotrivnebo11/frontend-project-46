import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');
const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');
const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJSON = readFile('expectedJSON.txt');

test.each([
  {
    a: jsonFile1, b: jsonFile2, format: 'stylish', expected: expectedStylish,
  },
  {
    a: jsonFile1, b: jsonFile2, format: 'plain', expected: expectedPlain,
  },
  {
    a: jsonFile1, b: jsonFile2, format: 'json', expected: expectedJSON,
  },
  {
    a: jsonFile1, b: jsonFile2, format: undefined, expected: expectedStylish,
  },
  {
    a: yamlFile1, b: yamlFile2, fotmat: 'stylish', expected: expectedStylish,
  },
  {
    a: yamlFile1, b: yamlFile2, fotmat: 'plain', expected: expectedPlain,
  },
  {
    a: yamlFile1, b: yamlFile2, fotmat: 'json', expected: expectedJSON,
  },
  {
    a: yamlFile1, b: yamlFile2, fotmat: undefined, expected: expectedStylish,
  },
  {
    a: ymlFile1, b: ymlFile2, format: 'stylish', expected: expectedStylish,
  },
  {
    a: ymlFile1, b: ymlFile2, format: 'plain', expected: expectedPlain,
  },
  {
    a: ymlFile1, b: ymlFile2, format: 'json', expected: expectedJSON,
  },
  {
    a: ymlFile1, b: ymlFile2, format: undefined, expected: expectedStylish,
  },
])('gendiff tests', ({
  a, b, format, expected,
}) => {
  expect(genDiff(a, b, format)).toBe(expected);
});
