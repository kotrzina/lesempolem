package backend

import (
	"github.com/gin-gonic/gin"
	"github.com/kotrzina/lesempolem/backend/pkg/race"
	"net/http"
)

func (sa *ServerApp) createRace(c *gin.Context) {
	type input struct {
		Key           string
		Title         string
		Distance      int
		ExpectedStart string
		Laps          int
	}

	var request input
	err := c.BindJSON(&request)
	if err != nil {
		c.JSON(400, err)
	}

	expextedStart, err := parseTimeFromDateString(request.ExpectedStart)
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
	}

	newRace := &race.Race{
		Key:           request.Key,
		Title:         request.Title,
		Start:         nil,
		Done:          false,
		Distance:      request.Distance,
		ExpectedStart: expextedStart,
		Laps:          request.Laps,
		Racers:        []*race.Racer{},
	}

	sa.mtx.Lock()
	defer sa.mtx.Unlock()

	duplicity := false
	for _, r := range sa.comp.Races {
		if r.Key == newRace.Key {
			duplicity = true
		}
	}

	if duplicity {
		c.String(http.StatusConflict, "")
		return
	}

	sa.comp.Races = append(sa.comp.Races, newRace)
	c.Status(http.StatusCreated)
}

func (sa *ServerApp) getRaces(c *gin.Context) {
	type output struct {
		Key           string `json:"key"`
		Title         string `json:"title"`
		Distance      int    `json:"distance"`
		Start         string `json:"start"`
		ExpectedStart string `json:"expected_start"`
		Laps          int    `json:"laps"`
	}

	var data []output

	sa.mtx.RLock()
	defer sa.mtx.RUnlock()

	for _, r := range sa.comp.Races {
		data = append(data, output{
			Key:           r.Key,
			Title:         r.Title,
			Distance:      r.Distance,
			Start:         formatTime(r.Start),
			ExpectedStart: formatTime(&r.ExpectedStart),
			Laps:          r.Laps,
		})
	}

	if len(data) > 0 {
		c.JSON(http.StatusOK, data)
	} else {
		c.JSON(http.StatusOK, []interface{}{})
	}

}
