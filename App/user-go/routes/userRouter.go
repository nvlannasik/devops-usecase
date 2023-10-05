package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/nvlannasik/user-services-go/controllers"
	"github.com/nvlannasik/user-services-go/middleware"
)

func UserRouter(incomingRoutes *gin.Engine) {
	incomingRoutes.Use(middleware.Authenticate())
	incomingRoutes.GET("v1/users", controller.GetUser())
	incomingRoutes.GET("v1/users/:id", controller.GetUserByID())
}
