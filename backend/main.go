package main

import (
	"os"

	"github.com/daniloreilly/encurtador-links/backend/handler"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	ConnectDatabase()
	handler.DB = DB

	r := gin.Default()
	r.Use(cors.Default())

	r.POST("/shorten", handler.ShortenUrl)
	r.GET("/:code", handler.RedirectURL)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
