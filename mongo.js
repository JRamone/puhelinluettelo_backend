const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

if (process.argv.length < 3) {
  console.log('arguments are missing');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://JRamone:${password}@cluster0.2vlyp.mongodb.net/persons?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
  });
}
if (process.argv.length === 3) {
  console.log('Phonebook : ');
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
      mongoose.connection.close();
    });
  });
}
