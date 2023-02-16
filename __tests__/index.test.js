import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('file json', () => {
  const jsonFile1 = getFixturePath('file1.json');
  const jsonFile2 = getFixturePath('file2.json');
  const resultName = getFixturePath('expectedJSON.txt');
  const result = fs.readFileSync(resultName, 'utf8');
  expect(genDiff(jsonFile1, jsonFile2)).toEqual(result);
});
