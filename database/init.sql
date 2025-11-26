-- Create a database if it doesn't exist
CREATE DATABASE IF NOT EXISTS userdb;

-- Use the database
USE userdb;

-- Create a users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

-- Insert random names into the users table
INSERT INTO users (first_name, last_name) VALUES
('John', 'Doe'),
('Jane', 'Smith'),
('Alice', 'Johnson');
