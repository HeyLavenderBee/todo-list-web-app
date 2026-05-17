CREATE TABLE IF NOT EXISTS users(
    id varchar PRIMARY KEY,
    username varchar(100) not null,
    email varchar(100) not null,
    password varchar() not null,
    user_photo text,
    creation_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todo_lists(
    id varchar PRIMARY KEY,
    list_name varchar(50) not null,
    description text,
    creation_date TIMESTAMP,
    user_id varchar,
    FOREIGN KEY user_id REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS todos(
    id varchar PRIMARY KEY,
    list_id varchar,
    FOREIGN KEY list_id REFERENCES todo_lists(id)
);
