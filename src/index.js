import fs from 'fs';
import path from 'path';
import compare from './compare.js';
import parse from './parse.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1content = fs.readFileSync(filepath1, 'utf-8');
  const file2content = fs.readFileSync(filepath2, 'utf-8');
  // console.log(file1content);
  // console.log(file2content);
  const getExtension = (filepath) => path.extname(filepath).slice(1);

  const file1parsed = parse(file1content, getExtension(filepath1));
  const file2parsed = parse(file2content, getExtension(filepath2));
  // console.log(file1parsed);
  // console.log(file2parsed);

  return compare(file1parsed, file2parsed);
};

export default genDiff;
