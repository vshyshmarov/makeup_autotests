const { baseUrl } = require('../variables/makeup_vars.js');

describe('Search the item', () => {
    it('Open marketplace url. Verify it.', () => {
      cy.visit(baseUrl)
      cy.url().should('include', 'https://makeup.com.ua/ua/')
    })
  
    it('Search random item by name.', () => {
      cy.visit(baseUrl)
      cy.get('#popup__window > .popup-close').click();
      cy.get('div.search-button').click();
      cy.get('#search-input').type('BOSS');
      cy.get('#search-modal-container > .search-button').click();

      cy.get('.simple-slider-list__name').each(($el) => {
        expect($el).to.contain('BOSS')
      })
    })
  })
  