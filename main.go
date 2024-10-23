package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

type Task struct {
	ID       int64
	TaskName string
	Status   string
	DueDate  string
}

func main() {
	// Capture connection properties.
	cfg := mysql.Config{
		User:   os.Getenv("DBUSER"),
		Passwd: os.Getenv("DBPASS"),
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: "todolist",
	}
	// Get a database handle.
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
}

// addTask adds the specified task to the database,
// returning the task ID of the new entry
func addTask(tas Task) (int64, error) {
	result, err := db.Exec("INSERT INTO task (title, artist, price) VALUES (?, ?, ?)", tas.ID, tas.TaskName, tas.Status, tas.DueDate)
	if err != nil {
		return 0, fmt.Errorf("addTask: %v", err)
	}
	id, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("addTask: %v", err)
	}
	return id, nil
}

// tasksByArtist queries for tasks that have the specified task name.
func tasksByTaskName(name string) ([]Task, error) {
	// A tasks slice to hold data from returned rows.
	var tasks []Task

	rows, err := db.Query("SELECT * FROM task WHERE task = ?", name)
	if err != nil {
		return nil, fmt.Errorf("tasksByTaskName %q: %v", name, err)
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var tas Task
		if err := rows.Scan(&tas.ID, &tas.TaskName, &tas.Status, &tas.DueDate); err != nil {
			return nil, fmt.Errorf("tasksByTaskName %q: %v", name, err)
		}
		tasks = append(tasks, tas)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("tasksByTaskName %q: %v", name, err)
	}
	return tasks, nil

}

// taskByID queries for the task with the specified ID.
func tasksByID(id int64) (Task, error) {
	// A task to hold data from the returned row.
	var tas Task

	row := db.QueryRow("SELECT * FROM task WHERE id = ?", id)
	if err := row.Scan(&tas.ID, &tas.TaskName, &tas.Status, &tas.DueDate); err != nil {
		if err == sql.ErrNoRows {
			return tas, fmt.Errorf("tasksById %d: no such task", id)
		}
		return tas, fmt.Errorf("tasksById %d: %v", id, err)
	}
	return tas, nil
}

func updateTask(tas Task) (int64, error) {
	result, err := db.Exec("UPDATE task SET task_name = ?, status = ?, due_date = ? WHERE id = ?", tas.TaskName, tas.Status, tas.DueDate, tas.ID)
	if err != nil {
		return 0, fmt.Errorf("updateTask %d: %v", tas.ID, err)
	}

	// get the number of rows affected by the UPDATE operation.
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return 0, fmt.Errorf("updateTask %d: %v", tas.ID, err)
	}

	return rowsAffected, nil
}

func deleteTask(id int64) (int64, error) {
	result, err := db.Exec("DELETE FROM task WHERE id = ?", id)
	if err != nil {
		return 0, fmt.Errorf("deleteTask: %v", err)
	}
	// get the number of rows affected by the DELETE operation.
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return 0, fmt.Errorf("addTask: %v", err)
	}
	return rowsAffected, nil
}
