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
const supportedFormats = ['json', 'stylish', 'plain', undefined];
const supportedExtensions = ['json', 'yaml', 'yml'];

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
    a: jsonFile1, b: jsonFile2, expected: expectedStylish,
  },
  {
    a: yamlFile1, b: yamlFile2, format: 'stylish', expected: expectedStylish,
  },
  {
    a: yamlFile1, b: yamlFile2, format: 'plain', expected: expectedPlain,
  },
  {
    a: yamlFile1, b: yamlFile2, format: 'json', expected: expectedJSON,
  },
  {
    a: yamlFile1, b: yamlFile2, expected: expectedStylish,
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
    a: ymlFile1, b: ymlFile2, expected: expectedStylish,
  },
])('gendiff tests', ({
  a, b, format, expected,
}) => {
  expect(genDiff(a, b, format)).toBe(expected);
  expect(supportedFormats).toContain(format);
});

test('Check extension', () => {
  const file1 = 'expectedJSON.txt'.split('.');
  const file2 = 'expectedPlain.txt'.split('.');
  const extensionFile1 = file1[1];
  const extensionFile2 = file2[1];
  expect(supportedExtensions).not.toContain(extensionFile1);
  expect(supportedExtensions).not.toContain(extensionFile2);
});
