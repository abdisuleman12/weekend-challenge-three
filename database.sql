CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  tasks_to_add VARCHAR(80) NOT NULL,
  complete BOOLEAN NOT NULL);
  
 INSERT INTO task (tasks_to_add, complete) VALUES ('clean kitchen', true);

SELECT * FROM task;

