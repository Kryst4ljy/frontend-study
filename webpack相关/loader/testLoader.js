module.exports = function (source) {
  console.log(source, this.query);
  return source.replace("123", "321");
};
