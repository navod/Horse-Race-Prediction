describe("Integration Page", () => {
  beforeEach(() => {
    cy.login("test@example.com", "Navod@2000");
  });

  it("Integrate with invalid api key", () => {
    cy.get('button[data-testid="connect-button"]').click();

    cy.url().should("include", "/integration");
    cy.get('button[data-testid="connect-button"]').click();

    cy.get('input[name="api_key"]').type("Navod@2000");
    cy.get('button[data-testid="connect-submit-button"]').click();

    cy.get(".Toastify__toast-body > div")
      .contains("Invalid Credentials")
      .should("be.visible");
  });

  it("Integrate with valid api key", () => {
    cy.get('button[data-testid="connect-button"]').click();

    cy.url().should("include", "/integration");
   
    cy.get('button[data-testid="connect-button"]').click();
    cy.get('input[name="api_key"]').type(
      "bb6c5da0a6msh7043a33adfe11f9p1324f2jsn6643dcfd31a3"
    );
    cy.get('button[data-testid="connect-submit-button"]').click();
    cy.get(".Toastify__toast-body > div")
      .contains("Sync success")
      .should("be.visible");
  });

  it("Disconnect Rapid connection", () => {
    cy.get('button[data-testid="disconnect-button"]').click();

    cy.url().should("include", "/integration");

    cy.get('button[data-testid="disconnect-button"]').click();

    cy.get('button[data-testid="disconnect-submit-button"]').click();

    cy.get(".Toastify__toast-body > div")
      .contains("Disconnected")
      .should("be.visible");
  });
});
