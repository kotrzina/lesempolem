import fs from "fs"

const filename = './2025.json'

const f = fs.readFileSync(filename, 'utf8')
let c = JSON.parse(f)

function formatPosition(v) {
    let x = parseInt(v)

    if (v > 0)
        return x

    return null
}

function formatTimeNumber(v) {
    return ("0" + v).slice(-2)
}

function getTime(v) {
    const re = '(\\d{1,2}):(\\d{1,2}):(\\d{1,2})'
    const thisRegex = new RegExp(re);
    const matches = thisRegex.exec(v);
    if (matches) {
        return (parseInt(matches[1]) * 60 * 60) + (parseInt(matches[2]) * 60) + (parseInt(matches[3]));
    }

    return 0;
}

function toTime(r) {
    const h = Math.floor(r / 60 / 60)
    const m = Math.floor((r - (h * 60 * 60)) / 60)
    const s = Math.floor(r - (h * 60 * 60) - (m * 60))

    return formatTimeNumber(h) + ":" + formatTimeNumber(m) + ":" + formatTimeNumber(s)
}

function makeBeautiful(v) {
    const r = getTime(v)

    const h = Math.floor(r / 60 / 60)
    const m = Math.floor((r - (h * 60 * 60)) / 60)
    const s = Math.floor(r - (h * 60 * 60) - (m * 60))

    let str = []
    if (h > 0) {
        str.push(h + "h")
    }
    if (m > 0) {
        str.push(m + "m")
    }
    if (s > 0) {
        str.push(s + "s")
    }

    return str.join(" ")
}




c.races[0].results.forEach(result => {
    result.laps.forEach(lap => {
        lap.diff = "+ " + makeBeautiful(lap.diff)
    })
})

c.races[1].results.forEach(result => {
    result.laps.forEach(lap => {
        lap.diff = "+ " + makeBeautiful(lap.diff)
    })
})

c.races[2].results.forEach(result => {
    result.laps.forEach(lap => {
        lap.diff = "+ " + makeBeautiful(lap.diff)
    })
})




const outputJson = JSON.stringify(c, null, 2).split('},{').join('}, {')
// console.log(outputJson)
fs.writeFileSync(filename, outputJson, 'utf8')
