describe('Add items to the basket', () => {
  it('Marketplace opening check and price is calculated correctly', () => {
    // Marketplace opening check
    cy.visit('ua/');
    cy.checking_url();

    // Choose category and add a product from it
    cy.get('#menu-toggle').click();
    cy.get(':nth-child(5) > .menu-list__link').click();
    cy.contains('Шампунь від лупи для нормального і жирного волосся').scrollIntoView().should('be.visible').click();
    cy.get('.product-item__button > .button').scrollIntoView().click();
    cy.get('.popup__window > .popup-close').click();

    // Choose another category and add a product from it
    cy.get('#menu-toggle').click();
    cy.get(':nth-child(9) > .menu-list__link').click();
    cy.contains('Машинка для видалення катишків, GC026/80').scrollIntoView().should('be.visible').click();
    cy.get('.product-item__button > .button').scrollIntoView().click();
    cy.get('.popup__window > .popup-close').click();

    // Checking information about the items in the shopping cart
    cy.get('.header-counter').should('have.text', '2');
    cy.get('.header-basket').click();

    // Verify that the price is calculated correctly
    let totalPrice = 0;
    cy.get('.product__price').each(($price_item) => {
      const priceText = $price_item.text().replace(/[^\d.]/g, '');
      const price = parseFloat(priceText);
      totalPrice += price;
    });

    cy.get('.total > span').then(($totalElement) => {
      const displayedTotalText = $totalElement.text().replace(/[^\d.]/g, '');
      const displayedTotal = parseFloat(displayedTotalText);
      expect(totalPrice).to.equal(displayedTotal);
    });

    // Check if each delete button is clickable
    cy.get('.product__button-remove').each(($buttonRemove) => {
      cy.wrap($buttonRemove).should('be.enabled')
    });       
  });
});
