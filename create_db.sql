# Create database script for Dev-Shop

# Create the database
CREATE DATABASE IF NOT EXISTS shoppingdb;
USE shoppingdb;

# Create the tables
CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT,name VARCHAR(50),price DECIMAL(5, 2),author VARCHAR(50), publisher VARCHAR(50),  publication_date data('DD/MM/YYYY'), unsigned,PRIMARY KEY(id));

CREATE TABLE users (
    id SERIAL PRIMARY KEY,                    -- Identificador único para cada usuario
    username VARCHAR(50) UNIQUE NOT NULL,     -- Nombre de usuario único
    first_name VARCHAR(100) NOT NULL,         -- Primer nombre
    last_name VARCHAR(100) NOT NULL,          -- Apellido
    email VARCHAR(100) UNIQUE NOT NULL,       -- Correo electrónico único
    hashedPassword VARCHAR(255) NOT NULL,      -- Contraseña cifrada
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha de actualización
);

# Create the app user
CREATE USER IF NOT EXISTS 'bettys_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON bettys_books.* TO ' bettys_books_app'@'localhost';