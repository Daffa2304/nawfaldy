const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/kantin.db');

// Route untuk halaman login
router.get('/login', (req, res) => {
    res.render('user/login');
});

// Route untuk halaman register
router.get('/register', (req, res) => {
    res.render('user/register');
});

// POST route untuk login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.role = user.role;
            return res.redirect('/menu');
        }
        res.redirect('/login');
    });
});

// POST route untuk register
router.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], (err) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.redirect('/login');
    });
});

module.exports = router;

// Route untuk menu user
router.get('/menu', (req, res) => {
    db.all('SELECT * FROM menu', [], (err, menuItems) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.render('user/menu', { menuItems });
    });
});

const QRCode = require('qrcode');

// Route untuk pesan makanan
router.get('/pesan/:menuId', (req, res) => {
    const menuId = req.params.menuId;
    const userId = req.session.userId;  // User yang sedang login
    const status = 'Pesanan Baru'; // Status pesanan

    db.get('SELECT * FROM menu WHERE id = ?', [menuId], (err, menuItem) => {
        if (err || !menuItem) {
            return res.status(500).send("Menu item not found");
        }
        
        // Insert pesanan ke database
        db.run('INSERT INTO pesanan (user_id, menu_id, status) VALUES (?, ?, ?)', [userId, menuId, status], function(err) {
            if (err) {
                return res.status(500).send("Failed to place order");
            }
            
            // Generate QR Code untuk pesanan
            const orderDetails = `Pesanan ID: ${this.lastID}\nMenu: ${menuItem.nama}\nHarga: Rp ${menuItem.harga}`;
            QRCode.toDataURL(orderDetails, (err, qrCodeDataUrl) => {
                if (err) {
                    return res.status(500).send("Failed to generate QR Code");
                }
                res.render('user/qr', { qrCodeDataUrl });
            });
        });
    });
});

// Route untuk melihat status pesanan user
router.get('/pesanan', (req, res) => {
    const userId = req.session.userId;
    db.all('SELECT p.id, p.status, m.nama AS menu_nama, m.harga FROM pesanan p JOIN menu m ON p.menu_id = m.id WHERE p.user_id = ?', [userId], (err, pesanan) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.render('user/pesanan', { pesanan });
    });
});

