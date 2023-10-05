package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type User struct {
	Id           primitive.ObjectID `bson:"_id"`
	Username     *string            `json:"username" validate:"required,min=6,max=30"`
	Password     *string            `json:"password" validate:"required,min=8,max=1024"`
	Email        *string            `json:"email" validate:"required,email"`
	FirstName    *string            `json:"firstName" validate:"required,min=2,max=30"`
	LastName     *string            `json:"lastName" validate:"required,min=2,max=30"`
	Role         *string            `json:"role" validate:"required,eq=admin|eq=user"`
	Token        *string            `json:"token"`
	RefreshToken *string            `json:"refreshToken"`
	CreatedAt    time.Time          `json:"createdAt"`
	UpdatedAt    time.Time          `json:"updatedAt"`
	UserID       string             `json:"userId"`
}
