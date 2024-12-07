# Create database script for Dev-Shop

# Create the database
CREATE DATABASE IF NOT EXISTS products.db;
USE products.db;

# Create the tables
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT,
    name VARCHAR(50),
    price DECIMAL(5, 2),
    author VARCHAR(50),
    publisher VARCHAR(50),
    publication_date DATE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# Create the app user
CREATE USER IF NOT EXISTS 'products_app_user'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON products.db.* TO 'products_app_user'@'localhost';
