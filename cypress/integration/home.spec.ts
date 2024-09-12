import { App } from "cypress/locators/locators";

describe("Books Page", () => {
	beforeEach(() => {
		// Intercept the API call to the books endpoint
		cy.intercept("GET", "**/users/5a8411b53ed02c04187ff02a/shelves*").as(
			"getShelves"
		);
		cy.intercept("GET", "**/forms/*").as("getBooks");
		cy.visit("/");
	});

	it("should display the header", () => {
		cy.getByTestId(App.header).contains("Bookshelf App");
	});

	it("should display a list of shelves", () => {
		cy.wait("@getShelves").its("response.statusCode").should("equal", 200);
		cy.get("aside").should("be.visible");
	});

	it("should navigate to a shelf and display books", () => {
		cy.wait("@getShelves").its("response.statusCode").should("equal", 200);
		cy.get("aside").should("be.visible");
		cy.getByTestId(App.shelvesList).should("be.visible");
		cy.getByTestId(App.shelvesList).should("have.length.greaterThan", 0);
		// Click on the first shelf
		cy.get("aside").find("li").first().click();

		// Wait for the API request to complete before making assertions
		cy.wait("@getBooks").its("response.statusCode").should("equal", 200);

		// Verify books are displayed in the shelf
		cy.getByTestId(App.bookList).should("be.visible");
		cy.getByTestId(App.bookList).should("have.length.greaterThan", 0);
	});

	it("should paginate through the books", () => {
		cy.wait("@getShelves");
		cy.get("aside").should("be.visible");
		// Click on the first shelf
		cy.get("aside").find("li").first().click();

		// Wait for the initial books request
		cy.wait("@getBooks").its("response.statusCode").should("equal", 200);

		// Click next button for pagination
		cy.getByTestId(App.nextBtn).should("be.visible");
		cy.getByTestId(App.nextBtn).click();

		// Wait for the second page of books
		cy.wait("@getBooks").its("response.statusCode").should("equal", 200);

		// Verify that more books are loaded
		cy.getByTestId(App.bookList).should("have.length.greaterThan", 0);
	});
});
