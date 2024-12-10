-- Create the database
CREATE DATABASE IF NOT EXISTS products;

-- Use the database
USE products;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT,
    name VARCHAR(50),
    category VARCHAR(50),
    price DECIMAL(5, 2),
    author VARCHAR(50),
    publisher VARCHAR(50),
    publication_date DATE,
    PRIMARY KEY (id)
);

-- Create users table
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

-- Create and grant privileges to the user
CREATE USER IF NOT EXISTS 'products_app_user'@'localhost' IDENTIFIED BY 'Shastrid001';
GRANT ALL PRIVILEGES ON products.* TO 'products_app_user'@'localhost';
FLUSH PRIVILEGES;