// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
let fs = require('fs');
const path = "src/pages/Result/results"


const files = fs.readdirSync(path);
let merged = []

files.map((file) => {
    if (file.endsWith(".json")) {
        data = require(`./${path}/${file}`)

        merged = [...merged, {
            race: file.slice(0, -5),
            data: data,

        }]
    }
})


fs.writeFileSync('./public/results_merged.json', JSON.stringify(merged))