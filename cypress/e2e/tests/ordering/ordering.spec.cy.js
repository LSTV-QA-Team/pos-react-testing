let assertionResults = [];
let failureMessages = [];

describe("Ordering ", () => {
  beforeEach(() => {
    //cy.task("queryDb","TRUNCATE TABLE takeouttranfile")

    // reset for each test case
    assertionResults = [];
    failureMessages = [];

    // Login with valid credentials
    cy.login("lstv", "lstventures");
  });

  it.only("Select Pricelist Modal ", () => {
    cy.get(":nth-child(3) > .sc-beySPh").click().wait(2000);
    cy.get(".px-8").should("have.text", "Select Pricelist").wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("BRANCH 1").wait(2000);
    cy.contains("Proceed").click();
    cy.url({ timeout: 10000 }).should("contain", "/pages/ordering").wait(2000);
    cy.contains("FOOD").click().wait(2000);
    cy.contains("Chicken").click().wait(2000);
    cy.contains("1-pc Chickenjoy").click().wait(2000);
  });

  it("Remove Button ", () => {
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(2)")
      .click()
      .wait(1500);
    cy.get(":nth-child(1) > .bg-red-100").click().wait(2000);
  });

  it("Change Qty", () => {
    cy.contains("1-pc Chickenjoy").click().wait(2000);
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(2)").click();
    cy.get(":nth-child(2) > .bg-green-100").click();

    cy.get(".px-8").should("have.text", "Change Quantity").wait(2000);
    cy.get("#itmqty").click().type("2").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(2)")
      .should("have.text", "12")
      .wait(2000);

    cy.get(":nth-child(1) > .bg-red-100").click().wait(2000);
  });

  it("Change Ordertype type", () => {
    cy.contains("1-pc Chickenjoy").click().wait(2000);
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(2)")
      .click()
      .wait(1000);
    cy.get(":nth-child(3) > .bg-green-100").click();
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(4)")
      .should("have.text", "T")
      .wait(2000);
  });

  it("Special Request", () => {
    cy.get(":nth-child(4) > .bg-green-100").click().wait(2000);
    cy.get(".px-8").should("have.text", "Add Special Request(s)");
    cy.get("#takeOut").click().type("Leg Part").wait(2000);
    cy.contains("Update").click().wait(2000);
    cy.get(".MuiTableCell-root > .flex")
      .should("have.text", "SPECIAL REQUEST : Leg Part")
      .wait(2000);

    cy.get(":nth-child(1) > .bg-red-100").click().wait(2000);
  });

  it("Adding Discount", () => {
    cy.contains("1-pc Chickenjoy").click().wait(2000);
    cy.get(":nth-child(5) > .bg-green-100").click().wait(2000);
    cy.get(".px-8").should("have.text", "Add discount");
    cy.get("#discde").select("Senior Citizen").wait(2000);
    cy.get("#orderitmid0").click();
    cy.contains("Update").click().wait(2000);

    cy.get("#cardholder").click().type("Nova");
    cy.get("#cardno").click().type("543219876");
    cy.get("#tin").click().type("2978892748465");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();
    cy.get(".ml-10").should("have.text", "Discount : Senior").wait(2000);
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      "13.57"
    );
  });

  it("Discount Behavior with Remove Item Button", () => {
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(3)").click();
    cy.get(":nth-child(1) > .bg-red-100").click();
    cy.get(".Toastify__toast-body")
      .should("have.text", "Error : Remove discount first.")
      .click()
      .wait(2000);
  });

  it("Discount Behavior with Change Quantity Button", () => {
    cy.get(":nth-child(2) > .bg-green-100").click();
    cy.get(".Toastify__toast-body")
      .should("have.text", "Error : Remove discount first.")
      .click()
      .wait(2000);
  });

  it("Discount Behavior with Change Ordertype Button", () => {
    cy.get(":nth-child(3) > .bg-green-100").click();
    cy.get(".Toastify__toast-body")
      .should("have.text", "Error : Remove discount first.")
      .click()
      .wait(2000);
  });

  it("Discount Behavior with Free Item Button", () => {
    cy.get(":nth-child(6) > .bg-green-100").click();
    cy.get(".Toastify__toast-body")
      .should("have.text", "Error : Remove discount first.")
      .click()
      .wait(2000);
    cy.get(".flex > .MuiButtonBase-root").click();
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(3)").click();
  });

  it("Free Item ", () => {
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(3)").click();
    cy.get(":nth-child(6) > .bg-green-100").click();
    cy.get(".px-8").should("have.text", "Free item");
    cy.get(".me-1").click();
    cy.get("#textreason").click().type("Free Reason");
    cy.contains("Confirm").click();

    cy.get(".css-1clo5mp-MuiTableRow-root > :nth-child(5)").should(
      "have.text",
      "0.00"
    );
    cy.get(":nth-child(1) > .bg-red-100").click().wait(2000);
  });

  it("Price Override ", () => {
    cy.contains("1-pc Chickenjoy").click();
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(3)")
      .click()
      .wait(2000);
    cy.get(":nth-child(7) > .bg-green-100").click();
    cy.get(".px-8").should("have.text", "Price Override");
    cy.get(".py-3 > .undefined").click().clear().type("120");
    cy.contains("Confirm").click();

    cy.get(".MuiTableCell-root > .flex").should("have.text", "Price Override");
    cy.get(".css-1clo5mp-MuiTableRow-root > :nth-child(5)")
      .should("have.text", "120.00")
      .wait(2000);
  });

  it("Discount with price override", () => {
    cy.get(".MuiButtonBase-root").click();
    cy.get(":nth-child(5) > .bg-green-100").click();
    cy.get("#discde").select("Senior Citizen");
    cy.get("#orderitmid0").click();
    cy.contains("Update").click();

    cy.get("#cardholder").click().type("Nova2");
    cy.get("#cardno").click().type("543219876");
    cy.get("#tin").click().type("2978892748465");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(".css-1clo5mp-MuiTableRow-root > :nth-child(3)").click();
    cy.get(":nth-child(7) > .bg-green-100").click();
    cy.get(".Toastify__toast-body")
      .should("have.text", "Error : Remove discount first.")
      .wait(2000);
    cy.get(".flex > .MuiButtonBase-root").click();
  });

  it("Add On Item", () => {
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(3)").click();
    cy.get(".grid > :nth-child(8)").click();
    cy.get(".px-8").should("have.text", "Add on");
    cy.get("#isaddon").click();
    cy.get(".border-blue-500").click();
    cy.get(".ml-10").should("have.text", "Add on : Coke");
  });

  it("Cancel Transaction", () => {
    cy.get(".grid > :nth-child(9)").click();
    cy.get(".px-8").should("have.text", "Confirmation");
    cy.get(".border-blue-500").click();
    cy.get(".px-8").should("have.text", "Select Pricelist").wait(3000);
  });

  it("Reprint Transaction", () => {
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("BRANCH 1").wait(2000);
    cy.contains("Proceed").click();
    cy.url({ timeout: 10000 }).should("contain", "/pages/ordering").wait(2000);

    cy.get(":nth-child(10) > .bg-green-100").click();
    cy.get(".px-8").should("have.text", "Reprint Transaction");
    cy.get("#from").click().type("2024-05-01");
    cy.get("#to").click().type("2024-06-30");

    cy.get(".px-8 > .flex > .anticon > svg").click();
  });

  it("Reprint Void", () => {
    cy.get(":nth-child(11) > .bg-green-100").click();
    cy.get(".px-8").should("have.text", "Reprint Void Transaction");
    cy.get(".px-8 > .flex > .anticon > svg").click();
  });

  it("Reprint Refund", () => {
    cy.get(":nth-child(12) > .bg-green-100").click();
    cy.get(".px-8").should("have.text", "Reprint Refund Transaction");
    cy.get(".px-8 > .flex > .anticon > svg").click();
  });

  it.only("Payment" , () => { 

    // cy.contains("FOOD").click().wait(2000);
    // cy.contains("Chicken").click().wait(2000);
    // cy.contains("1-pc Chickenjoy").click().wait(2000);aaaaaaa

    cy.get(':nth-child(13) > .bg-green-100').click()
    cy.get('.px-8').should("have.text", "Payment")
    cy.contains("CASH").click()
    cy.get('.bg-black\/75 > .shadow-lg > .px-8').should("have.text", "CASH Payment")
    cy.get('.border-blue-500').click()
    cy.get('.my-5 > .grid > :nth-child(1)').click()



  })

});
