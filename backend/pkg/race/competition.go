package race

import (
	"fmt"
	"os"
	"strings"
)

type Competition struct {
	Name       string
	Year       int
	storeFile  *os.File
	Races      []*Race
	Categories []*Category
}

func CreateOrLoadCompetition(name string, year int) (*Competition, error) {
	tempDir := os.TempDir()
	storeFile := fmt.Sprintf("%s%s%s", tempDir, string(os.PathSeparator), getStorageFileName(name, year))

	_, err := os.Stat(storeFile)

	var file *os.File
	var fileErr error

	if err == nil {
		file, fileErr = os.Open(storeFile)
	} else if os.IsNotExist(err) {
		file, fileErr = os.Create(storeFile)
	} else {
		fileErr = fmt.Errorf("unknown file error: %w", err)
	}

	if fileErr != nil {
		return nil, fmt.Errorf("could not open/create store file in %q; %w", storeFile, fileErr)
	}

	return &Competition{
		Name:      name,
		Year:      year,
		storeFile: file,
		Races:     []*Race{},
	}, nil
}

func getStorageFileName(name string, year int) string {
	filename := fmt.Sprintf("%s-%d", strings.ToLower(name), year)

	type replacement struct {
		from string
		to   string
	}

	replacements := []replacement{
		{" ", "-"},
		{".", "_"},
		{",", "_"},
		{"/", "_"},
		{"\\", "_"},
	}

	for _, r := range replacements {
		filename = strings.ReplaceAll(filename, r.from, r.to)
	}

	return fmt.Sprintf("%s.json", filename)
}

