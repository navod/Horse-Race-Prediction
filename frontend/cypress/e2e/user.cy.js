describe("User CRUD", () => {
  beforeEach(() => {
    cy.login("navodadmin1@gmail.com", "Navod@2000");
    cy.get('[data-testid="flowbite-avatar-img"]').click({ force: true });
    cy.get('button[data-testid="dashboardNav"]').click();
  });
  it("User Create Successfully", () => {
    cy.get('[data-testid="flowbite-accordion"] > .justify-between').click({
      force: true,
    });
    cy.get("#firstName").type("exp");
    cy.get("#lastName").type("test");
    cy.get("#email").type("navodtestexp1@gmal.com");
    cy.get("#password").type("Navod@2000");
    cy.get("#confPassword").type("Navod@2000");
    cy.get("#role").select("Admin");
    cy.get('button[data-testid="createUser"]').click({ force: true });
    cy.get(".Toastify__toast-body").should("be.visible");
    cy.get(".Toastify__toast-body > div")
      .contains("Successfully created User")
      .should("be.visible");
  });

  it("should open update modal when edit button is clicked", () => {
    cy.get("tbody tr").each(($row, index, $rows) => {
      cy.wrap($row)
        .find("td")
        .first()
        .invoke("text")
        .then((email) => {
          if (email.trim() === "navodtestexp1@gmal.com") {
            cy.log("Found row with email 'navodtestexp1@gmal.com'");

            cy.wrap($row).find('button[data-testid="edit-button"]').click();
          }
        });
    });
  });

  it("Update user Successfully", () => {
    cy.get("tbody tr").each(($row, index, $rows) => {
      cy.wrap($row)
        .find("td")
        .first()
        .invoke("text")
        .then((email) => {
          if (email.trim() === "navodtestexp1@gmal.com") {
            cy.log("Found row with email 'navodtestexp1@gmal.com'");

            cy.wrap($row).find('button[data-testid="edit-button"]').click();
          }
        });
    });
    cy.get('[data-testid="firstName"]').clear().type("exp1");
    cy.get('[data-testid="lastName"]').clear().type("test");
    cy.get('button[data-testid="updateUser"]').click({ force: true });

    cy.get(".Toastify__toast-body > div")
      .contains("User updated")
      .should("be.visible");
  });

  it("should open delete modal when delete button is clicked", () => {
    cy.get("tbody tr").each(($row, index, $rows) => {
      cy.wrap($row)
        .find("td")
        .first()
        .invoke("text")
        .then((email) => {
          if (email.trim() === "navodtestexp1@gmal.com") {
            cy.log("Found row with email 'navodtestexp1@gmal.com'");

            cy.wrap($row).find('button[data-testid="delete-button"]').click();
          }
        });
    });
  });

  it("Delete user Successfully", () => {
    cy.get("tbody tr").each(($row, index, $rows) => {
      cy.wrap($row)
        .find("td")
        .first()
        .invoke("text")
        .then((email) => {
          if (email.trim() === "navodtestexp1@gmal.com") {
            cy.log("Found row with email 'navodtestexp1@gmal.com'");

            cy.wrap($row).find('button[data-testid="delete-button"]').click();
          }
        });
    });

    cy.get('button[data-testid="delete-sure-button"]').click({ force: true });

    cy.get(".Toastify__toast-body > div")
      .contains("User deleted")
      .should("be.visible");
  });
});
