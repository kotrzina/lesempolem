package race

import "time"

type Lap struct {
	Lap      int
	Time     string
	Diff     string
	Position int
	LapTime  int
}

type Racer struct {
	Sn            string // starting number
	FirstName     string
	LastName      string
	Gender        Gender
	Born          time.Time
	Club          string
	Categories    []Category
	Race          Race
	Place         int
	CategoryPlace int
	Laps          []Lap
	Dnf           bool
	Dns           bool
}
