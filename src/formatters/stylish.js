import _ from 'lodash';

const getIndent = (defaultDepth, endIndent = 2) => {
  const indent = ' ';
  const indentCount = 4;
  const defaultIndent = indent.repeat(defaultDepth * indentCount - endIndent);
  return defaultIndent;
};

// const startIndent = (depth) => ' '.repeat(depth * 4 - 2);
// const endIndent = (depth) => ' '.repeat(depth * 4 - 4);

const stringify = (data) => {
  const iter = (innerData, depth) => {
    if (!_.isObject(innerData)) {
      return `${innerData}`;
    }

    const entries = Object.entries(innerData);
    const result = entries.map(([key, value]) => `${getIndent(depth)}${key}: ${iter(value, depth + 1)}`);
    const out = ['{', ...result, `${getIndent(depth - 1)}}`].join('\n');
    return out;
  };
  return iter(data, 1);
};

const stylish = (str) => {
  const iter = (innerData, depth) => {
    const result = innerData.map((data) => {
      switch (data.type) {
        case 'nested':
          return iter(data.children, depth + 1);
        case 'added':
          return `${getIndent(depth)}+ ${data.key}: ${stringify(data.value, depth + 1)}`;
        case 'delited':
          return `${getIndent(depth)}- ${data.key}: ${stringify(data.value, depth + 1)}`;
        case 'changed':
          return `${getIndent(depth)}+ ${data.key}: ${stringify(data.value, depth + 1)}/n${getIndent(depth)}- ${data.key}: ${stringify(data.oldValue, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${data.key}: ${stringify(data.value, depth + 1)}`;
        default:
          throw new Error(`Unknown type ${data.type}`);
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(str, 1)}\n}`;
};

export default stylish;
