import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `${value}`;
  }
  return String(value);
};

const plain = (data) => {
  const iter = (innerData, oldKey = '') => {
    const entries = Object.entries(innerData);
    console.log(entries);
    const result = entries.flatMap(([key, val]) => {
      console.log(val);
      console.log(key);
      switch (innerData.type) {
        case 'nested':
          return iter(val.value, `${oldKey}${key}.`);
        case 'added':
          return `Property ${oldKey}${key} was added with value: ${stringify(val.value)}`;
        case 'delited':
          return `Property ${oldKey}${key} was removed`;
        case 'changed':
          return `Property ${oldKey}${key} was updated. From ${stringify(val.oldValue)} to ${stringify(val.value)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type ${key}`);
      }
    });
    return result.join('\n');
  };
  return iter(data);
};

export default plain;
