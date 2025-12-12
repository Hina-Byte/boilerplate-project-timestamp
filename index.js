// index.js

const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS so the API is remotely testable
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Root endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  // Si no se pasa ningún parámetro, usamos la fecha actual
  if (!dateString) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Si es solo números, tratar como UNIX timestamp en milisegundos
  if (/^\d+$/.test(dateString)) {
    dateString = parseInt(dateString);
  }

  const date = new Date(dateString);

  // Si la fecha es inválida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Fecha válida
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
