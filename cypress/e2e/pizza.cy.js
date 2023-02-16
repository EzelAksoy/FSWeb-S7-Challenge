describe("Form Validation Test", () => {
  beforeEach(() => cy.visit("http://localhost:3000/"));
  it("BEST FOODS IN ISTANBUL", () => {
    cy.get('[data-cy="baslık"]').contains(`BEST FOODS IN ISTANBUL`);
  });
  it("Order click test", () => {
    cy.get(`[data-cy="order"]`)
      .click()
      .get(`[data-cy="testyeri"]`)
      .contains(`Original Red`);
  });
  it("Home click test", () => {
    cy.visit("http://localhost:3000/Order");
    cy.get('[data-cy="Home"]')
      .click()
      .get(`[data-cy="baslık"]`)
      .contains(`BEST FOODS IN ISTANBUL`);
  });
});
