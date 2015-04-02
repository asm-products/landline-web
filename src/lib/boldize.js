module.exports = (body) => {
  return body.replace(/\*(.+)\*/, '<span class="bold">$1</span>');
};
