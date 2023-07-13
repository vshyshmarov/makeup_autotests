const { baseUrl } = require('../variables/makeup_vars.js');
let priceText;

describe('Ценовой фильтр', () => {
  it('Проверка ценового фильтра', () => {
    cy.visit(baseUrl);
    cy.get('#popup__window > .popup-close').click();
    cy.get('#menu-toggle').click();
    cy.get(':nth-child(3) > .menu-list__link').click(); // Открытие категории и подкатегории
    cy.get('[data-id="parameters"]').click(); 
    cy.get(':nth-child(7) > .catalog-filter-name').scrollIntoView().click();
    cy.get('#input-checkbox-2259-22447').scrollIntoView().click();
    cy.get(':nth-child(15) > .catalog-filter-name').scrollIntoView().click();
    cy.get('#input-checkbox-15725-233805').scrollIntoView().click();
    cy.get(':nth-child(18) > .catalog-filter-name').scrollIntoView().click().then(() => {
      cy.get('#catalog-price-dia-_1 > label').scrollIntoView().click();
      cy.get('.submit').click().then(() => { // Применение фильтров
      cy.wait(20000)
        // Проверка сортировки по цене
        cy.get('[data-id="416959"][data-touch-event="product_select"] > .simple-slider-list__link > .info-product-wrapper > .simple-slider-list__bottom > .simple-slider-list__price_container').should('be.visible')
          .each(($price_item) => {
            priceText = $price_item.text(); // Получить текстовое значение цены
            const price = parseFloat(priceText); // Преобразовать в число
            expect(price).to.be.gte(0); // Проверить, что цена больше или равна 0
            expect(price).to.be.lte(50); // Проверить, что цена меньше или равна 50
          });
      });
    });
  });
});
