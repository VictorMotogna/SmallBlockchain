const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        // using sha256 from crypto-js for hashing
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
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
        newBlock.hash = newBlock.calculateHash();
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
mtCoin.addBlock(new Block(1, "02/01/2018", {amount: 4}));
mtCoin.addBlock(new Block(2, "03/01/2018", {amount: 14}));
mtCoin.addBlock(new Block(3, "04/01/2018", {amount: 24}));
mtCoin.addBlock(new Block(4, "05/01/2018", {amount: 34}));

console.log(JSON.stringify(mtCoin, null, 4));
// console.log('\n');
// console.log('Is blockchain valid? ' + mtCoin.validateCHain());

// console.log('\n\n');

// mtCoin.chain[2].data = { amount:100 };
// mtCoin.chain[2].hash = mtCoin.chain[2].calculateHash();

// console.log(JSON.stringify(mtCoin, null, 4));
// console.log('\n');
// console.log('Data changed. Is blockchain still valid? ' + mtCoin.validateCHain());