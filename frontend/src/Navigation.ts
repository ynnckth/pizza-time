export enum Page {
  MARKETPLACE = '/marketplace',
  CHECKOUT = '/checkout',
  PAST_ORDERS = '/orders',
}

export const tabIndexToPageMappings: Record<number, Page> = {
  0: Page.MARKETPLACE,
  1: Page.CHECKOUT,
  2: Page.PAST_ORDERS,
};

export const getTabIndexForPage = (page: Page): number => {
  const foundMatchingPageTabIndex = Object.entries(tabIndexToPageMappings).filter((e) => e[1] === page)[0][0];
  return parseInt(foundMatchingPageTabIndex);
};
