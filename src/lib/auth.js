const helmet = require('helmet');
const url = require('url'); // Módulo URL de Node.js

module.exports = {
    isLoggedIn(redirectPath = '/login') {
        return (req, res, next) => {
            if (req.isAuthenticated()) {
                return next();
            }

            req.flash('error', 'Debes iniciar sesión para acceder a esta página');
            req.session.returnTo = req.originalUrl || req.url;
            req.session.returnTo = (req.session.returnTo === redirectPath) ? '/' : req.session.returnTo;

            // Validar la URL de redirección
            if (!isValidRedirectURL(req.session.returnTo)) {
                req.session.returnTo = '/';
            }

            try {
                const cookieOptions = {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'Strict',
                    signed: true,
                    maxAge: 1000 * 60 * 15,
                };

                res.cookie('connect.sid', req.signedCookies['connect.sid'], cookieOptions);
            } catch (err) {
                console.error('Error al establecer la cookie de sesión:', err.message);
                // Puedes manejar el error de manera adecuada (redirección a una página de error, por ejemplo)
            }

            res.set({
                'Cache-Control': 'private, no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '-1'
            });

            res.redirect(redirectPath);
        };
    }
};

// Función para validar la URL de redirección
function isValidRedirectURL(redirectURL) {
    try {
        const parsedURL = new URL(redirectURL);
        // Puedes agregar más lógica de validación según tus necesidades
        return true;
    } catch (error) {
        console.error('URL de redirección no válida:', redirectURL);
        return false;
    }
}