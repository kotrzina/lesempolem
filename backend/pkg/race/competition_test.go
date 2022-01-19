package race

import (
	"testing"
)

func TestGetStorageFileName(t *testing.T) {
	type testCase struct {
		name     string
		year     int
		expected string
	}

	cases := []testCase{
		{"Lesempolem", 2022, "lesempolem-2022.json"},
		{"abc", 2000, "abc-2000.json"},
		{"a/b", 2004, "a_b-2004.json"},
	}

	for _, c := range cases {
		result := getStorageFileName(c.name, c.year)
		if result != c.expected {
			t.Errorf("wrong storage file name %q", c.expected)
		}
	}
}
