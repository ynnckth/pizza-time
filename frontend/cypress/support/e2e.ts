// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string, options?: Partial<TypeOptions>): Chainable<Element>;
      shouldShowInitialMarketplace(): Chainable<Element>;
      addItemsToCart(): Chainable<Element>;
      goToCheckout(expectedNoOfOrderItems: number): Chainable<Element>;
      shouldShowEmptyCheckoutPage(): Chainable<Element>;
      removeFirstItemFromCart(expectedNoOfOrderItemsAfterRemoving: number): Chainable<Element>;
      shouldNotShowAnyFormValidationErrors(): Chainable<Element>;
      shouldShowFormValidationErrors(): Chainable<Element>;
      enterFormValues(firstName: string, lastName: string, email: string): Chainable<Element>;
      placeOrder(): Chainable<Element>;
      shouldShowPastOrdersPage(): Chainable<Element>;

      // Bottom navigation
      clickOnMarketplaceTab(): Chainable<Element>;
      clickOnCheckoutTab(): Chainable<Element>;
      clickOnPastOrdersTab(): Chainable<Element>;

      matchImageSnapshot(fileName: string, options?: any): Chainable<Element>;
    }
  }
}
