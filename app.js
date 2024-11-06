require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Accès refusé');

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Token invalide');
    req.user = decoded;
    next();
  });
};

const users = []; // Utiliser une base de données réelle en production

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send('Utilisateur créé');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Identifiants invalides');
  }
});

app.get('/devoirs', authenticateToken, (req, res) => {
  connection.query('SELECT * FROM devoir', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/devoirs', authenticateToken, (req, res) => {
  const devoir = req.body;
  connection.query('INSERT INTO devoir SET ?', devoir, (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...devoir });
  });
});

app.put('/devoirs/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const updatedDevoir = req.body;
  connection.query('UPDATE devoir SET ? WHERE id = ?', [updatedDevoir, id], (err) => {
    if (err) throw err;
    res.json(updatedDevoir);
  });
});

app.delete('/devoirs/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM devoir WHERE id = ?', id, (err) => {
    if (err) throw err;
    res.status(204).send();
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${process.env.PORT}/`);
});