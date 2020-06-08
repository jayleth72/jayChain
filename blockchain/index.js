const Block = require("./block");
const { GENESIS_DATA } = require("../config");
const cryptoHash = require("../util/crypto-hash");

class Blockchain {
  constructor() {
    // start chain with genesis block
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    
    if (chain.length <= this.chain.length) {
      console.error("The incoming chain must be longer");
      return;
    }

    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain must be valid");
      return;
    }

    console.log("replacing chain with", chain);
    this.chain = chain;
  }

  static isValidChain(chain) {
    // allows us to check keys and values as can not use equality operator with two different instances of a block
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];

      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      // using object deconstruction to assign values
      const { timestamp, lastHash, hash, nonce, difficulty, data } = block;

      // check for break in chain or chain in lastHash value
      if (lastHash !== actualLastHash) return false;

      // check for change in data field
      const validatedHash = cryptoHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );

      if (hash !== validatedHash) return false;

      if (Math.abs(lastDifficulty - difficulty > 1)) return false;
    }

    return true;
  }
}

module.exports = Blockchain;
