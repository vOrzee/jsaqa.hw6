Cypress.Commands.add("login", (email, password) => {
    cy.contains("Log in").click();
    if (email) {
        cy.get("#mail").type(email);
    }
    if (password) {
        cy.get("#pass").type(password);
    }
    cy.contains("Submit").click();
});
Cypress.Commands.add("logout", () => {
    cy.contains("Log out").click();
});
Cypress.Commands.add("addBook", (title, authors) => {
    cy.contains("Add new").click();
    cy.get("#title").type(title);
    cy.get("#authors").type(authors);
    cy.contains("Submit").click();
});
Cypress.Commands.add("getCardByTitle", (title) => {
    return cy.contains(".card-title", title).closest(".card");
});
Cypress.Commands.add("clearFavorites", (timeout = 2000) => {
    cy.visit("/favorites");
    cy.wait(timeout);
    const deleteBook = () => {
        cy.get("body").then(($body) => {
            const buttons = $body.find(".btn-secondary");
            if (buttons.length > 0) {
                cy.wait(timeout);
                cy.wrap(buttons.first()).click();
                deleteBook();
            }
        });
    };
    deleteBook();
});
