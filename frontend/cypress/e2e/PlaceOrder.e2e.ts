import { TestId } from '../../src/testUtils/TestId';

describe('Place order', () => {
  beforeEach(() => {
    if (Cypress.env('stubbedNetworkRequests')) {
      cy.intercept('GET', '**/api/pizzas', { fixture: 'getPizzas.json' });
      cy.intercept('POST', '**/api/orders', { fixture: 'postOrder.json' });
      cy.intercept('GET', '**/api/orders', { fixture: 'getOrders.json' });
    }

    cy.visit('/');
    cy.getByTestId(TestId.APP_TITLE).should('be.visible');
    cy.shouldShowInitialMarketplace();
  });

  it('should add and remove items from order and place order', () => {
    const initialNumberOfOrderItems = 3;

    cy.addItemsToCart();
    cy.goToCheckout(initialNumberOfOrderItems);
    cy.removeFirstItemFromCart(initialNumberOfOrderItems - 1);
    cy.shouldNotShowAnyFormValidationErrors();
    cy.getByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON).click();
    cy.shouldShowFormValidationErrors();
    cy.enterFormValues('Cypress_John', 'Cypress_Doe', 'john.doe@cypress.com');
    cy.shouldNotShowAnyFormValidationErrors();
    cy.placeOrder();
  });
});
