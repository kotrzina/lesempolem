package backend

import (
	"context"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/kotrzina/lesempolem/backend/pkg/race"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"
)

type ServerApp struct {
	comp *race.Competition
	mtx  sync.RWMutex
}

func NewServerApp(c *race.Competition) *ServerApp {
	return &ServerApp{
		comp: c,
		mtx:  sync.RWMutex{},
	}
}

func (sa *ServerApp) StartServer() {
	router := gin.Default()

	v1 := router.Group("/v1")
	{
		v1.GET("/race", sa.getRaces)
		v1.POST("/race", sa.createRace)

		v1.GET("/category", sa.getCategories)
		v1.POST("/category", sa.createCategory)
	}

	router.GET("/", func(c *gin.Context) {
		time.Sleep(5 * time.Second)
		c.String(http.StatusOK, "Welcome Gin Server")
	})

	srv := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && errors.Is(err, http.ErrServerClosed) {
			log.Printf("listen: %s\n", err)
		}
	}()

	quit := make(chan os.Signal)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exiting")
}
