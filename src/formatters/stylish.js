import _ from 'lodash';

const startIndent = (depth) => ' '.repeat(depth * 4 - 2);
const endIndent = (depth) => ' '.repeat(depth * 4 - 4);

const stringify = (data) => {
  const iter = (innerData, depth) => {
    if (!_.isObject(innerData)) {
      return `${innerData}`;
    }

    const entries = Object.entries(innerData);
    const result = entries.map(([key, value]) => `${startIndent(depth)}${key}: ${iter(value, depth + 1)}`);
    const out = ['{', ...result, `${endIndent(depth - 1)}}`].join('\n');
    return out;
  };
  return iter(data, 1);
};

const stylish = (str) => {
  const iter = (data, depth) => {
    const entries = Object.entries(data);
    const result = entries.flatMap(([key, value, oldValue]) => {
      const [type] = data;
      switch (type) {
        case 'nested':
          return stylish(data, depth + 1);
        case 'added':
          return `${startIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'delited':
          return `${startIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${startIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}/n${startIndent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}`;
        case 'unchanged':
          return `${startIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        default:
          throw new Error(`Unknown type ${data.type}`);
      }
    });
    return result;
  };
  iter(str, 1);
};

export default stylish;
