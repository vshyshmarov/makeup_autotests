describe('Order Product', () => {
    it('Search and order a product', () => {
      cy.visit('https://zepill.com/')
  
      // Поиск товара
      cy.get('#headerSearch').type('Mega multi, для жінок').type('{enter}')
  
      // Открытие страницы товара
      cy.get('#products_grid > div > form > div').click()
  
      // Добавление товара в корзину
      cy.get('.mt8 > .btn').click()
      cy.wait(5000)
  
      // Переход в корзину
      cy.get('#shoppingCart').click()
  
      // Оформление товара
      cy.get('.d-xl-none > .btn-primary').click()
  
      // Ввод информации о покупателе и оформление заказа
      cy.get('#div_name > .form-control').type('Test')
      cy.get('#submit-contacts > .form-row > #div_email > .form-control').type('test@test.com')
      cy.get('#submit-contacts > .form-row > #div_mobile > .form-control').type('1111111111')
      cy.get('#submit-contacts > .button-container > .btn').click()
  
      // Выбор способа доставки
      cy.get('#pickup-delivery-tab').click()
      cy.get('#submit-shipping-pickup > .button-container > .btn').click()
  
      // Выбор способа оплаты
      cy.get(':nth-child(4) > label > input').click()
      cy.get('#submit-payment > .button-container > .btn').click()
  
      // Кнопка заказа товара
      cy.get('.d-xl-none > .btn-primary').scrollIntoView().click();
      cy.wait(25000)
      // Распечатать накладную
      cy.get('.print_msg > .btn-sm').click()
  
      cy.wait(30000) // Подождать 30 секунд (распечатка накладной)
    })
  })
  