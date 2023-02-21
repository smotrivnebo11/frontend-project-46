const plain = (data) => {
  const [type] = data;
  switch (type) {
    case 'nested':
      return plain(value);
    case 'added':
      return `Property ${property} was added with value: ${value}`;
    case 'delited':
      return `Property ${property} was removed`;
    case 'changed':
      return `Property ${property} was updated. From ${oldValue} to ${value}`;
    default:
      throw new Error(`Unknown type ${data.type}`);
    // [complex value]
  }
};

export default plain;
