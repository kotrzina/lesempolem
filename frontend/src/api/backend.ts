const BACKEND_URL: string = "https://lesempolem-backend-460110181987.europe-west1.run.app/lesempolem2026"

/** internal type for frontend application */
export type     Racer = {
    firstname: string;
    lastname: string;
    email: string;
    club: string;
    born: Date;
    gender: 'm' | 'f';
    race: string;
    created?: Date;
}

/** response from backend server */
type ApiItem = {
    id: string;
    created: string;
    payload: {
        firstname: string;
        lastname: string;
        email: string;
        club: string;
        born: string;
        gender: string;
        race: string;
    }
}

/** Creates new racer (API call) */
export async function registerRacer(r: Racer): Promise<void> {
    const res = await fetch(BACKEND_URL, {
        method: "PUT",
        body: JSON.stringify({
            "firstname": r.firstname,
            "lastname": r.lastname,
            "email": r.email,
            "club": r.club,
            "born": formatDateToApi(r.born),
            "gender": r.gender,
            "race": r.race,
        })
    })

    if (res.status !== 204) {
        throw new Error("API ERROR")
    }
}

/** Fetches all registered racers (API call) */
export async function fetchRegisteredRacers(): Promise<Racer[]> {
    const res = await fetch(BACKEND_URL)

    if (res.status !== 200) {
        throw new Error("API ERROR")
    }

    const data: ApiItem[] = await res.json()

    // map api structure to app structure
    return data.map((item) => {
        if (item.payload.gender !== "m" && item.payload.gender !== "f") {
            throw new Error("unknown gender type") // should never happen
        }
        return {
            firstname: item.payload.firstname,
            lastname: item.payload.lastname,
            email: item.payload.email,
            club: item.payload.club,
            born: new Date(item.payload.born),
            gender: item.payload.gender,
            race: item.payload.race,
            created: new Date(item.created),
        }
    })
}

/** Formats date to 2006/01/02 format used by backend */
export function formatDateToApi(date: Date): string {
    const d = date.getDate().toString()
    const m = (date.getMonth() + 1).toString()
    const y = date.getFullYear().toString()

    return y + "/" + m.padStart(2, '0') + "/" + d.padStart(2, '0')
}
