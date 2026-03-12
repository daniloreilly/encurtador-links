package models

type ShortenRequest struct {
	LongURL string `json:"url" binding:"required"`
}
