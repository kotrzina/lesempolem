import fs from "fs"

const f = fs.readFileSync('./2014.json', 'utf8')
let c = JSON.parse(f)

function formatPosition(v) {
    let x = parseInt(v)

    if (v > 0)
        return x

    return null
}

c.races.forEach(race => {


    race.results.forEach(result => {
        let prev = null;
        result.laps.forEach(lap => {

        })

    })

})

const outputJson = JSON.stringify(c, null, 2).split('},{').join('}, {')
fs.writeFileSync('./output.json', outputJson, 'utf8')