import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		// Base URL for your application
		baseUrl: "http://localhost:3000",

		// Specify the location of your spec files
		specPattern: "cypress/integration/**/*.spec.ts",

		// Support file (commands, setup)
		supportFile: "cypress/support/e2e.ts",

		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
