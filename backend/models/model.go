package main

import (
	"time"

	"gorm.io/gorm"
)

type Link struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	OriginalURL string         `gorm:"not null" json:"original_url"`
	ShortURL    string         `gorm:"not null;unique" json:"short_url"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}
