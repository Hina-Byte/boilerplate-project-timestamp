const express = require('express');
const app = express();

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API de Timestamp con parámetro opcional
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;

  // Si no hay fecha → fecha actual
  if (!dateString) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Si es solo números → timestamp en milisegundos
  if (/^\d+$/.test(dateString)) {
    dateString = parseInt(dateString);
  }

  const date = new Date(dateString);

  // Si fecha inválida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta correcta
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
