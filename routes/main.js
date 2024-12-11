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
        res.render('additem.ejs', { shopData: app.locals.shopData });
    });

    router.get('/list', function(req, res, next) {
        res.render('list.ejs', { shopData: app.locals.shopData });
    });

    router.get('/login', function(req, res, next) {
        res.render('login.ejs', { shopData: app.locals.shopData });
    });

    router.get('/profile', function(req, res, next) {
        res.render('profile.ejs', { shopData: app.locals.shopData });
    });

    router.get('/todayssale', function(req, res, next) {
        res.render('todayssale.ejs', { shopData: app.locals.shopData });
    });

    router.get('/register', function(req, res, next) {
        res.render('register.ejs', { shopData: app.locals.shopData });
    });

    return router;
}

// Export the router object so index.js can access it

