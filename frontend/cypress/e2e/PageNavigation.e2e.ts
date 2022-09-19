import { TestId } from '../../src/testUtils/TestId';

describe('Page navigation', () => {
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

  it('should navigate to marketplace, checkout and past orders and match image snapshots', () => {
    cy.clickOnCheckoutTab();
    cy.shouldShowEmptyCheckoutPage();
    if (Cypress.env('withVisualRegression')) cy.matchImageSnapshot('CheckoutPage');

    cy.clickOnMarketplaceTab();
    cy.shouldShowInitialMarketplace();
    if (Cypress.env('withVisualRegression')) cy.matchImageSnapshot('MarketplacePage');

    cy.clickOnPastOrdersTab();
    cy.shouldShowPastOrdersPage();
    if (Cypress.env('withVisualRegression')) cy.matchImageSnapshot('PastOrdersPage');
  });
});
