package storage

import (
	"encoding/json"
	"github.com/kotrzina/lesempolem/backend/pkg/race"
	"io/ioutil"
	"os"
	"sync"
)

type fileStorage struct {
	mutex    sync.Mutex
	filePath string
}

func NewFileStorage(filePath string) (*fileStorage, error) {
	_, err := ioutil.ReadFile(filePath)
	if err != nil {
		// no data available - file does not exist
		file, err := os.Create(filePath)
		if err != nil {
			return nil, err
		}
		err = file.Close()
		if err != nil {
			return nil, err
		}

		// todo: load basic structures from configuration file
	}

	return &fileStorage{
		mutex:    sync.Mutex{},
		filePath: filePath,
	}, nil
}

func (fs *fileStorage) Save(competition *race.Competition) error {
	fs.mutex.Lock()
	defer fs.mutex.Unlock()

	data, err := json.Marshal(competition)
	if err != nil {
		return err
	}

	err = ioutil.WriteFile(fs.filePath, data, os.ModePerm)
	if err != nil {
		return err
	}

	return nil
}

func (fs *fileStorage) Load() (*race.Competition, error) {
	fs.mutex.Lock()
	defer fs.mutex.Unlock()

	content, err := ioutil.ReadFile(fs.filePath)
	if err != nil {
		return nil, err
	}

	var comp race.Competition
	err = json.Unmarshal(content, &comp)
	if err != nil {
		return nil, err
	}

	return &comp, nil
}
