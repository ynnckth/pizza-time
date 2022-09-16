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
import { TestId } from '../../src/testUtils/TestId';

Cypress.Commands.add('getByTestId', (testId: string, options?: Partial<TypeOptions>) => {
  cy.get(`[data-testid="${testId}"]`, options);
});

Cypress.Commands.add('shouldShowInitialMarketplace', () => {
  cy.getByTestId(TestId.MARKETPLACE_PIZZA_CARD).should('have.length.greaterThan', 1);
  cy.getByTestId(TestId.MARKETPLACE_CART_BUTTON).should('be.visible');
  cy.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS).should('not.exist');
});

Cypress.Commands.add('addItemsToCart', () => {
  cy.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART).first().click();
  cy.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS).should('have.text', 1);
  cy.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART).eq(1).click();
  cy.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS).should('have.text', 2);
  cy.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART).eq(1).click();
  cy.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS).should('have.text', 3);
});

Cypress.Commands.add('goToCheckout', (expectedNoOfOrderItems: number) => {
  cy.getByTestId(TestId.MARKETPLACE_CART_BUTTON).click();
  cy.url().should('include', '/checkout');
  cy.getByTestId(TestId.LOADING_SPINNER).should('not.exist');
  cy.getByTestId(TestId.MARKETPLACE_PIZZA_CARD).should('not.exist');
  cy.getByTestId(TestId.MARKETPLACE_CART_BUTTON).should('not.exist');
  cy.getByTestId(TestId.CHECKOUT_EMPTY_CART_MESSAGE).should('not.exist');
  cy.getByTestId(TestId.CHECKOUT_ORDER_ITEM).should('have.length', expectedNoOfOrderItems);
});

Cypress.Commands.add('shouldShowEmptyCheckoutPage', () => {
  cy.url().should('include', '/checkout');
  cy.getByTestId(TestId.LOADING_SPINNER).should('not.exist');
  cy.getByTestId(TestId.MARKETPLACE_PIZZA_CARD).should('not.exist');
  cy.getByTestId(TestId.MARKETPLACE_CART_BUTTON).should('not.exist');
  cy.getByTestId(TestId.CHECKOUT_ORDER_ITEM).should('not.exist');
  cy.getByTestId(TestId.CHECKOUT_EMPTY_CART_MESSAGE).should('be.visible');
});

Cypress.Commands.add('removeFirstItemFromCart', (expectedNoOfOrderItemsAfterRemoving: number) => {
  cy.getByTestId(TestId.CHECKOUT_ORDER_ITEM)
    .first()
    .within(() => cy.getByTestId(TestId.CHECKOUT_REMOVE_ORDER_ITEM).click());
  cy.getByTestId(TestId.CHECKOUT_ORDER_ITEM).should('have.length', expectedNoOfOrderItemsAfterRemoving);
});

Cypress.Commands.add('shouldNotShowAnyFormValidationErrors', () => {
  cy.get('#firstName-helper-text').should('not.exist');
  cy.get('#lastName-helper-text').should('not.exist');
  cy.get('#email-helper-text').should('not.exist');
});

Cypress.Commands.add('shouldShowFormValidationErrors', () => {
  cy.get('#firstName-helper-text').should('be.visible');
  cy.get('#lastName-helper-text').should('be.visible');
  cy.get('#email-helper-text').should('be.visible');
});

Cypress.Commands.add('enterFormValues', (firstName: string, lastName: string, email: string) => {
  cy.getByTestId(TestId.CHECKOUT_FORM_FIRST_NAME).type(firstName);
  cy.getByTestId(TestId.CHECKOUT_FORM_LAST_NAME).type(lastName);
  cy.getByTestId(TestId.CHECKOUT_FORM_EMAIL).type(email);
});

Cypress.Commands.add('placeOrder', () => {
  cy.getByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON).click();
  cy.get('.Toastify').contains('Successfully placed order');
  cy.shouldShowPastOrdersPage();
});

Cypress.Commands.add('shouldShowPastOrdersPage', () => {
  cy.url().should('include', '/orders');
  cy.getByTestId(TestId.PAST_ORDERS_NO_ORDERS_MESSAGE).should('not.exist');
  cy.getByTestId(TestId.PAST_ORDERS_ORDER).should('have.length.greaterThan', 1);
});

Cypress.Commands.add('clickOnMarketplaceTab', () => {
  cy.getByTestId(TestId.BOTTOM_NAVIGATION_MARKETPLACE).click();
});

Cypress.Commands.add('clickOnCheckoutTab', () => {
  cy.getByTestId(TestId.BOTTOM_NAVIGATION_CHECKOUT).click();
});

Cypress.Commands.add('clickOnPastOrdersTab', () => {
  cy.getByTestId(TestId.BOTTOM_NAVIGATION_PAST_ORDERS).click();
});
