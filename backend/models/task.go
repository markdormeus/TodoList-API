package models

type Task struct {
	ID          int64  `json:"id"`
	TaskName    string `json:"task_name"`
	Description string `json:"description"`
	Status      bool   `json:"status"`
	DueDate     string `json:"due_date"`
}
