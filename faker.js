const AddressBook = require('./AddressBook');
const Chance = require('chance');

const chance = new Chance();

// Function to generate fake data
function generateFakeData() {
    let firstName = chance.first();
    let lastName = chance.last();
    let address = chance.address();
    let phoneNumber = chance.phone();

    return {
        firstName,
        lastName,
        address,
        phoneNumber,
    };
}

const recordsToGenerate = 1000000;
const addressBook = new AddressBook();

// Generate and print fake data
for (let i = 0; i < recordsToGenerate; i++) {
    const { firstName, lastName, address, phoneNumber } = generateFakeData();
    const contact = {
        firstName,
        lastName,
        address,
        phoneNumber
    };
    const fullName = `${firstName} ${lastName}`.toLowerCase();

    addressBook._insertContact(fullName, contact);
}

addressBook.save(`address_book.json`, `contact_book.json`);