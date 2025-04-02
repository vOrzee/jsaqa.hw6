describe("Лекционные тесты", () => {
    // Первый лекционный тест
    it("Should successfully login", () => {
        cy.visit("/");
        cy.login("test@test.com", "test");
        cy.contains("Добро пожаловать test@test.com").should("be.visible");
    });
    // Второй лекционный тест
    it("Should not login with empty login", () => {
        cy.visit("/");
        cy.login("", "test");
        cy.get("#mail")
            .then(($el) => $el[0].checkValidity())
            .should("be.false");
    });
    // Третий лекционный тест
    it("Should not login with empty password", () => {
        cy.visit("/");
        cy.login("test@test.com", "");
        cy.get("#pass")
            .then(($el) => $el[0].checkValidity())
            .should("be.false");
    });
});

it.skip("Добавление книг в библиотеку", () => {
    const classicBooks = [
        {
            title: "Преступление и наказание",
            authors: "Фёдор Достоевский",
        },
        {
            title: "Война и мир",
            authors: "Лев Толстой",
        },
        {
            title: "Мастер и Маргарита",
            authors: "Михаил Булгаков",
        },
    ];

    cy.visit("/");
    cy.login("test@test.com", "test");
    classicBooks.forEach(({ title, authors }) => cy.addBook(title, authors));
});

describe.only("Домашнее задание", () => {
    beforeEach(() => {
        cy.login("test@test.com", "test");
        cy.clearFavorites();
    });
    afterEach(() => {
        cy.logout();
    });

    it("Добавление книги в избранное", () => {
        const title = "Война и мир";
        cy.addToFavorites(title);
        cy.visit("/favorites");
        cy.getCardByTitle(title)
            .find(".btn-secondary")
            .should("have.text", "Delete from favorite");
    });

    it("Удаление книги из избранного", () => {
        const title = "Война и мир";
        cy.addToFavorites(title);
        cy.removeFromFavorites(title);
        cy.visit("/");
        cy.getCardByTitle(title)
            .find(".btn-success")
            .should("have.text", "Add to favorite");
    });

    it("Проверка текста по эндпоинту при пустом избранном", () => {
        cy.visit("/favorites");
        cy.get(".text-info").should(
            "have.text",
            "Please add some book to favorit on home page!",
        );
    });
});
