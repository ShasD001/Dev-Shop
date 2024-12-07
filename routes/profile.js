const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); // Asegúrate de que bcrypt está importado

module.exports = function(db, app) {
    // Ruta GET para la página de inicio de sesión
    router.get('/Login', function (req, res, next) {
        res.render('login.ejs');
    });

    // Ruta POST para manejar el inicio de sesión
    router.post('/login', function(req, res) {
        const { username, password } = req.body;
      
        let userQuery = "SELECT * FROM users WHERE username = ?";
        db.query(userQuery, [username], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            
            if (result.length === 0) {
                res.send('Invalid username or password');
                return;
            }
    
            // Aquí tomas la contraseña cifrada de la base de datos
            const hashedPassword = result[0].hashedPassword;
    
            // Comparar la contraseña proporcionada con la contraseña en la base de datos
            bcrypt.compare(password, hashedPassword, function(err, isMatch) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
    
                if (isMatch) {
                    // La contraseña es correcta, puedes iniciar sesión
                    req.session.loggedInUser = result[0];
                    console.log(hashedPassword," the hashed password not match")
                    console.log("login",username)
                    req.session.userId = req.body.username;
                    res.redirect('./profile'); // Redirigir a la página de perfil
                } else {
                    // La contraseña es incorrecta
                    res.send('Invalid username or password');
                }
            });
        });
    });

    router.get('/profile', function (req,res) {
        res.render('profile.ejs');                                                                     
    });

    app.get('/logout', function(req, res) {
    // Destruir la sesión
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al cerrar sesión.'); // Manejo de error
        }
        // Redirigir a la página de inicio
        console.log("cerrar secion")
        res.redirect('/'); // Asegúrate de que esto sea la ruta correcta a tu página de inicio
    });
});



    return router; // Retorna el router aquí para la exportación
};