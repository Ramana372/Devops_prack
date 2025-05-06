// app.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: 'mysql',        // or 'db' if using Docker service name
  user: 'ramana',
  password: 'ramana@2k3',
  database: 'user',
  port: 3307                // Change to 3306 if using that port
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

// Define a route to fetch and display data
app.get('/', (req, res) => {
  connection.query('SELECT * FROM your_table_name', (err, results) => {
    if (err) {
      console.error('Error querying database:', err.message);
      res.status(500).send('Database error');
      return;
    }

    res.send(`<h1>Fetched Data</h1><pre>${JSON.stringify(results, null, 2)}</pre>`);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
