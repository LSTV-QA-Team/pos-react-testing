let assertionResults = [];
let failureMessages = [];

describe("Refund Transaction", () => {
  beforeEach(() => {
    // reset for each test case
    assertionResults = [];
    failureMessages = [];

    // Login with valid credentials
    cy.login("lstv", "lstventures");
  });

  it("1 Pax with Regular Transaction", () => {
    cy.get(":nth-child(3) > .sc-beySPh").click().wait(2000);
    cy.get(".px-8").should("have.text", "Select Pricelist").wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();
    cy.url({ timeout: 10000 }).should("contain", "/pages/ordering").wait(2000);

    cy.contains("FOOD").click();
    cy.contains("Chicken").click();
    cy.contains("1pc Chickenjoy w Fries").click();

    cy.contains("Payment").click().wait(2000);
    cy.contains("CASH").click().wait(2000);
    cy.get("#customerName").click().type("Ariana G");
    cy.get(".border-blue-500").click().wait(2000);
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700")
      .click()
      .wait(2000);
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get(".px-8").should("have.text", "Select Pricelist");
    cy.get("#postypcde").select("DINE IN");
    cy.get("#warcde").select("Jollibee 1");
    cy.contains("Proceed").click();

    cy.contains("Refund Transaction").click().wait(1500);
    cy.get(".px-8").should("have.text", "Refund Transaction").wait(1500);
    cy.get("#voidreason").select("Customer Complaint").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get(".px-8").should("have.text", "REF-0000000000000001");
    cy.get(".justify-between > .group").click().wait(2000);
    cy.contains("INV-0000000000000023").click().wait(2000);

    cy.get(".css-1ex1afd-MuiTableCell-root")
      .should("have.text", "1pc Chickenjoy w Fries Meal")
      .wait(2000);
    cy.get("#refundqty").clear().type("1").wait(2000);
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(4)")
      .should("have.text", "105.00")
      .wait(2000);
    cy.contains("Next").click();

    cy.get(".h-full > .justify-between > .font-bold").should(
      "have.text",
      "TOTAL : 105.00"
    );
    cy.get(":nth-child(3) > .group").click();
    cy.contains("Proceed").click();
    cy.contains("Transaction Refunded.").should(
      "have.text",
      "Transaction Refunded."
    );
  });

  it("1 Pax with 10% discount", () => {
    cy.contains("FOOD").click();
    cy.contains("Chicken").click();
    cy.contains("1pc Chickenjoy w Jolly Spaghetti").click();

    cy.contains("Add Discount").click().wait(2000);
    cy.get("#discde").select("10%");
    cy.get("#orderitmid0").click().wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get("#cardholder").click().type("asdastg").wait(2000);
    cy.get("#cardno").click().type("3425").wait(2000);
    cy.get("#tin").click().type("48956");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500")
      .click()
      .wait(2000);

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : 10%"
    );

    cy.contains("Payment").click();
    cy.contains("CASH").click().wait(2000);
    cy.get("#customerName").click().type("qweasrf").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Refund Transaction").click().wait(2000);
    cy.get(".px-8").should("have.text", "Refund Transaction").wait(1500);
    cy.get("#voidreason").select("Customer Complaint").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get(".me-2").should("have.text", "REF-0000000000000002");
    cy.get('.justify-between > .group').click().wait(1500)
    cy.contains("INV-0000000000000024").click().wait(1500);

    cy.get(".css-1ex1afd-MuiTableCell-root")
      .should("have.text", "1pc Chickenjoy w Jolly Spaghetti")
      .wait(2000);
    cy.get("#refundqty").clear().type("1").wait(2000);
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(4)")
      .should("have.text", "89.10")
      .wait(2000);
    cy.contains("Next").click();

    cy.get(".h-full > .justify-between > .font-bold").should(
      "have.text",
      "TOTAL : 89.10"
    );
    cy.get(":nth-child(3) > .group").click();
    cy.contains("Proceed").click();
    cy.contains("Transaction Refunded.").should(
      "have.text",
      "Transaction Refunded."
    );
  });

  it("1 Pax with 20% discount", () => {

    cy.contains("FOOD").click();
    cy.contains("Chicken Joy Perfect Pairs").click();
    cy.contains("1pc Chicken Joy w Soup").click();

    cy.contains("Add Discount").click().wait(2000);
    cy.get("#discde").select("20%");
    cy.get("#orderitmid0").click().wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get("#cardholder").click().type("asdastg").wait(2000);
    cy.get("#cardno").click().type("3425").wait(2000);
    cy.get("#tin").click().type("48956");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500")
      .click()
      .wait(2000);

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : 20%"
    );

    cy.contains("Payment").click();
    cy.contains("CASH").click().wait(2000);
    cy.get("#customerName").click().type("qweasrf").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Refund Transaction").click().wait(2000);
    cy.get(".px-8").should("have.text", "Refund Transaction").wait(1500);
    cy.get("#voidreason").select("Food Quality Issue").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get(".me-2").should("have.text", "REF-0000000000000003");
    cy.get('.justify-between > .group').click().wait(1500)
    cy.contains("INV-0000000000000025").click().wait(1500);

    cy.get(".css-1ex1afd-MuiTableCell-root")
      .should("have.text", "1pc Chicken Joy w Soup")
      .wait(2000);
    cy.get("#refundqty").clear().type("1").wait(2000);
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(4)")
      .should("have.text", "79.20")
      .wait(2000);
    cy.contains("Next").click();

    cy.get(".h-full > .justify-between > .font-bold").should(
      "have.text",
      "TOTAL : 79.20"
    );
    cy.get(":nth-child(3) > .group").click();
    cy.contains("Proceed").click();
    cy.contains("Transaction Refunded.").should(
      "have.text",
      "Transaction Refunded."
    );
  })

  it("1 Pax with Senior Discount" , () => {

    cy.contains("FOOD").click();
    cy.contains("Chicken").click();
    cy.contains("1pc Chickenjoy w Burger Steak").click();

    cy.contains("Add Discount").click().wait(2000);

    cy.get("#discde").select("Senior Citizen").wait(2000);
    cy.get("#orderitmid0").click().wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get("#cardholder").click().type("Winter").wait(2000);
    cy.get("#cardno").click().type("4569084").wait(2000);
    cy.get("#tin").click().type("56735").wait(2000);
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10")
      .should("have.text", "Discount : Senior")
      .wait(2000);

    cy.contains("Payment").click();
    cy.contains("CASH").click().wait(2000);
    cy.get("#customerName").click().type("Ningning").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700")
      .click()
      .wait(2000);
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Refund Transaction").click().wait(2000);
    cy.get(".px-8").should("have.text", "Refund Transaction").wait(1500);
    cy.get("#voidreason").select("Food Quality Issue").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get(".me-2").should("have.text", "REF-0000000000000004");
    cy.get('.justify-between > .group').click().wait(1500)
    cy.contains("INV-0000000000000026").click().wait(1500);

    cy.get(".css-1ex1afd-MuiTableCell-root")
    .should("have.text", "1pc Chickenjoy w Burger Steak")
    .wait(2000);
  cy.get("#refundqty").clear().type("1").wait(2000);
  cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(4)")
    .should("have.text", "89.29")
    .wait(2000);
  cy.contains("Next").click();

  cy.get(".h-full > .justify-between > .font-bold").should(
    "have.text",
    "TOTAL : 89.29"
  );
  cy.get(":nth-child(3) > .group").click();
  cy.contains("Proceed").click();
  cy.contains("Transaction Refunded.").should(
    "have.text",
    "Transaction Refunded."
  );

  })

  it("1 Pax with PWD Discount" , () => {

    cy.contains("FOOD").click();
    cy.contains("Chicken").click();
    cy.contains("2pc Chickenjoy").click();

    cy.contains("Add Discount").click().wait(2000);

    cy.get("#discde").select("Person with Disability").wait(2000);
    cy.get("#orderitmid0").click().wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get("#cardholder").click().type("Kwangya").wait(2000);
    cy.get("#cardno").click().type("2345").wait(2000);
    cy.get("#tin").click().type("asd").wait(2000);
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10")
      .should("have.text", "Discount : PWD")
      .wait(2000);

    cy.contains("Payment").click();
    cy.contains("CASH").click().wait(2000);
    cy.get("#customerName").click().type("aeNingning").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700")
      .click()
      .wait(2000);
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Refund Transaction").click().wait(2000);
    cy.get(".px-8").should("have.text", "Refund Transaction").wait(1500);
    cy.get("#voidreason").select("Food Quality Issue").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get(".me-2").should("have.text", "REF-0000000000000005");
    cy.get('.justify-between > .group').click().wait(1500)
    cy.contains("INV-0000000000000027").click().wait(1500);

    cy.get(".css-1ex1afd-MuiTableCell-root")
    .should("have.text", "2pc Chickenjoy")
    .wait(2000);
  cy.get("#refundqty").clear().type("1").wait(2000);
  cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(4)")
    .should("have.text", "108.57")
    .wait(2000);
  cy.contains("Next").click();

  cy.get(".h-full > .justify-between > .font-bold").should(
    "have.text",
    "TOTAL : 108.57"
  );
  cy.get(":nth-child(3) > .group").click();
  cy.contains("Proceed").click();
  cy.contains("Transaction Refunded.").should(
    "have.text",
    "Transaction Refunded."
  );
  })
  it("1 Pax with Athlete Discount" , () => {

    cy.contains("FOOD").click();
    cy.contains("Chicken").click();
    cy.contains("1pc Chickenjoy w Fries Meal").click();

    cy.contains("Add Discount").click().wait(2000);

    cy.get("#discde").select("Athlete").wait(2000);
    cy.get("#orderitmid0").click().wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get("#cardholder").click().type("Minjeongie").wait(2000);
    cy.get("#cardno").click().type("23423425").wait(2000);
    cy.get("#tin").click().type("12234345").wait(2000);
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10")
      .should("have.text", "Discount : Athlete")
      .wait(2000);

    cy.contains("Payment").click();
    cy.contains("CASH").click().wait(2000);
    cy.get("#customerName").click().type("Yizuo").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700")
      .click()
      .wait(2000);
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Refund Transaction").click().wait(2000);
    cy.get(".px-8").should("have.text", "Refund Transaction").wait(1500);
    cy.get("#voidreason").select("Food Quality Issue").wait(2000);
    cy.get(".border-blue-500").click().wait(2000);

    cy.get(".me-2").should("have.text", "REF-0000000000000006");
    cy.get('.justify-between > .group').click().wait(1500)
    cy.contains("INV-0000000000000028").click().wait(1500);

    cy.get(".css-1ex1afd-MuiTableCell-root")
    .should("have.text", "1pc Chickenjoy w Fries Meal")
    .wait(2000);
  cy.get("#refundqty").clear().type("1").wait(2000);
  cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(4)")
    .should("have.text", "102.68")
    .wait(2000);
  cy.contains("Next").click();

  cy.get(".h-full > .justify-between > .font-bold").should(
    "have.text",
    "TOTAL : 102.68"
  );
  cy.get(":nth-child(3) > .group").click();
  cy.contains("Proceed").click();
  cy.contains("Transaction Refunded.").should(
    "have.text",
    "Transaction Refunded."
  );
  })



});
 