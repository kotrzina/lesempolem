package backend

import (
	"fmt"
	"time"
)

const timeLayout = "2006-01-02 15:04:05"

func parseTimeFromDateString(x string) (time.Time, error) {
	t, err := time.Parse(timeLayout, x)
	if err != nil {
		return time.Time{}, fmt.Errorf("could not parse datetime: %w", err)
	}

	return t, nil
}

func formatTime(t *time.Time) string {
	if t == nil {
		return ""
	}

	return t.Format(timeLayout)
}
