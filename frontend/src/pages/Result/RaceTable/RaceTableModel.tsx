import {Race} from "../Results";

function showCategories(race: Race): boolean {
    if (race.results.length > 0) {
        if (isSet(race.results[0].category)) {
            return true
        }
    }

    return false
}

function showCategoryPlaces(race: Race): boolean {
    if (race.results.length > 0) {
        if (isSet(race.results[0].category_place)) {
            return true
        }
    }

    return false
}

function showClub(race: Race): boolean {
    if (race.results.length > 0) {
        if (isSet(race.results[0].club)) {
            return true
        }
    }

    return false
}

function showDiscipline(race: Race): boolean {
    return race.results.some(r => isSet(r.discipline))
}

function isMultilap(race: Race): boolean {
    return race.laps > 1
}

function isSet(v?: string | number | undefined): boolean {
    return typeof v !== 'undefined' && v !== null
}

export {showCategories, showCategoryPlaces, showClub, showDiscipline, isMultilap}
