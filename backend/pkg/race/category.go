package race

import "time"

type CategoryType string

type Category struct {
	Key         string
	Name        string
	Description string
	Shortcut    string
	Gender      Gender
	From        time.Time
	To          time.Time
	Race        Race
}

// the only important thing is date - hours, minutes and seconds are ignored
func (c Category) isInInterval(input time.Time) bool {
	return input.After(c.From.Add(-24*time.Hour)) && input.Before(c.To.Add(24*time.Hour))
}

func (c *Competition) addCategory(category *Category) {
	c.Categories = append(c.Categories, category)
}

func (c *Competition) removeCategory(key string) {
	index := 0
	for k, v := range c.Categories {
		if v.Key == key {
			index = k
		}
	}

	c.Categories = append(c.Categories[:index], c.Categories[index+1:]...)
}
