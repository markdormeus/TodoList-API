package controllers

import (
	"database/sql"
	"fmt"
	"net/http"
	db "todolist-api/config"
	"todolist-api/models"

	"github.com/gin-gonic/gin"
)

// addTask adds the specified task to the database,
// returning the task ID of the new entry
func CreateTask(c *gin.Context) {
	var task models.Task
	//&task populates instance of Task struct
	//error handling
	if err := c.BindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	query := "INSERT INTO task (task_name, status, due_date) VALUES (?, ?, ?)"
	result, err := db.GetDB().Exec(query, task.ID, task.TaskName, task.Status, task.DueDate)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	id, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // set the ID of the created task
	}
	task.ID = id
	c.JSON(http.StatusOK, task)
}

// GetTasks queries for tasks that have the specified task name.
func GetTasks(c *gin.Context) {
	// A tasks slice to hold data from returned rows.
	var tasks []models.Task
	query := "SELECT * FROM task"
	rows, err := db.GetDB().Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query tasks."})
		return
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var tas models.Task
		if err := rows.Scan(&tas.ID, &tas.TaskName, &tas.Status, &tas.DueDate); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan task."})
			return
		}
		tasks = append(tasks, tas)
	}
	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Occured during iteration."})
		return
	}
	c.JSON(http.StatusOK, tasks)
}

// GetTaskByID queries for the task with the specified ID.
func GetTaskByID(c *gin.Context) {
	id := c.Param("id")
	// A task to hold data from the returned row.
	var task models.Task
	query := "SELECT * FROM task WHERE id = ?"
	row := db.GetDB().QueryRow(query, id)
	if err := row.Scan(&task.ID, &task.TaskName, &task.Status, &task.DueDate); err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("No task found with ID: %s", id)})
			return
		}
		//for other errors
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to retrieve task: %v", err)})
		return
	}
	//respond with requested data
	c.JSON(http.StatusOK, task)
}

func UpdateTask(c *gin.Context) {
	id := c.Param("id")
	var task models.Task
	query := "UPDATE task SET task_name = ?, status = ?, due_date = ? WHERE id = ?"
	result, err := db.GetDB().Exec(query, id, task.TaskName, task.Status, task.DueDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// get the number of rows affected by the UPDATE operation.
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to update task: %v", err)})
		return
	}
	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No task found with the given ID"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Task updated successfully", "rowsAffected": rowsAffected})
}

func DeleteTask(c *gin.Context) {
	id := c.Param("id")
	result, err := db.GetDB().Exec("DELETE FROM task WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	// get the number of rows affected by the DELETE operation.
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to delete task: %v", err)})
		return
	}
	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No task found with the given ID"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Task updated successfully", "rowsAffected": rowsAffected})
}
