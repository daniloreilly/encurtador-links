package handler

import (
	"net/http"

	"github.com/daniloreilly/encurtador-links/backend/models"
	"github.com/gin-gonic/gin"
)

func RedirectURL(c *gin.Context) {
	code := c.Param("code")
	var link models.Link

	if err := DB.Where("short_code = ?", code).First(&link).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Link não encontrado"})
		return
	}

	c.Redirect(http.StatusFound, link.OriginalURL)
}
