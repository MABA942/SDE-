const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Para poder leer el cuerpo de las peticiones JSON

// Ruta para obtener datos de la base de datos
app.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'database.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo de la base de datos.');
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para buscar por descripción
app.get('/search/description', (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  fs.readFile(path.join(__dirname, 'data', 'database.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo de la base de datos.');
    }
    const records = JSON.parse(data);
    const results = records.filter(record => 
      record.Descripción.toLowerCase().includes(keyword)
    );
    res.json(results);
  });
});

// Ruta para buscar por número de referencia
app.get('/search/reference', (req, res) => {
  const reference = req.query.reference;
  fs.readFile(path.join(__dirname, 'data', 'database.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo de la base de datos.');
    }
    const records = JSON.parse(data);
    const result = records.find(record => record["No. De Referencia"] === reference);
    if (result) {
      res.json(result);
    } else {
      res.status(404).send('No se encontró el número de referencia.');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
