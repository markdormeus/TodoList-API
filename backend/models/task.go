package models

type Task struct {
	ID       int64  `json:"id"`
	TaskName string `json:"task_name"`
	Status   string `json:"status"`
	DueDate  string `json:"due_date"`
}
