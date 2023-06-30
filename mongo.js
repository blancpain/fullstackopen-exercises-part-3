const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("You must provide a password as argument!");
  process.exit(1);
}

const password = process.argv[2];
const [name, number] = process.argv.slice(3);

const url = `mongodb+srv://ydimitrov:${password}@cluster0.uzp2rm6.mongodb.net/phonebookApp`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (!name || !number) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: `${name}`,
    number: `${number}`,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
