describe('Price filter', () => {
  beforeEach(() => {
    cy.visit('ua/');
  });
  it('Marketplace opening check', () => {
    cy.checking_url();
  });
  it('Checking the price filter', () => {
    cy.get('#popup__window > .popup-close').click();
    cy.get('#menu-toggle').click();
    cy.get(':nth-child(3) > .menu-list__link').click();
    cy.get('[data-id="parameters"]').click(); 
    cy.get(':nth-child(7) > .catalog-filter-name').scrollIntoView().click();
    cy.get('#input-checkbox-2259-22447').scrollIntoView().click();
    cy.get(':nth-child(15) > .catalog-filter-name').scrollIntoView().click();
    cy.get('#input-checkbox-15725-233805').scrollIntoView().click();
    cy.get(':nth-child(18) > .catalog-filter-name').scrollIntoView().click();
    cy.get('#catalog-price-dia-_1 > label').scrollIntoView().click();
    cy.get('.submit').click();
    cy.wait(20000) 
    cy.get('.simple-slider-list__price').each(($price_item) => {
      let priceText = $price_item.text().replace(/[^\d.]/g, ''); 
      const price = parseFloat(priceText); 
      expect(price).to.be.gte(0); 
      expect(price).to.be.lte(50);
    });
  });
});
