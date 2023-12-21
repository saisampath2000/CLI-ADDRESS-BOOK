# ADDRESS BOOK - CLI APP

In this repository, I have added the code for cli based address book. We can do the following operations with this app

- Add Contacts with
    - First Name
    - Last Name
    - Address
    - Phone Number
- Search the contact based on full name.
- Search the contact based on phone number.

**Note : phone number should be unique and record will not be inserted for the same phone number.**

For name based search, I am using a trie. The flow look as follows

- Whenever user adds the contact, I am maintaing a trie and hash map. The trie stores the names with end character storing all the contact information. The hash map has phone number has key and contact as value.
- These objects are then saved to their respective jsons.
- If user requests search based on name, I will be traversing the trie to find out all the contacts with that name.
- If user requests search based on number, then simple lookup on hash up will work.

## HOW TO RUN

To insert the contact, use the following command

```bash
node index.js add -f John -l Max -a "2nd right, 3rd main, 4th Street" -p 123-45-122-11
```

To search based on the name, use the following command

```bash
node index.js search -n "John Max"
```

**Note : Remember that search is based on full name and not on first name.**

To search based on the phone number, use the following command

```bash
node index.js search -p 123-45-122-11
```

To search using name and phone number both, use the following command

```bash
node index.js search -n "John Max" -p 123-45-122-11
```
