package handler

import (
	"net/http"

	"github.com/daniloreilly/encurtador-links/backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var DB *gorm.DB

func RedirectURL(c *gin.Context) {
	code := c.Param("code")
	var link models.Link

	// 1. Busca no banco
	if err := DB.Where("short_code = ?", code).First(&link).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Link não encontrado"})
		return
	}

	// 2. Redireciona (O pulo do gato!)
	c.Redirect(http.StatusFound, link.OriginalURL)
}
