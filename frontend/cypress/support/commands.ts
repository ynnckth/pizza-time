/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import TypeOptions = Cypress.TypeOptions;

Cypress.Commands.add('getByTestId', (testId: string, options?: Partial<TypeOptions>) => {
  cy.get(`[data-testid="${testId}"]`, options);
});
