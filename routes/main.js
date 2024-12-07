// Create a new router
const express = require("express");
const router = express.Router();

// Handle our routes
module.exports = function(db, app) {
    router.get('/', function(req, res, next) {
        res.render('index.ejs', { shopData: app.locals.shopData });
    });

    router.get('/about', function(req, res, next) {
        res.render('about.ejs', { shopData: app.locals.shopData });
    });
    return router;
}
// Export the router object so index.js can access it
