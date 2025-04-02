Cypress.Commands.add("login", (email, password) => {
    cy.visit("/");
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
Cypress.Commands.add("addToFavorites", (title) => {
    cy.visit("/");
    cy.getCardByTitle(title).contains("Add to favorite").click();
});
Cypress.Commands.add("removeFromFavorites", (title) => {
    cy.visit("/favorites");
    cy.getCardByTitle(title).contains("Delete from favorite").click();
});
Cypress.Commands.add("clearFavorites", (timeout = 2000) => {
    cy.visit("/favorites");
    cy.wait(timeout);
    cy.get("body").then(($body) => {
        // Пришлось через body чтоб не заваливаться на ненайденном элементе
        const buttons = $body.find(".btn-secondary");
        if (buttons.length > 0) {
            cy.wrap(buttons.first()).click();
            cy.clearFavorites();
        }
    });
});
