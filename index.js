// Importing the 'commander' library for handling command-line options
const { program } = require('commander');
const AddressBook = require('./AddressBook');

const addressBook = new AddressBook();

// Setting the version of the CLI tool
program.version('1.0.0');

// Defining a command with options
program
  .command('add')
  .description('Add a new entry')
  .option('-f, --firstName <firstName>', 'First name')
  .option('-l, --lastName <lastName>', 'Last name')
  .option('-a, --address <address>', 'Address')
  .option('-p, --phoneNumber <phoneNumber>', 'Phone number')
  .action(async (options) => {
    const { firstName, lastName, address, phoneNumber } = options;

    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const contact = {
        firstName,
        lastName,
        address,
        phoneNumber
    };

    await addressBook.loadFromFile(`address_book.json`, 'root');
    await addressBook.loadFromFile(`contact_book.json`, 'map');

    addressBook._insertContact(fullName, contact);
    await addressBook.save(`address_book.json`, `contact_book.json`);
  })

program
  .command('search')
  .description('Search for entries')
  .option('-n, --name <name>', 'Search by name')
  .option('-p, --phoneNumber <phoneNumber>', 'Search by phone number')
  .action(async (options) => {
    const { name, phoneNumber } = options;
    
    if(name) {
        const query = name.toLowerCase();
        await addressBook.loadFromFile(`address_book.json`, 'root');
        console.time('search time for name');
        const searchResults = addressBook.searchByName(query);
        console.timeEnd('search time for name');
        console.log('Search Results:', searchResults);
    }

    if(phoneNumber) {
        await addressBook.loadFromFile(`contact_book.json`, 'map');
        console.time('search time for phone number');
        const searchResults = addressBook.searchByContact(phoneNumber);
        console.timeEnd('search time for phone number');
        console.log('Search Results:', searchResults);
    }
  })

// Parsing command-line arguments
program.parse(process.argv);
