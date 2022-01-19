package race

import (
	"github.com/stretchr/testify/assert"
	_ "github.com/stretchr/testify/assert"
	"os"
	"testing"
	"time"
)

func TestCategoryIsIn(t *testing.T) {
	type testCase struct {
		name     string
		from     time.Time
		to       time.Time
		when     time.Time
		expected bool
	}

	cases := []testCase{
		{
			name:     "in the middle",
			from:     createTimeFromDateString("2020-06-01"),
			to:       createTimeFromDateString("2020-06-10"),
			when:     createTimeFromDateString("2020-06-05"),
			expected: true,
		},
		{
			name:     "at the beginning",
			from:     createTimeFromDateString("2020-06-02"),
			to:       createTimeFromDateString("2020-06-10"),
			when:     createTimeFromDateString("2020-06-02"),
			expected: true,
		},
		{
			name:     "day before beginning",
			from:     createTimeFromDateString("2020-06-02"),
			to:       createTimeFromDateString("2020-06-10"),
			when:     createTimeFromDateString("2020-06-01"),
			expected: false,
		},
		{
			name:     "at the end",
			from:     createTimeFromDateString("2020-06-02"),
			to:       createTimeFromDateString("2020-06-10"),
			when:     createTimeFromDateString("2020-06-10"),
			expected: true,
		},
		{
			name:     "day after end",
			from:     createTimeFromDateString("2020-06-02"),
			to:       createTimeFromDateString("2020-06-10"),
			when:     createTimeFromDateString("2020-06-11"),
			expected: false,
		},
	}

	for _, testCase := range cases {
		category := Category{
			Key:         "tc",
			Name:        "testing category",
			Description: "",
			Shortcut:    "",
			Gender:      Men,
			From:        testCase.from,
			To:          testCase.to,
		}

		result := category.isInInterval(testCase.when)

		if result != testCase.expected {
			t.Errorf("%q has failed", testCase.name)
		}
	}
}

func TestCategoryManipulation(t *testing.T) {
	c1 := Category{
		Key:         "c1",
		Name:        "testing category 1",
		Description: "",
		Shortcut:    "",
		Gender:      Men,
		From:        createTimeFromDateString("2020-06-02"),
		To:          createTimeFromDateString("2020-06-04"),
	}

	c2 := Category{
		Key:         "c2",
		Name:        "testing category 2",
		Description: "",
		Shortcut:    "",
		Gender:      Men,
		From:        createTimeFromDateString("2020-06-02"),
		To:          createTimeFromDateString("2020-06-04"),
	}

	f, _ := os.Create("xxx")
	c := Competition{
		Name:       "test",
		Year:       2,
		storeFile:  f,
		Categories: []*Category{},
	}

	c.addCategory(&c1)
	assert.Len(t, c.Categories, 1)
	c.addCategory(&c2)
	assert.Len(t, c.Categories, 2)
	c.removeCategory("c1")
	assert.Len(t, c.Categories, 1)
	assert.Equal(t, c2, *c.Categories[0])
}

func createTimeFromDateString(x string) time.Time {
	layout := "2006-01-02"
	t, err := time.Parse(layout, x)
	if err != nil {
		panic(err)
	}

	return t
}
