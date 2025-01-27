const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Archivo JSON como base de datos
const DB_FILE = "./database.json";

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Leer base de datos
const readDatabase = () => {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
};

// Guardar en base de datos
const writeDatabase = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Endpoints
app.get("/data", (req, res) => {
  res.json(readDatabase());
});

app.post("/data", (req, res) => {
  const { value } = req.body;
  const database = readDatabase();
  database.push({ value });
  writeDatabase(database);
  res.status(201).send("Dato guardado");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
