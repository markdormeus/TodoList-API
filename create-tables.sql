DROP TABLE IF EXISTS task;
CREATE TABLE task (
    id          INT AUTO_INCREMENT NOT NULL,
    task_name   VARCHAR(128) NOT NULL,
    status      BOOLEAN DEFAULT FALSE,
    description VARCHAR(255) NOT NULL,
    due_date    VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id          INT AUTO_INCREMENT NOT NULL,
    username    VARCHAR(50) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);