DROP TABLE roles;

CREATE TABLE roles
(
    id SERIAL NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE users;

CREATE TABLE users
(
    id SERIAL NOT NULL,
    username VARCHAR (255) UNIQUE,
    password VARCHAR (255) NOT NULL,
    role_id INT,
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    PRIMARY KEY (id)

);

DROP TABLE categorys;

CREATE TABLE categorys
(
    id SERIAL NOT NULL,
    title VARCHAR (255) UNIQUE,
    is_deleted SMALLINT DEFAULT 0,
    PRIMARY KEY (id)

);

DROP TABLE products ;

CREATE TABLE products
(
    id SERIAL NOT NULL,
    image VARCHAR (5000),
    title VARCHAR (255),
    description text,
    price INT,
    category_id INT,
    is_deleted SMALLINT DEFAULT 0 ,
    FOREIGN KEY (category_id)REFERENCES categorys(id),
    PRIMARY KEY (id)

);

DROP TABLE orders ;
 
 CREATE TABLE orders 
 (
    order_id SERIAL NOT NULL,
    user_id INT,
    product_id INT,
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id)REFERENCES users(id),
    FOREIGN KEY (product_id)REFERENCES products(id),
    PRIMARY KEY (order_id)

 )