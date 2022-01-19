package main

import (
	"fmt"
	"github.com/kotrzina/lesempolem/backend/pkg/backend"
	"github.com/kotrzina/lesempolem/backend/pkg/race"
	"gopkg.in/alecthomas/kingpin.v2"
	"os"
	"time"
)

var (
	app = kingpin.New("runWatch", "Stopwatch for running competitions.")

	server         = app.Command("server", "Run application server")
	competitionArg = server.Arg("name", "Name of competition").Required().String()
	yearArg        = server.Arg("year", "Competition year").Default(fmt.Sprintf("%d", time.Now().Year())).Int()
)

func main() {
	switch kingpin.MustParse(app.Parse(os.Args[1:])) {
	case server.FullCommand():
		competition, err := race.CreateOrLoadCompetition(*competitionArg, *yearArg)
		if err != nil {
			panic(err)
		}

		serverApp := backend.NewServerApp(competition)
		serverApp.StartServer()
	}
}
