exports.dot = (key) => {
  return (obj) => {
    return obj && obj[key];
  };
};
