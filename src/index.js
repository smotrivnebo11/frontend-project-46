import fs from 'fs';
import compare from './compare.js';

const genDiff = (filepath1, filepath2) => {
  const file1content = fs.readFileSync(filepath1, 'utf-8');
  const file2content = fs.readFileSync(filepath2, 'utf-8');
  // console.log(file1content);
  // console.log(file2content);

  const file1parsed = JSON.parse(file1content);
  const file2parsed = JSON.parse(file2content);
  // console.log(file1parsed);
  // console.log(file2parsed);

  return compare(file1parsed, file2parsed);
};

export default genDiff;