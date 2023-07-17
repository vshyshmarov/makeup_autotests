describe('Add items to the basket', () => {
  beforeEach(() => {

    cy.visit('ua/');
  });
  it('Marketplace opening check', () => {
    cy.checking_url();
  });
  it('Add items to the basket', () => {
    // Choose category and add a product from it
    cy.get('#popup__window > .popup-close').click();
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

    // Checking the correctness of the price calculation
    it('Verify that the price is calculated correctly.', () => {
        const price1 = parseFloat(cy.get('[data-id="783197_0"] > .product-list_product-item > .product__column > .product__price-column > .product__price').text())
        const price2 = parseFloat(cy.get('[data-id="10727_1018027"] > .product-list_product-item > .product__column > .product__price-column > .product__price').text())
        const total = parseFloat(cy.get('.total > span').text())

        expect(total).to.equal(price1 + price2)
    })

    // Check if the delete button is clickable
    cy.get('[data-id="783197_0"] > .product-list_product-item > .product__column > .product__count-list > .product__button-remove').click();
    cy.get('[data-id="10727_1018027"] > .product-list_product-item > .product__column > .product__count-list > .product__button-remove').click();
  });
});
