import { TestId } from '../../src/testUtils/TestId';

describe('Place order', () => {
  beforeEach(() => {
    cy.visit('/');
    // TODO: mock network requests
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
