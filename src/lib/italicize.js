module.exports = (body) => {
  return body.replace(/_(.+)_/, '<span class="italic">$1</span>');
};
