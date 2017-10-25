DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  customer_price DECIMAL (5, 2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;