describe('info tests', () => {
    it("information page elements", () => {
        cy.visit("/informace.html")

        cy.contains("Informace pro účastníky")
        cy.contains("Kategorie a harmonogram")
        cy.contains("Propozice")
        cy.contains("Startovné")
        cy.contains("Popis tratě")
        cy.contains("LESEMPOLEM")
    })
})