package main

import (
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

	r.Run(":8080")
}
