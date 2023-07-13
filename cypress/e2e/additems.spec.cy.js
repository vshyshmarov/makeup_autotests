const { baseUrl } = require('../variables/makeup_vars.js');

describe('Добавление товаров в корзину', () => {
  beforeEach(() => {
    // Открываем URL маркетплейса
    cy.visit(baseUrl);
  });

  it('Проверка открытия маркетплейса', () => {
    // Проверяем, что URL соответствует ожидаемому
    cy.url().should('eq', 'https://makeup.com.ua/ua/');
  });

  it('Добавление товаров в корзину', () => {
    // Открываем категорию и подкатегорию, если это необходимо
    cy.get('#popup__window > .popup-close').click();
    cy.get('#menu-toggle').click(); // Замените селекторами на свои
    cy.get(':nth-child(5) > .menu-list__link').click();
    cy.contains('Шампунь від лупи для нормального і жирного волосся').scrollIntoView().should('be.visible').click();
    cy.get('.product-item__button > .button').scrollIntoView().click(); // Добавляем товар в корзину
    cy.get('.popup__window > .popup-close').click();

    // Выбираем другую категорию и добавляем товар из нее
    cy.get('#menu-toggle').click();
    cy.get(':nth-child(9) > .menu-list__link').click();
    cy.contains('Машинка для видалення катишків, GC026/80').scrollIntoView().should('be.visible').click();
    cy.get('.product-item__button > .button').scrollIntoView().click();
    cy.get('.popup__window > .popup-close').click();

    // Проверяем информацию о товарах в корзине
    cy.get('.header-counter').should('have.text', '2');
    cy.get('.header-basket').click();

    // Проверяем правильность расчета цены
    // Находим все товары в корзине
    it('Verify that the price is calculated correctly.', () => {
        // Replace with your price selectors
        const price1 = parseFloat(cy.get('[data-id="783197_0"] > .product-list_product-item > .product__column > .product__price-column > .product__price').text())
        const price2 = parseFloat(cy.get('[data-id="10727_1018027"] > .product-list_product-item > .product__column > .product__price-column > .product__price').text())
        const total = parseFloat(cy.get('.total > span').text())

        expect(total).to.equal(price1 + price2)
    })

    // Проверяем, что кнопка удаления товара кликабельна
    cy.get('[data-id="783197_0"] > .product-list_product-item > .product__column > .product__count-list > .product__button-remove').click();
    cy.get('[data-id="10727_1018027"] > .product-list_product-item > .product__column > .product__count-list > .product__button-remove').click();
  });
});
