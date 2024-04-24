describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("should log in with valid credentials", () => {
    cy.get('input[name="email"]').type("navod7@gmail.com");
    cy.get('input[name="password"]').type("Navod@2000");
    cy.get('button[name="loginBtn"]').click();

    cy.url().should("include", "/");
  });

  it("should show error message with invalid credentials", () => {
    cy.get('input[name="email"]').type("navod@gmail.com");
    cy.get('input[name="password"]').type("invalidpassword");
    cy.get('button[name="loginBtn"]').click();

    cy.get(".Toastify__toast-body").should("be.visible");
    cy.get(".Toastify__toast-body > div")
      .contains("Invalid Credentials")
      .should("be.visible");
  });
});
