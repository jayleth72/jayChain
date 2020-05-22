const crypto = require("crypto");

// you won't know how many input are coming in??
// look up rest parameters - gather any number of arguments into an array ...
// ...inputs will take numerous arguments into an array
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");

  hash.update(inputs.sort().join(" "));
  // result of hash
  return hash.digest("hex");
};

module.exports = cryptoHash;

