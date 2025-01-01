import express from 'express';
import pool from './db.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Guys!');
});

app.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json(err);
    }
  });

app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      res.status(201).send("Data Berhasil Ditambahkan");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
      res.status(200).send(`User with ID ${id} deleted.`);
    } catch (err) {
      res.status(500).json(err);
    }
  });


app.listen(3000, () => {
  console.log("Server Berjalan di Port 3000");
});