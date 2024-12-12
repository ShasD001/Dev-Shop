require('dotenv').config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

// API key and URL for the currency conversion API
const API_KEY = 'fca_live_LFMMCtMZdx5ViKaqJ6va0zXFvYAZFAwtil3wkcbI';
const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

// Function to get conversion rate
async function getConversionRate(fromCurrency, toCurrency) {
    try {
        const response = await axios.get(BASE_URL);
        const rates = response.data.data;
        const rate = rates[toCurrency] / rates[fromCurrency];
        return rate;
    } catch (error) {
        console.error('Error fetching conversion rate:', error);
        return null;
    }
}

// Handle our routes
module.exports = function(db, app) {
    router.get('/', function(req, res, next) {
        res.render('index.ejs', { shopData: app.locals.shopData });
    });

    router.get('/about', async function(req, res, next) {
        const fromCurrency = 'USD'; // Default currency to convert from
        const toCurrency = 'EUR'; // Default currency to convert to
        const rate = await getConversionRate(fromCurrency, toCurrency);

        res.render('about.ejs', { 
            shopData: app.locals.shopData,
            fromCurrency,
            toCurrency,
            rate 
        });
    });

    router.get('/additem', function(req, res, next) {
        res.render('addItem.ejs', { shopData: app.locals.shopData });
    });

    router.get('/list', function(req, res, next) {
        let sqlquery = "SELECT * FROM products"; // query database to get all the products
        db.query(sqlquery, (err, result) => {
            if (err) {
                return next(err);
            }
            res.render('list.ejs', { availableProducts: result, shopData: app.locals.shopData });
        });
    });
    

    router.get('/login', function(req, res, next) {
        res.render('login.ejs', { shopData: app.locals.shopData });
    });

    router.get('/profile', function(req, res, next) {
        res.render('profile.ejs', { shopData: app.locals.shopData });
    });

    router.get('/todayssale', function(req, res, next) {
        let sqlquery = "SELECT * FROM products WHERE sale = 1"; // Assuming you have a 'sale' column in your products table
        db.query(sqlquery, (err, result) => {
            if (err) {
                return next(err);
            }
            res.render('todayssale.ejs', { availableProducts: result, shopData: app.locals.shopData });
        });
    });
    

    router.get('/register', function(req, res, next) {
        res.render('register.ejs', { shopData: app.locals.shopData });
    });

    // Error handling for all routes
    router.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    return router;
}

// Export the router object so index.js can access it