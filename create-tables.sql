DROP TABLE IF EXISTS task;
CREATE TABLE task (
    id          INT AUTO_INCREMENT NOT NULL,
    task_name   VARCHAR(128) NOT NULL,
    status      VARCHAR(255) NOT NULL,
    due_date    VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);