package config

import (
	"gopkg.in/yaml.v2"
	"io/ioutil"
)

type Configuration struct {
	Name  string `yaml:"name"`
	Year  int    `yaml:"year"`
	Races []struct {
		Key           string `yaml:"key"`
		Title         string `yaml:"title"`
		ExpectedStart string `yaml:"expectedStart"`
		Distance      int    `yaml:"distance"`
		Laps          int    `yaml:"laps"`
	} `yaml:"races"`
	Categories []struct {
		Name        string `yaml:"name"`
		Description string `yaml:"description"`
		Short       string `yaml:"short"`
		Gender      string `yaml:"gender"`
		From        string `yaml:"from"`
		To          string `yaml:"to"`
		Race        string `yaml:"race"`
	} `yaml:"categories"`
}

func FromFile(filename string) (*Configuration, error) {

	content, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	var conf Configuration
	err = yaml.Unmarshal(content, &conf)
	if err != nil {
		return nil, err
	}

	return &conf, nil
}
