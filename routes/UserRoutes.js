const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Tampilkan halaman login
router.get('/login', (req, res) => {
    res.send('Halaman Login');
});

// Contoh: GET register
router.get('/register', (req, res) => {
    res.render('register');
});

// POST Register User
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Cek apakah email sudah terdaftar
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
        if (row) {
            return res.send('Email sudah terdaftar!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [name, email, hashedPassword], (err) => {
                if (err) return res.send('Gagal register');
                res.redirect('/login');
            });
    });
});

// GET Halaman Order
router.get('/order', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('order');
});

// POST Order Makanan
router.post('/order', (req, res) => {
    const { menu_name, quantity } = req.body;
    const userId = req.session.user.id;

    db.run('INSERT INTO orders (user_id, menu_name, quantity, status) VALUES (?, ?, ?, ?)',
        [userId, menu_name, quantity, 'Pending'], (err) => {
            if (err) return res.send('Gagal memesan');
            res.send('Pesanan berhasil dikirim!');
        });
});

const path = require('path');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

module.exports = router;
