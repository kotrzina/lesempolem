function testMenuExists() {
    cy.get('.navbar-nav').contains("Lesempolem")
    cy.get('.navbar-nav').contains("Registrace")
    cy.get('.navbar-nav').contains("Informace")
    cy.get('.navbar-nav').contains("Výsledky")
    cy.get('.navbar-nav').contains("Video")
    cy.get('.navbar-nav').contains("Trať")
    cy.get('.navbar-nav').contains("Kontakty")


}

describe('navigation test', () => {
    it("go through menu items", () => {
        cy.visit("/")

        // Registration
        cy.get('.navbar-nav').contains("Registrace").click()
        cy.contains("rozklikni")
        testMenuExists()

        // Info
        cy.get('.navbar-nav').contains("Informace").click()
        cy.contains("Propozice")
        testMenuExists()

        // Results
        cy.get('.navbar-nav').contains("Výsledky").click()
        cy.contains("2013")
        testMenuExists()

        // Video
        cy.get('.navbar-nav').contains("Video").click()
        cy.contains("video")
        testMenuExists()

        // Track
        cy.get('.navbar-nav').contains("Trať").click()
        cy.get("h1").contains("Trať")
        testMenuExists()

        // Track
        cy.get('.navbar-nav').contains("Kontakty").click()
        cy.contains("Mapka")
        testMenuExists()

        // Home
        cy.get('.navbar-nav').contains("Lesempolem").click()
        cy.contains("Lesempolem")
        testMenuExists()
    })
})
