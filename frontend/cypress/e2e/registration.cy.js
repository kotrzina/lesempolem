describe('registration tests', () => {
    it("invalid name", () => {
        cy.visit("/registrace.html")
        fillValidData()

        cy.get("input#name").clear()
        submitForm()
        testInvalid(["name"])
    })

    it("invalid surname", () => {
        cy.visit("/registrace.html")
        fillValidData()

        cy.get("input#surname").clear()
        submitForm()
        testInvalid(["surname"])
    })

    it("invalid name and surname", () => {
        cy.visit("/registrace.html")
        fillValidData()

        cy.get("input#name").clear()
        cy.get("input#surname").clear()
        submitForm()
        testInvalid(["name", "surname"])
    })

    it("invalid email", () => {
        cy.visit("/registrace.html")
        fillValidData()

        cy.get("input#email").clear().type("thisisinvalidemailaddress")
        submitForm()
        testInvalid(["email"])
    })

    it("invalid club", () => {
        cy.visit("/registrace.html")
        fillValidData()

        cy.get("input#club").clear()
        submitForm()
        testInvalid(["club"])
    })

    it("invalid club", () => {
        cy.visit("/registrace.html")
        fillValidData()

        cy.get("input#dob").clear()
        submitForm()
        testInvalid(["dob"])
    })

    it("empty fields (spaces)", () => {
        cy.visit("/registrace.html")
        fillValidData()

        cy.get("input#name").clear().type("    ")
        cy.get("input#surname").clear().type("    ")
        cy.get("input#club").clear().type("    ")
        submitForm()
        testInvalid(["name", "surname", "club"])
    })

    it("Valid registration", () => {
        cy.visit("/registrace.html")
        fillValidData()

        const name = randomString(10)
        const surname = randomString(15)
        const club = randomString(20)

        cy.get("input#name").clear().type(name)
        cy.get("input#surname").clear().type(surname)
        cy.get("input#club").clear().type(club)
        submitForm()
        
        cy.contains(`${name} ${surname} zaregistrován(a)`)
        cy.contains(" Budeme se těšit!") // flash message
    })
})

function fillValidData() {
    cy.get("input#name").type("John")
    cy.get("input#surname").type("Doe")
    cy.get("input#email").type("john@doe.com")
    cy.get("input#club").type("New York City")
    cy.get("input#dob").type("1978-04-23")
    cy.get("select#gender").select("f")
    cy.get("select#race").select("42km")
}

function testInvalid(invalidFields) {
    const fields = ["name", "surname", "email", "club", "dob"]
    const validFields = fields.filter((f) => {
        return !invalidFields.includes(f)
    })

    invalidFields.forEach(f => {
        cy.get("input#" + f).should("have.class", "is-invalid")
    })

    validFields.forEach(f => {
        cy.get("input#" + f).should("not.have.class", "is-invalid")
    })
}

function submitForm() {
    cy.get("button").contains("Provést registraci").click()
}

/**
 * @source https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
