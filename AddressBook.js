const fs = require('fs');
const fsPromises = require('fs').promises;
const TrieNode = require('./TrieNode');

class AddressBook {
    constructor() {
        this.root = new TrieNode();
        this.map = {};
    }

    addContact(firstName, lastName, address, phoneNumber) {
        const contact = {
            firstName,
            lastName,
            address,
            phoneNumber
        };
        const fullName = `${firstName} ${lastName}`.toLowerCase();
        this._insertContact(fullName, contact);
    }

    async _insertContact(fullName, contact) {
        if(!this.map[contact.phoneNumber]) {
            this.map[contact.phoneNumber] = contact;
            let node = this.root;
            for (const char of fullName) {
                if (!node.children[char]) {
                    node.children[char] = new TrieNode();
                }
                node = node.children[char];
            }
            node.isEndOfWord = true;
            node.contacts.push(contact);
            console.log('Contact added successfully!');
        } else {
            console.log('phone number is already present in contact book');
        }
    }

    searchByContact(phoneNumber) {
        if(this.map[phoneNumber]) {
            return this.map[phoneNumber];
        }
        return null;
    }

    searchByName(query) {
        let node = this.root;
        for (const char of query) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return node.contacts;
    }

    async save(addressBookPath, contactBookPath) {
        const newData = JSON.stringify(this.root);
        const contactData = JSON.stringify(this.map);
        await fsPromises.writeFile(addressBookPath, newData);
        await fsPromises.writeFile(contactBookPath, contactData);
    }

    async saveChildren(filePath, node) {
        const newData = JSON.stringify(node);
        await fsPromises.writeFile(filePath, newData);
    }

    async loadFromFile(filePath, key) {
        try {
            const data = await fsPromises.readFile(filePath, 'utf-8');
            this[`${key}`] = JSON.parse(data);
        } catch (error) {
            console.error(`Error loading file: ${error.message}`);
        }
    }
}

module.exports = AddressBook;