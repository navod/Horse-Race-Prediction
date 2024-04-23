describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should show error message if required fields are empty", () => {
    // Click the signup button without filling in any fields
    cy.get('button[type="submit"]').click();

    // Assert that error messages for required fields are displayed
    cy.get('input[name="first_name"]').should("have.value", "");
  });

  it("should show error message if passwords do not match", () => {
    // Fill in the form with mismatched passwords
    cy.get('input[name="first_name"]').type("John");
    cy.get('input[name="last_name"]').type("Doe");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("differentpassword");

    // Click the signup button
    cy.get('button[type="submit"]').click();

    // Assert that an error message for mismatched passwords is displayed
    cy.contains(".text-red-500", "Passwords do not match").should("be.visible");
  });

  it("should show success message after successful signup", () => {
    // Fill in the form with valid data
    cy.get('input[name="first_name"]').type("John");
    cy.get('input[name="last_name"]').type("Doe");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("Navod@2000");
    cy.get('input[name="confirmPassword"]').type("Navod@2000");

    // Click the signup button
    cy.get('button[type="submit"]').click();

    cy.get(".Toastify__toast-body").should("be.visible");
    cy.get(".Toastify__toast-body > div")
      .contains("Successfully created account")
      .should("be.visible");
  });

  it("User Already Exists", () => {
    // Fill in the form with valid data
    cy.get('input[name="first_name"]').type("John");
    cy.get('input[name="last_name"]').type("Doe");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("Navod@2000");
    cy.get('input[name="confirmPassword"]').type("Navod@2000");


    cy.get('button[type="submit"]').click();

    cy.get(".Toastify__toast-body").should("be.visible");
    cy.get(".Toastify__toast-body > div")
      .contains("User already exists")
      .should("be.visible");
  });
});
