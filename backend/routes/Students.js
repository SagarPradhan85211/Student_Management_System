const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { name, email, phone, address } = req.body;
  db.query(
    'INSERT INTO students (name, email, phone, address) VALUES (?, ?, ?, ?)',
    [name, email, phone, address],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId, name, email, phone, address });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  db.query(
    'UPDATE students SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
    [name, email, phone, address, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;


