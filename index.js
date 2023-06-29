const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send("Wrong address!").end();
  }
});

app.get("/info", (req, res) => {
  const date = new Date().toString();
  const allPeople = persons.length;

  res.send(
    `<p> Phonebook has info for ${allPeople} people </p> <p> ${date} </p>`
  );
});

const generateID = () => {
  const min = persons.length + 1;
  const max = 100000;
  const randomNum =
    persons.length > 0 ? Math.floor(Math.random() * (max - min) + min) : 0;

  return randomNum;
};

app.post(`/api/persons`, (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name and/or number missing.",
    });
  }

  const personExists = persons.some((p) => p.name === body.name);

  if (personExists) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
