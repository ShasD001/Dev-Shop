const express = require("express");
const router = express.Router();

module.exports = function(db, app) {

    const redirectLogin = (req, res, next) => {
        if (!req.session.userId) {
            res.redirect('../profile/Login'); // redirect to the login page
        } else { 
            next(); // move to the next middleware function
        } 
    };

    router.get('/search', function(req, res, next) {
        res.render("search.ejs");
    });

    router.get('/search_result', function(req, res, next) {
        // Search the database
        let sqlquery = "SELECT * FROM products WHERE name LIKE '%" + req.query.search_text + "%'"; // query database to get all the products
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err);
            }
            res.render("list.ejs", {availableProducts: result});
        });
    });

    router.get('/list', redirectLogin, function(req, res, next) {
        let sqlquery = "SELECT * FROM products"; // query database to get all the products
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err);
            }
            res.render("list.ejs", {availableProducts: result});
        });
    });

    router.get('/addproduct', redirectLogin, function(req, res, next) {
        res.render('additem.ejs');
    });

    router.post('/productadded', function(req, res, next) {
        // saving data in database
        let sqlquery = "INSERT INTO products (name, category, price, description) VALUES (?,?,?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.category, req.body.price, req.body.description];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                next(err);
            } else {
                res.send(' This product is added to database, name: ' + req.body.name + ', category: ' + req.body.category + ', price: ' + req.body.price + ', description: ' + req.body.description);
            }
        });
    });

    router.get('/bargainproducts', function(req, res, next) {
        let sqlquery = "SELECT * FROM products WHERE price < 20";
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err);
            }
            res.render("todayssale.ejs", {availableProducts: result});
        });
    });

    return router;
}
// Export the router object so index.js can access it