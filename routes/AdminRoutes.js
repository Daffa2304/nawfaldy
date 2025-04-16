const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');

// Halaman Login Admin
router.get('/admin/login', (req, res) => {
    res.render('admin/login');
});

// Proses Login Admin
router.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // Cek apakah username dan password sesuai dengan yang ada di database (contoh)
    if (username === 'admin' && password === 'admin123') {
        req.session.isAdminLoggedIn = true;
        res.redirect('/admin/dashboard');
    } else {
        res.send('Invalid login');
    }
});

// Halaman Dashboard Admin (setelah login)
router.get('/admin/dashboard', (req, res) => {
    if (req.session.isAdminLoggedIn) {
        res.render('admin/dashboard');
    } else {
        res.redirect('/admin/login');
    }
});

// Logout Admin
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.redirect('/admin/login');
    });
});

// Halaman View Orders
router.get('/admin/orders', (req, res) => {
    if (req.session.isAdminLoggedIn) {
        res.render('admin/orders');
    } else {
        res.redirect('/admin/login');
    }
});

module.exports = router;
