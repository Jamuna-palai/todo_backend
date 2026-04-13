const express = require('express');
const { sql, connectDB } = require('./db');

const app = express();

connectDB();

// Hello World route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/todos', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Todos');
        res.json(result.recordset);
    } catch (err) {
        res.send(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});