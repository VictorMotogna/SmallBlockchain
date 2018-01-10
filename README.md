# Small Blockchain
Small blockchain in Javascript

## Encryption
Hashes are created using SHA256 from crypto-js (use 'npm install --save crypto-js' to add to node_modules, but they are already added from the commit).

## Validation
Validation of a block is made very simple by checking the hash (created by contents of the block) and the previous block in the chain.

## Proof of work
Simple proof of implementation, to mine a block you must have a *difficulty* set by the block, which represents the number of zeros at the start of the block hash.

## Comments
Some of the console logs are commented to prove a point. You can see step by step the validation and the mining.

## Run
Run by using 'node main.js' OR 'node pow.js'. You need to have node installed to work.
