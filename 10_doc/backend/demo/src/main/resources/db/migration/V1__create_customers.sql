CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

INSERT INTO customer (first_name, last_name) VALUES
('Jack', 'Bauer'),
('Chloe', 'O''Brian'),
('Kim', 'Bauer'),
('David', 'Palmer'),
('Michelle', 'Dessler');
