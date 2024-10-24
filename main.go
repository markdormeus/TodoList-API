package main

import (
	"log"
	"os"
	db "todolist-api/backend/config"
	"todolist-api/backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	//initialization
	db.InitDB()

	router := gin.Default()

	// load routes
	routes.RegisterRoutes(router)

	// start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port
	}
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
