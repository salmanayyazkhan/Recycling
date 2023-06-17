describe('test', () => {
  it('should visit vending machine page', () => {
    cy.visit('/home');
  });

  it('should click the first button', () => {
    cy.get('.button').eq(0).click();
    cy.wait(1000);
  });

  it('should click the second button', () => {
    cy.get('.button').eq(1).click();
    cy.wait(1000);
  });

  it('should click the third button', () => {
    cy.get('.button').eq(2).click();
  });

  it('should print voucher', () => {
    cy.url().should('eq', 'http://localhost:4200/home/voucher');
  });

  it('should check if price is correct', () => {
    cy.get('.total-price').contains(5)
  });

  it('should start again and press button', () => {
    cy.get('.button').eq(0).click();
  });

  it('should return to home page', () => {
    cy.url().should('eq', 'http://localhost:4200/home');
  });



});

