const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Use promise-based mysql2
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Create a connection pool to MySQL
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'mysql',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'newpassword123',
    database: process.env.MYSQL_DATABASE || 'userdb'
});

// Retry connection logic
async function tryConnect(attempt = 1, maxAttempts = 12) {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL');
        connection.release();
    } catch (err) {
        console.error(`Attempt ${attempt}: Error connecting to MySQL: ${err.message}`);
        if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // 10s delay
            return tryConnect(attempt + 1, maxAttempts);
        } else {
            console.error('Max retry attempts reached. Could not connect to MySQL.');
        }
    }
}

// Start connection attempt
tryConnect();

// Route to add a user
app.post('/users', async (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'First name and last name are required' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO users (first_name, last_name) VALUES (?, ?)',
            [firstName, lastName]
        );
        res.status(201).json({ id: result.insertId, firstName, lastName });
    } catch (err) {
        console.error('Error adding user:', err.message);
        res.status(500).json({ error: 'Failed to add user222' });
    }
});

// Route to get all users
app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: 'Failed to fetchdd users' });
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('Backend is up and running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
