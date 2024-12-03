const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false, // Changed to false for better session management
    saveUninitialized: false // Changed to false to avoid creating sessions for unauthenticated users
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shoppingdb'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err); // Improved error handling
        return;
    }
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    db.query('INSERT INTO users SET ?', user, (err) => {
        if (err) {
            console.error('Error inserting user:', err); // Improved error handling
            return res.status(500).send('Error registering user');
        }
        res.redirect('/login');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('Error fetching user:', err); // Improved error handling
            return res.status(500).send('Error logging in');
        }
        if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {
            req.session.loggedIn = true;
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    db.query('SELECT * FROM products WHERE name LIKE ?', ['%' + query + '%'], (err, results) => {
        if (err) {
            console.error('Error searching products:', err); // Improved error handling
            return res.status(500).send('Error searching products');
        }
        res.render('search_results', { results });
    });
});

app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error fetching products:', err); // Improved error handling
            return res.status(500).send('Error fetching products');
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
