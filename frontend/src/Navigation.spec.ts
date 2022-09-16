import { getTabIndexForPage, Page } from './Navigation';

describe('Navigation', () => {
  it.each`
    page                | expectedTabIndex
    ${Page.MARKETPLACE} | ${0}
    ${Page.CHECKOUT}    | ${1}
    ${Page.PAST_ORDERS} | ${2}
  `('should return the matching tab index for a given page', ({ page, expectedTabIndex }) => {
    expect(getTabIndexForPage(page)).toBe(expectedTabIndex);
  });
});
