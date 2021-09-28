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

function isMultilap(race: Race): boolean {
    return race.laps > 1
}

function isSet(v?: any): boolean {
    return typeof v !== 'undefined' && v !== null
}

export {showCategories, showCategoryPlaces, showClub, isMultilap}