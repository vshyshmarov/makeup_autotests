describe('Order Product', () => {
    it('Search and order a product', () => {
      cy.visit('https://zepill.com/')
  
      // Product search
      cy.get('#headerSearch').type('Mega multi, для жінок').type('{enter}')
  
      // Opening the product page
      cy.get('#products_grid > div > form > div').click()
  
      // Adding an item to the cart
      cy.get('.mt8 > .btn').click()
      cy.wait(5000)
  
      // Go to cart
      cy.get('#shoppingCart').click()
  
      // Product clearance
      cy.get('.d-xl-none > .btn-primary').click()
  
      // Entering customer information and placing an order
      cy.get('#div_name > .form-control').type('Test')
      cy.get('#submit-contacts > .form-row > #div_email > .form-control').type('test@test.com')
      cy.get('#submit-contacts > .form-row > #div_mobile > .form-control').type('1111111111')
      cy.get('#submit-contacts > .button-container > .btn').click()
  
      // Choice of delivery method
      cy.get('#pickup-delivery-tab').click()
      cy.get('#submit-shipping-pickup > .button-container > .btn').click()
  
      // Choosing a payment method
      cy.get(':nth-child(4) > label > input').click()
      cy.get('#submit-payment > .button-container > .btn').click()
  
      // Product order button
      cy.get('.d-xl-none > .btn-primary').scrollIntoView().click();
      cy.wait(25000)
      // Print invoice
      cy.get('.print_msg > .btn-sm').click()
  
      cy.wait(30000)
    })
  })