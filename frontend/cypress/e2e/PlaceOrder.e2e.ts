import { TestId } from '../../src/testUtils/TestId';

describe('Place order', () => {
  beforeEach(() => {
    cy.visit('/');
    // TODO: mock network requests
    cy.getByTestId(TestId.APP_TITLE).should('be.visible');
    cy.getByTestId(TestId.MARKETPLACE_PIZZA_CARD).should('have.length.greaterThan', 1);
    cy.getByTestId(TestId.MARKETPLACE_CART_BUTTON).should('be.visible');
    cy.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS).should('have.text', 0);
  });

  it('should add and remove items from order and place order', () => {
    cy.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART).first().click();
    cy.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS).should('have.text', 1);
    cy.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART).eq(1).click();
    cy.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS).should('have.text', 2);
    cy.getByTestId(TestId.MARKETPLACE_ADD_PIZZA_TO_CART).eq(1).click();
    cy.getByTestId(TestId.MARKETPLACE_NO_OF_ORDER_ITEMS).should('have.text', 3);
    cy.getByTestId(TestId.MARKETPLACE_CART_BUTTON).click();

    cy.url().should('include', '/checkout');
    cy.getByTestId(TestId.LOADING_SPINNER).should('not.exist');
    cy.getByTestId(TestId.MARKETPLACE_PIZZA_CARD).should('not.exist');
    cy.getByTestId(TestId.MARKETPLACE_CART_BUTTON).should('not.exist');
    cy.getByTestId(TestId.CHECKOUT_ORDER_ITEM).should('have.length', 3);

    cy.getByTestId(TestId.CHECKOUT_ORDER_ITEM)
      .first()
      .within(() => cy.getByTestId(TestId.CHECKOUT_REMOVE_ORDER_ITEM).click());
    cy.getByTestId(TestId.CHECKOUT_ORDER_ITEM).should('have.length', 2);

    cy.get('#firstName-helper-text').should('not.exist');
    cy.get('#lastName-helper-text').should('not.exist');
    cy.get('#email-helper-text').should('not.exist');

    cy.getByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON).click();
    cy.get('#firstName-helper-text').should('be.visible');
    cy.get('#lastName-helper-text').should('be.visible');
    cy.get('#email-helper-text').should('be.visible');

    cy.getByTestId(TestId.CHECKOUT_FORM_FIRST_NAME).type('John');
    cy.getByTestId(TestId.CHECKOUT_FORM_LAST_NAME).type('Doe');
    cy.getByTestId(TestId.CHECKOUT_FORM_EMAIL).type('john.doe@gmail.com');
    cy.get('#firstName-helper-text').should('not.exist');
    cy.get('#lastName-helper-text').should('not.exist');
    cy.get('#email-helper-text').should('not.exist');
    cy.getByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON).click();

    cy.get('.Toastify').contains('Successfully placed order');
    cy.url().should('include', '/orders');
    cy.getByTestId(TestId.PAST_ORDERS_NO_ORDERS_MESSAGE).should('not.exist');
    cy.getByTestId(TestId.PAST_ORDERS_ORDER).should('have.length.greaterThan', 1);
  });
});
