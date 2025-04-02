/* eslint-disable no-unused-vars */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {},
        viewportWidth: 360,
        viewportHeight: 800,
        retries: 2,
        baseUrl: "http://localhost:3000",
    },
});
/* eslint-enable no-unused-vars */
