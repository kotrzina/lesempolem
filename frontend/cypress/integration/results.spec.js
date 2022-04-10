function testResults(year) {
    cy.visit("/vysledky.html")
    cy.contains(year).click()

    cy.contains("Výsledky závodu v roce " + year)
    cy.contains("Poř.")
    cy.contains("S. číslo")
    cy.contains("Příjmení, Jméno")
    cy.contains("Čas")
    cy.contains("Ztráta")
    cy.contains("km")
}

describe('results tests', () => {
    it("test all result pages", () => {
        const years = [
            2021,
            2019,
            2018,
            2017,
            2016,
            2015,
            2014,
            2013,
        ]

        years.forEach(year => {
            testResults(year)
        })
    })
})