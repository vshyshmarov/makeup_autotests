describe('Search the item', () => {
  beforeEach(() => {
    cy.visit('ua/');
  });
  it('Marketplace opening check', () => {
    cy.checking_url();
  });
    it('Search random item by name.', () => {
      cy.get('#popup__window > .popup-close').click();
      cy.get('div.search-button').click();
      cy.get('#search-input').type('BOSS');
      cy.get('#search-modal-container > .search-button').click();

      cy.get('.simple-slider-list__name').each(($el) => {
        expect($el).to.contain('BOSS')
      })
    })
  })
  