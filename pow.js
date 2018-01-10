const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;  // added for mining
    }

    calculateHash() {
        // using sha256 from crypto-js for hashing
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            // if diff is set to 5, it needs 5 zeros
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        // this.difficulty = 4;
    }

    createGenesisBlock() {
        // first block in the blockchain, should be added manually
        return new Block(0, "01/01/2018", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    validateCHain() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let mtCoin = new Blockchain();

console.log("Mining block 1...")
mtCoin.addBlock(new Block(1, "02/01/2018", {amount: 4}));
console.log("\n");

console.log("Mining block 2...")
mtCoin.addBlock(new Block(2, "03/01/2018", {amount: 14}));
console.log("\n");

console.log("Mining block 3...")
mtCoin.addBlock(new Block(3, "04/01/2018", {amount: 24}));
console.log("\n");

console.log("Mining block 4...")
mtCoin.addBlock(new Block(4, "05/01/2018", {amount: 34}));
console.log("\n");