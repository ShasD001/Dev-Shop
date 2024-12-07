# Insert data into the tables

USE shoppingdb;

INSERT INTO products (name, category, price, description, image_url) VALUES
('NVIDIA GeForce RTX 3080', 'GPU', 699.99, 'High-performance graphics card for gaming and professional use.'),
('AMD Ryzen 9 5900X', 'CPU', 549.99, 'Powerful 12-core processor for demanding applications'),
('Intel Core i9-11900K', 'CPU', 529.99, 'High-end 8-core processor for gaming and productivity.'),
('Dell UltraSharp U2720Q', 'Monitor', 449.99, '27-inch 4K UHD monitor with excellent color accuracy'),
('ASUS ROG Strix X570-E', 'Motherboard', 299.99, 'Feature-rich motherboard for AMD Ryzen processors.'),
('Samsung Odyssey G7', 'Monitor', 699.99, '32-inch 1440p curved gaming monitor with 240Hz refresh rate.'),
('MSI MPG Z590 Gaming Edge', 'Motherboard', 229.99, 'High-performance motherboard for Intel processors.'),
('NVIDIA GeForce RTX 3070', 'GPU', 499.99, 'Great performance graphics card for gaming and content creation.');
