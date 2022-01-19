package storage

import "github.com/kotrzina/lesempolem/backend/pkg/race"

// Storage is thread safe storage library for competition data
type Storage interface {
	Save(competition *race.Competition) error
	Load() (*race.Competition, error)
}
