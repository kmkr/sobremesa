const md5File = require("md5-file");
const path = require("path");

const hashes = {};

module.exports.withHash = filePath => {
  if (hashes[filePath]) {
    return hashes[filePath];
  }

  const md5 = md5File.sync(path.join(__dirname, filePath));

  hashes[filePath] = md5;

  return md5;
};
