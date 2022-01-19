package race

import "time"

type Race struct {
	Key           string
	Title         string
	Start         *time.Time
	Done          bool
	Distance      int
	ExpectedStart time.Time
	Laps          int
	Racers        []*Racer
}
