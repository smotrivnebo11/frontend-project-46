import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return allKeys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, children: buildTree(obj1[key], obj2[key]), type: 'nested' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'delited' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, value: obj1[key], oldValue: obj2[key], type: 'changed',
      };
    }
    return { key, value: obj1[key], type: 'unchanged' };
  });
};

export default buildTree;
