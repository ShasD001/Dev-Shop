// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const saltRounds = 10

module.exports = function(db, app) {
    router.get('/register', function (req, res, next) {
        res.render('register.ejs')                                                               
    })    
    router.post('/registered', [
        check('first', "ingrese un nombre")
            .exists()
            .isLength({ min: 5 })
            .escape(),
        check('last', "ingrese un apellido")
            .exists()
            .isLength({ min: 5 })
            .escape(),
        check('username', "ingrese un username")
            .exists()
            .isLength({ min: 5 })
            .escape(),
        check('email', "ingrese una valor adecuado")
            .exists()
            .isEmail()
            .isLength({ min: 8 })
            .normalizeEmail(),
        check('password', "debe tener minimo 5 caracteres")
            .exists()
            .isLength({ min: 5 })
    ], function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const validaciones = errors.array();
            console.log(req.body);
            const valores = req.body; // Guardar los valores ingresados
            res.render('register', { validaciones: validaciones, valores: valores });
        } else {
            // Saving data in database
            const plainPassword = req.body.password;
            bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
                // Store hashed password in your database.
                let sqlquery = "INSERT INTO users (first_name, last_name, username, email, hashedPassword) VALUES (?, ?, ?, ?, ?)";
                let newrecord = [req.body.first, req.body.last, req.body.username, req.body.email, hashedPassword];

                db.query(sqlquery, newrecord, (err, result) => {
                    if (err) {
                        next(err);
                    } else {
                        let responseMessage = 'Hello ' + req.body.first + ' ' + req.body.last + ' you are now registered! We will send an email to you at ' + req.body.email;
                        responseMessage += ' Your password is: ' + req.body.password + ' and your hashed password is: ' + hashedPassword;
                        res.send(responseMessage);
                    }
                });
            });
        }
    });
    router.get('/list', function(req, res, next) {
        let sqlquery = "SELECT first_name, last_name, username, email FROM users";
        
        db.query(sqlquery, (err, results) => {
            if (err) {
                return next(err);
            }
            res.render('userlist.ejs', { users: results });
        });
    });

    return router;
}
// Export the router object so index.js can access it