package main

import (
	"github.com/daniloreilly/encurtador-links/backend/handler"
	"github.com/gin-gonic/gin"
)

func main() {
	ConnectDatabase()

	r := gin.Default()

	r.POST("/shorten", handler.ShortenUrl)
	r.GET("/:code", handler.RedirectURL)

	r.Run(":8080")
}
