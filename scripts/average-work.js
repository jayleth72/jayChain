const Blockchain = require("../blockchain");

const blockchain = new Blockchain();

blockchain.addBlock({ data: "initial" });

console.log("first block", blockchain.chain[blockchain.chain.length - 1]);

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

const time = [];

for (let i = 0; i < 10000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

  blockchain.addBlock({ data: `block ${i}` });

  nextBlock = blockchain.chain[blockchain.chain.length - 1];

  nextTimestamp = nextBlock.timestamp;
  // time to mine the block
  timeDiff = nextTimestamp - prevTimestamp;
  time.push(timeDiff);

  // to get a sum use reduce function
  average = time.reduce((total, num) => total + num) / time.length;

  console.log(
    `Time to mine block: ${timeDiff}ms.  Difficult ${nextBlock.difficulty}.  Average time: ${average}ms`
  );
}
