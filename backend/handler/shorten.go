package handler

import (
	"net/http"

	"github.com/daniloreilly/encurtador-links/backend/models"
	"github.com/gin-gonic/gin"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ShortenUrl(c *gin.Context) {
	var input models.ShortenRequest

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	shortCode, err := gonanoid.New(6)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate short URL"})
		return
	}

	newLink := models.Link{
		OriginalURL: input.LongURL,
		ShortURL:    shortCode,
	}

	err = DB.Create(&newLink).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save link"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"original_url": newLink.OriginalURL,
		"short_url":    newLink.ShortURL,
	})

}
