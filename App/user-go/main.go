package main

import (
	"github.com/gin-gonic/gin"
	// "github.com/joho/godotenv"
	routes "github.com/nvlannasik/user-services-go/routes"
	"log"
	"os"
)

func main() {
	// err := godotenv.Load(".env")
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	port := os.Getenv("PORT")
	if port == "" {
		log.Println("No PORT environment variable detected, defaulting to 8080")
		port = "8080"
	}
	router := gin.New()
	router.Use(gin.Logger())

	routes.AuthRouter(router)
	routes.UserRouter(router)

	router.GET("/v1/user/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})

	})

	router.Run(":" + port)

}
