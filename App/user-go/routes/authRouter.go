package routes

import (
	"github.com/gin-gonic/gin"
	controller "github.com/nvlannasik/user-services-go/controllers"
)

func AuthRouter(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("v1/user/login", controller.Login())
	incomingRoutes.POST("v1/user/register", controller.Register())
}
