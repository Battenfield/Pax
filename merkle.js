// merkle tree draft

var crypto = require('crypto');
var hash = crypto.createHash('sha256').update('chris').digest('hex');
const generateHash = (image) => {
    return crypto.createHash('sha256').update(image).digest('hex');
};

const hashAll = (arr) => {
    const firstHashArray = [];
    for(var i = 0; i < arr.length; i++) {
        firstHashArray.push(generateHash(arr[i]))
    }
    return firstHashArray;
}

const MerkleTree = (baseBlocks, firstHash = false) => {
    if(!firstHash) {
        const firstLevel = hashAll(baseBlocks);
        return MerkleTree(firstLevel, true);
    }
    if(baseBlocks.length > 1) {
        const nextLevel = [];
        for(var i = 0; i < baseBlocks.length-1; i++) {
            let combinedHash;
            const first = baseBlocks[i];
            if(baseBlocks[i+1]) {
                i = i + 1
                second = baseBlocks[i];
                combinedHash = generateHash(first + "||" + second);
            } else {
                combinedHash = generateHash(first);
            }
            nextLevel.push(combinedHash);
        }
        return MerkleTree(nextLevel, true);
    } else {
        return baseBlocks[0];
    }
}

// console.log(MerkleTree(["The", "Ethereum", "protocol", "was", "originally", "conceived", "as", "an", "upgraded", "version", "of", "a", "cryptocurrency"]));
