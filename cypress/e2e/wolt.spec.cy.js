describe('wolt.com order', () => {
  it('Burger order', () => {
    // Visit Wolt website and check the title
    cy.visit('https://wolt.com/')
      .get('title')
      .should('contain', 'Wolt Delivery: Food and more');

    // Accept GDPR consent
    cy.get('[data-localization-key="gdpr-consents.banner.accept-button"]')
      .click();

    // Select the delivery address and verify the chosen address 
    cy.get('[data-test-id="address-picker-input.input"]')
      .type('Kauno Dokas')
      .wait(2000)
      .type('{downArrow}')
      .type('{enter}')
      .get('[data-test-id="header.address-select-button.address-text"]')
      .should('contain', 'Jonavos gatvė 7');

    // Navigate to Restaurants and verify the page title
    cy.contains('Restaurants')
      .first()
      .click({force: true})
      .get('[data-test-id="DiscoveryPageTitle"]')
      .should('have.text', 'Restaurants near me');

    // Select a specific restaurant category (Burger) and verify the page title
    cy.contains('Burger')
      .first()
      .click()
      .get('[data-test-id="DiscoveryPageTitle"]')
      .should('have.text', 'Burger near me');;

    // Select a specific venue (Kuhne (Žaliakalnis)) and verify its title
    cy.get('[data-test-id="venueCard.kuhne"]')
      .click()
      .get('[data-test-id="venue-hero.venue-title"]')
      .should('have.text', 'Kuhne (Žaliakalnis)');

    // Select a specific burger (Bermudai) and verify opened modal
    cy.get('[data-test-id="horizontal-item-card-header"]')
      .contains('Bermudai')
      .click({force: true})
      .get('[data-test-id="product-modal"]')
      .should('contain', 'Bermudai');

    //  Add burger to the cart, open the cart and verify that specific burger (Bermudai) is in it
    cy.get('[data-test-id="product-modal.submit"]')
      .click();
    cy.get('[data-test-id="cart-view-button"]')
      .first()
      .click()
      .get('[data-test-id="CartItemName"]')
      .should('have.text', 'Bermudai');

    // Proceed to checkout and verify that email input exists
    cy.get('[data-test-id="CartViewNextStepButton"]')
      .click()
      .get('[data-test-id="MethodSelect.EmailInput"]')
      .should('exist');

    // Provide an email, and verify modal's title and the success message
    cy.get('[data-test-id="MethodSelect.EmailInput"]')
      .type('test@test.com');
    cy.get('[data-test-id="StepMethodSelect.NextButton"]')
      .click()
      .get('.sc-fc09d69b-0.hoLnYY')
      .should('contain', 'Great, check your inbox!').and('contain', 'test@test.com');
    
  })
})