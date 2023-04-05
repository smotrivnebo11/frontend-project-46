import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parse from './parse.js';
import formatDiff from './formatters/index.js';

const getExtension = (filepath) => path.extname(filepath).slice(1); // расширение файла - его тип
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), getExtension(filepath)); // читаем путь и парсим
const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
// абсолютный путь до файла

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFile1 = getData(buildFullPath(filepath1)); // получаем абсолютный путь до файла1
  const dataFile2 = getData(buildFullPath(filepath2)); // получаем абсолютный путь до файла2
  const diff = buildTree(dataFile1, dataFile2); // получаем дерево различий

  return formatDiff(diff, format); // выводим дерево в заданном формате
};

export default genDiff;
