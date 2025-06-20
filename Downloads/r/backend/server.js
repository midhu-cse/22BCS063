const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/add', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

app.post('/subtract', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a - b });
});

app.post('/multiply', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a * b });
});

app.post('/divide', (req, res) => {
  const { a, b } = req.body;
  if (b === 0) {
    return res.status(400).json({ error: "Cannot divide by zero" });
  }
  res.json({ result: a / b });
});

app.listen(PORT, () => {
  console.log(`Calculator microservice running at http://localhost:${PORT}`);
});
