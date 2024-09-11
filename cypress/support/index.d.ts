// Extend the Cypress Chainable interface to include the restoreData command

declare namespace Cypress {
	interface Chainable<Subject = any> {
		getByTestId(
			testId: string,
			options?: Partial<
				Cypress.Loggable &
					Cypress.Timeoutable &
					Cypress.Withinable &
					Cypress.Shadow
			>
		): Chainable<Element | Element[]>;
	}
}
