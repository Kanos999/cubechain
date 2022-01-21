const Block = require("./Block.js");
const BlockChain = require("./BlockChain.js");
const RubiksCube = require("./RubiksCube.js");

const prompt = require('prompt-sync')();
const express = require('express')
const app = express()
const port = 3000



/////////////////////////////////////////////////////////////////
//
//  Rubiks cube shit
//
var cube = new RubiksCube();

cube.print();

while(true) {
    const move = prompt('enter moves dipshit: ');

    for (var i = 0; i < move.length; i++) {
        switch(move[i]) {
            case "l":
                cube.moveLeft();
                break;
            case "r":
                cube.moveRight();
                break;
            case "u":
                cube.moveUp();
        }
    }

    cube.print();
}






// Create two test blocks with some sample data
let a = new Block({from: "Joe", to: "Jane"});
let b = new Block({from: "Jane", to: "Joe"});

// Init our chain
let chain = new BlockChain();

// Add blocks to chain
chain.addNewBlock(a);
chain.addNewBlock(b);

//console.log(chain) // Print out the blockchain
chain.blockchain.forEach((block) => {
    console.log(block);
});


console.log("Validity: " + chain.checkChainValidity()); // Check our chain for validity


app.get('/', (req, res) => {
    console.log(req.query)
    res.send(chain)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})