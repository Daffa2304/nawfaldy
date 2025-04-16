// Middleware untuk cek session user
function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

// Middleware untuk cek hak akses admin
function isAdmin(req, res, next) {
    if (req.session.role !== 'admin') {
        return res.redirect('/menu');
    }
    next();
}

module.exports = { isAuthenticated, isAdmin };
