import fs from 'fs';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// describe('genDiff should work correctly', () => {
//   const jsonFile1 = getFixturePath('file1.json');
//   const jsonFile2 = getFixturePath('file2.json');
  
//   const expectedJSON = readFile('expectedJSON.txt');
  
//   //test.each
  
//   expect(genDiff(jsonFile1, jsonFile2)).toBe(expectedJSON);
// });

test('file json', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');
  const resultName = getFixturePath('expectedJSON.txt');
  const result = fs.readFileSync(resultName, 'utf8');
  expect(genDiff(filename1, filename2)).toEqual(result);
});