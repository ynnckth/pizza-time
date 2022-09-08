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
    cy.addItemsToCart();
    cy.goToCheckout(3);
    cy.removeFirstItemFromCart(2);
    cy.shouldNotShowAnyFormValidationErrors();
    cy.getByTestId(TestId.CHECKOUT_PLACE_ORDER_BUTTON).click();
    cy.shouldShowFormValidationErrors();
    cy.enterFormValues('John', 'Doe', 'john.doe@gmail.com');
    cy.shouldNotShowAnyFormValidationErrors();
    cy.placeOrder();
  });
});
