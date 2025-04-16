const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const app = express();

// Setup express-session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Menyajikan file statis
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', userRoutes);
app.use('/', adminRoutes);

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
