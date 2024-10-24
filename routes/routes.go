package routes

import (
	"todolist-api/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	router.GET("/tasks", controllers.GetTasks)
	router.GET("/tasks/:id", controllers.GetTaskByID)
	router.PUT("tasks/:id", controllers.UpdateTask)
	router.POST("/tasks", controllers.CreateTask)
	router.DELETE("/tasks/:id", controllers.DeleteTask)

	router.Run("localhost:8080")
}
