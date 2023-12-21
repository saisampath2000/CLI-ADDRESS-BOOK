class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.contacts = [];
    }
}

module.exports = TrieNode;