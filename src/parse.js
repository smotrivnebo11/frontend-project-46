import yaml from 'js-yaml';

// const parsers = {
//   json: JSON.parse,
//   yaml: yaml.load,
//   yml: yaml.load,
// };

// export default (file, extension) = parsers[extension](file);

export default (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return yaml.load(file);
    case 'yml':
      return yaml.load(file);
    default:
      throw new Error('Unknown file format');
  }
};
