import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const union = _.union(keys1, keys2);
  const allKeys = _.sortBy(union);

  const result = allKeys.reduce((acc, key) => {
    const plus = `+ ${key}`;
    const minus = `- ${key}`;
    const common = `  ${key}`;

    if (!_.has(obj1, key)) {
      acc.push(`  ${plus}: ${obj2[key]}`);
    } else if (!_.has(obj2, key)) {
      acc.push(`  ${minus}: ${obj1[key]}`);
    } else if (obj1[key] !== obj2[key]) {
      acc.push(`  ${minus}: ${obj1[key]}`);
      acc.push(`  ${plus}: ${obj2[key]}`);
    } else {
      acc.push(`  ${common}: ${obj1[key]}`);
    }
    return acc;
  }, []).join('\n');
  return `{\n${result}\n}`;
};

export default compare;
