// Route untuk dashboard admin
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

// Route untuk tampilkan menu
router.get('/menu', (req, res) => {
    db.all('SELECT * FROM menu', [], (err, menuItems) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.render('admin/menu', { menuItems });
    });
});

// Route untuk menambah menu
router.post('/menu/tambah', (req, res) => {
    const { nama, harga, gambar } = req.body;
    db.run('INSERT INTO menu (nama, harga, gambar) VALUES (?, ?, ?)', [nama, harga, gambar], (err) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.redirect('/admin/menu');
    });
});

// Route untuk melihat daftar pesanan admin
router.get('/admin/pesanan', (req, res) => {
    db.all('SELECT p.id, p.status, u.username, m.nama AS menu_nama, m.harga FROM pesanan p JOIN menu m ON p.menu_id = m.id JOIN users u ON p.user_id = u.id', [], (err, pesanan) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.render('admin/pesanan', { pesanan });
    });
});

// Route untuk update status pesanan admin
router.post('/admin/pesanan/update', (req, res) => {
    const { pesananId, status } = req.body;
    db.run('UPDATE pesanan SET status = ? WHERE id = ?', [status, pesananId], (err) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.redirect('/admin/pesanan');
    });
});

// Route untuk melihat daftar pesanan admin
router.get('/admin/pesanan', (req, res) => {
    db.all('SELECT p.id, p.status, u.username, m.nama AS menu_nama, m.harga FROM pesanan p JOIN menu m ON p.menu_id = m.id JOIN users u ON p.user_id = u.id', [], (err, pesanan) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.render('admin/pesanan', { pesanan });
    });
});

// Route untuk update status pesanan admin
router.post('/admin/pesanan/update', (req, res) => {
    const { pesananId, status } = req.body;
    db.run('UPDATE pesanan SET status = ? WHERE id = ?', [status, pesananId], (err) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.redirect('/admin/pesanan');
    });
});

// Route untuk melihat daftar pesanan admin
router.get('/admin/pesanan', (req, res) => {
    db.all('SELECT p.id, p.status, u.username, m.nama AS menu_nama, m.harga FROM pesanan p JOIN menu m ON p.menu_id = m.id JOIN users u ON p.user_id = u.id', [], (err, pesanan) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.render('admin/pesanan', { pesanan });
    });
});

// Route untuk update status pesanan admin
router.post('/admin/pesanan/update', (req, res) => {
    const { pesananId, status } = req.body;
    db.run('UPDATE pesanan SET status = ? WHERE id = ?', [status, pesananId], (err) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.redirect('/admin/pesanan');
    });
});

// Route untuk melihat daftar pesanan admin
router.get('/admin/pesanan', (req, res) => {
    db.all('SELECT p.id, p.status, u.username, m.nama AS menu_nama, m.harga FROM pesanan p JOIN menu m ON p.menu_id = m.id JOIN users u ON p.user_id = u.id', [], (err, pesanan) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.render('admin/pesanan', { pesanan });
    });
});

// Route untuk update status pesanan admin
router.post('/admin/pesanan/update', (req, res) => {
    const { pesananId, status } = req.body;
    db.run('UPDATE pesanan SET status = ? WHERE id = ?', [status, pesananId], (err) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.redirect('/admin/pesanan');
    });
});