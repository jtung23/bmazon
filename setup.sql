CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT(200) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100)NOT NULL,
	price DEC(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT
INTO products
(product_name, department_name, price, stock_quantity)
VALUES
('Double Shot Glass', 'Household Goods', '4.00', 200);

INSERT
INTO products
(product_name, department_name, price, stock_quantity)
VALUES
('Tulip Glass', 'Household Goods', '6.00', 225);
