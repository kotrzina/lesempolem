describe('homepage tests', () => {
    it("test homepage", () => {
        cy.visit("/")

        // web
        cy.contains("REGISTRACE")

        // mobile
        cy.contains("Běžecké závody LESEMPOLEM")
        cy.contains("Fotky ze závodu")
    })
})