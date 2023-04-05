import _ from 'lodash';

const indent = ' '; // глобальная видимость для того, чтобы добавлять новые форматтеры
const doubleInd = '  ';
const indentCount = 4;

// eslint-disable-next-line max-len
const getIndent = (defaultDepth, backIndent = 2) => indent.repeat(defaultDepth * indentCount - backIndent);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const elements = Object.entries(value);
  const result = elements.map(([key, elValue]) => `${getIndent(depth)}${doubleInd}${key}: ${stringify(elValue, depth + 1)}`);

  return ['{', ...result, `${getIndent(depth, 4)}}`].join('\n');
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const currIndent = getIndent(depth);

    const stylishArr = tree.map((node) => {
      switch (node.type) {
        case 'nested': {
          return `${currIndent}${doubleInd}${node.key}: {\n${iter(node.value, depth + 1)}`;
        }
        case 'unchanged': {
          return `${currIndent}${doubleInd}${node.key}: ${stringify(node.value, depth + 1)}`;
        }
        case 'deleted': {
          return `${currIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        }
        case 'added': {
          return `${currIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        }
        case 'changed': {
          return `${currIndent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${currIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        }
        default: {
          throw new Error(`Unknown node type ${node.type}`);
        }
      }
    });
    return [...stylishArr, `${getIndent(depth, 4)}}`].join('\n');
  };
  const result = `{\n${iter(data, 1)}`;
  return result;
};

export default stylish;
