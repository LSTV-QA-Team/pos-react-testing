let assertionResults = [];
let failureMessages = [];

describe("Void Transactions ", () => {
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
    cy.contains("1pc Chickenjoy w Palabok Meal").click();
    cy.contains("1pc Chickenjoy w Burger Steak").click();

    cy.contains("Payment").click();
    cy.contains("CASH").click();
    cy.get("#customerName").click().type("Ariana G");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get(".px-8").should("have.text", "Select Pricelist");
    cy.get("#postypcde").select("DINE IN");
    cy.get("#warcde").select("Jollibee 1");
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click().wait(1500);
    cy.get(".px-8").should("have.text", "Void Transaction").wait(1500);
    cy.contains("INV-0000000000000013").click().wait(1500);

    cy.get("#voidreason").select("Employee Mistake");
    cy.get(".border-blue-500").click().wait(2000);
    // cy.get(".Toastify__toast-body > :nth-child(2)").should(
    //   "have.text",
    //   "Transaction Void Successfull"
    // );
  });

  it("1 Pax with 10% discount", () => {
    cy.contains("FOOD").click();
    cy.contains("Hotdog").click();
    cy.contains("Cheesy Classic Jolly Hotdog").click();
    cy.contains("Cheesy Classic w Fries").click();

    cy.contains("Add Discount").click();
    cy.get("#discde").select("10%");
    cy.get("#orderitmid").click();
    cy.get(".border-blue-500").click();

    cy.get("#cardholder").click().type("Karina");
    cy.get("#cardno").click().type("12342345235");
    cy.get("#tin").click().type("48956");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : 10%"
    );
    cy.get(":nth-child(4) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : 10%"
    );

    const ST = 170;
    const SC_Formula = (ST / 1.12) * 0.1;
    const T14_SCharge = Number(SC_Formula.toFixed(2));
    const Disc_Formula = ST * 0.1;
    const Discount = Disc_Formula.toFixed(2);
    const GT = Number(ST - Discount);
    const total = Number(GT + T14_SCharge);

    cy.get(".bg-black > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "170.00"
    );
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      Discount
    );
    cy.get(".bg-black > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      "0.00"
    );
    cy.get(":nth-child(4) > :nth-child(2)").should("have.text", T14_SCharge);
    cy.get(".font-extrabold > :nth-child(2)").should("have.text", total);

    cy.contains("Payment").click();
    cy.contains("CASH").click();
    cy.get("#customerName").click().type("Ariana G");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click();
    cy.get(".me-2").should("have.text", "Void Transaction");
    cy.contains("INV-0000000000000014").click().wait(1500);

    cy.contains("Set void reason").should("have.text", "Set void reason");
    cy.get("#voidreason").select("Order Duplication");
    cy.get(".border-blue-500").click();

    // cy.get(".Toastify__toast-body > :nth-child(2)").should(
    //   "have.text",
    //   "Transaction Void Successfull"
    // );
  });

  it("1 Pax with 20% discount", () => {
    cy.contains("DESSERT").click();
    cy.contains("Desserts and Pies").click();
    cy.contains("Jolly Crispy Fries").click();

    cy.contains("Add Discount").click();
    cy.get("#discde").select("20%");
    cy.get("#orderitmid0").click();
    cy.get(".border-blue-500").click();

    cy.get("#cardholder").click().type("Karina");
    cy.get("#cardno").click().type("12342345235");
    cy.get("#tin").click().type("48956");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : 20%"
    );

    const ST = 42;
    const SC_Formula = (ST / 1.12) * 0.1;
    const T15_SCharge = Number(SC_Formula.toFixed(2));
    const Disc_Formula = ST * 0.2;
    const Discount = Disc_Formula.toFixed(2);
    const GT = Number(ST - Discount);
    const total = Number(GT + T15_SCharge);

    cy.get(".bg-black > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "42.00"
    );
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      Discount
    );
    cy.get(".bg-black > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      "0.00"
    );
    cy.get(":nth-child(4) > :nth-child(2)").should("have.text", T15_SCharge);
    cy.get(".font-extrabold > :nth-child(2)").should("have.text", total);

    cy.contains("Payment").click();

    cy.contains("CASH").click();
    cy.get("#customerName").click().type("Karina");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click();
    cy.get(".me-2").should("have.text", "Void Transaction");
    cy.contains("INV-0000000000000015").click().wait(1500);

    cy.contains("Set void reason").should("have.text", "Set void reason");
    cy.get("#voidreason").select("Food Quality Issue");
    cy.get(".border-blue-500").click();

    // cy.get(".Toastify__toast-body > :nth-child(2)").should(
    //   "have.text",
    //   "Transaction Void Successfull"
    // );
  });

  it("1 Pax with Senior Discount", () => {
    cy.contains("FOOD").click();
    cy.contains("TakeOut Favorites").click();
    cy.contains("TF Palabok Family Pan").click();

    cy.contains("Add Discount").click().wait(2000);

    cy.get("#discde").select("Senior Citizen");
    cy.get("#orderitmid0").click();
    cy.get(".border-blue-500").click();

    cy.get("#cardholder").click().type("Winter");
    cy.get("#cardno").click().type("4569084");
    cy.get("#tin").click().type("56735");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : Senior"
    );

    const ST = 320;
    const Disc_Formula = Number(ST / 1.12) * 0.2;
    const Discount = Disc_Formula.toFixed(2);
    const LVA = (ST / 1.12) * 0.12;
    const LVA1 = Number(LVA.toFixed(2));
    const SC_Formula = (ST / 1.12) * 0.1;
    const T16_SCharge = Number(SC_Formula.toFixed(2));
    const SCharge_dsc = T16_SCharge * 0.2;
    const SCharge_dsc1 = Number(SCharge_dsc.toFixed(2));
    const GT = Number(ST - Discount - LVA1);
    const total = Number(GT + T16_SCharge - SCharge_dsc1);
    const total1 = Number(total.toFixed(2));

    cy.get(".bg-black > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "320.00"
    );
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      Discount
    );
    cy.get(".bg-black > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      LVA1
    );
    cy.get(":nth-child(4) > :nth-child(2)").should("have.text", T16_SCharge);
    cy.get(":nth-child(5) > :nth-child(2)").should("have.text", SCharge_dsc1);
    cy.get(".font-extrabold > :nth-child(2)").should("have.text", total1);

    cy.contains("Payment").click().wait(2000);

    cy.contains("CASH").click();
    cy.get("#customerName").click().type("Giselle");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click();
    cy.get(".me-2").should("have.text", "Void Transaction");
    cy.contains("INV-0000000000000016").click().wait(1500);

    cy.contains("Set void reason").should("have.text", "Set void reason");
    cy.get("#voidreason").select("Customer Complaint");
    cy.get(".border-blue-500").click();

    // cy.get(".Toastify__toast-body > :nth-child(2)").should(
    //   "have.text",
    //   "Transaction Void Successfull"
    // );
  });

  it("1 Pax with PWD Discount", () => {
    cy.contains("DESSERT").click();
    cy.contains("Desserts and Pies").click();
    cy.contains("Buko Pie").click();

    cy.contains("Add Discount").click().wait(2000);
    cy.get("#discde").select("Person with Disability");
    cy.get("#orderitmid0").click();
    cy.get(".border-blue-500").click();

    cy.get("#cardholder").click().type("Tanya");
    cy.get("#cardno").click().type("12342345235");
    cy.get("#tin").click().type("48956");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : PWD"
    );

    const ST = 30;
    const Disc_Formula = Number(ST / 1.12) * 0.2;
    const Discount = Disc_Formula.toFixed(2);
    const LVA = (ST / 1.12) * 0.12;
    const LVA1 = Number(LVA.toFixed(2));
    const SC_Formula = (ST / 1.12) * 0.1;
    const T17_SCharge = Number(SC_Formula.toFixed(2));
    const SCharge_dsc = T17_SCharge * 0.2;
    const SCharge_dsc1 = Number(SCharge_dsc.toFixed(2));
    const GT = Number(ST - Discount - LVA1);
    const total = Number(GT + T17_SCharge - SCharge_dsc1);
    const total1 = Number(total.toFixed(2));

    cy.get(".bg-black > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "30.00"
    );
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      Discount
    );
    cy.get(".bg-black > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      LVA1
    );
    cy.get(":nth-child(4) > :nth-child(2)").should("have.text", T17_SCharge);
    cy.get(":nth-child(5) > :nth-child(2)").should("have.text", SCharge_dsc1);
    cy.get(".font-extrabold > :nth-child(2)").should("have.text", total1);

    cy.contains("Payment").click().wait(2000);

    cy.contains("CASH").click();
    cy.get("#customerName").click().type("Tanya");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.wait(2000);
    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click();
    cy.get(".me-2").should("have.text", "Void Transaction");
    cy.contains("INV-0000000000000017").click().wait(1500);

    cy.contains("Set void reason").should("have.text", "Set void reason");
    cy.get("#voidreason").select("Order Duplication");
    cy.get(".border-blue-500").click();
  });

  it("1 Pax with Athlete Discount", () => {
    cy.contains("FOOD").click();
    cy.contains("Breakfast").click();
    cy.contains("BF Hotdog").click();

    cy.contains("Add Discount").click().wait(2000);
    cy.get("#discde").select("Athlete");
    cy.get("#orderitmid0").click();
    cy.get(".border-blue-500").click();

    cy.get("#cardholder").click().type("Tony");
    cy.get("#cardno").click().type("645734");
    cy.get("#tin").click().type("123890");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : Athlete"
    );

    const ST = 60;
    const Disc_Formula = Number(ST / 1.12) * 0.2;
    const Discount = Disc_Formula.toFixed(2);
    const SC_Formula = (ST / 1.12) * 0.1;
    const T18_SCharge = Number(SC_Formula.toFixed(2));
    const SCharge_dsc = T18_SCharge * 0.2;
    const SCharge_dsc1 = Number(SCharge_dsc.toFixed(2));
    const GT = Number(ST - Discount);
    const total = Number(GT + T18_SCharge - SCharge_dsc1);
    const total1 = Number(total.toFixed(2));

    cy.get(".bg-black > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "60.00"
    );
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      Discount
    );
    cy.get(".bg-black > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      "0.00"
    );
    cy.get(":nth-child(4) > :nth-child(2)").should("have.text", T18_SCharge);
    cy.get(":nth-child(5) > :nth-child(2)").should("have.text", SCharge_dsc1);
    cy.get(".font-extrabold > :nth-child(2)").should("have.text", "53.57");

    cy.contains("Payment").click().wait(2000);

    cy.contains("CASH").click();
    cy.get("#customerName").click().type("Guru");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );

    cy.wait(2000);

    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click();
    cy.get(".me-2").should("have.text", "Void Transaction");
    cy.contains("INV-0000000000000018").click().wait(1500);

    cy.contains("Set void reason").should("have.text", "Set void reason");
    cy.get("#voidreason").select("Customer Cancelled Order");
    cy.get(".border-blue-500").click();

    // cy.get(".Toastify__toast-body > :nth-child(2)").should(
    //   "have.text",
    //   "Transaction Void Successfull"
    // );
  });

  it("1 Pax with Medal of Valor Discount", () => {
    cy.contains("FOOD").click();
    cy.contains("Breakfast").click();
    cy.contains("BF 2pc Pancake").click();

    cy.contains("Add Discount").click().wait(2000);
    cy.get("#discde").select("MOV");
    cy.get("#orderitmid0").click();
    cy.get(".border-blue-500").click();

    cy.get("#cardholder").click().type("Mingmangmeng");
    cy.get("#cardno").click().type("563566");
    cy.get("#tin").click().type("2343");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : MOV"
    );
    const ST = 49;
    const Disc_Formula = Number(ST * 0.2);
    const Discount = Disc_Formula.toFixed(2);
    const SC_Formula = (ST / 1.12) * 0.1;
    const T19_SCharge = Number(SC_Formula.toFixed(3));
    const GT = Number(ST - Discount);
    const total = Number(GT + T19_SCharge);
    const total1 = Number(total.toFixed(2));

    cy.get(".bg-black > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "49.00"
    );
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      Discount
    );
    cy.get(".bg-black > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      "0.00"
    );
    cy.get(":nth-child(4) > :nth-child(2)").should(
      "have.text",
      Math.round(T19_SCharge * 100) / 100
    );
    cy.get(".font-extrabold > :nth-child(2)").should("have.text", total1);

    cy.contains("Payment").click();

    cy.contains("CASH").click();
    cy.get("#customerName").click().type("Celine");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );
    cy.wait(2000);

    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click();
    cy.get(".me-2").should("have.text", "Void Transaction");
    cy.contains("INV-0000000000000019").click().wait(1500);

    cy.contains("Set void reason").should("have.text", "Set void reason");
    cy.get("#voidreason").select("Customer Cancelled Order");
    cy.get(".border-blue-500").click();

    // cy.get(".Toastify__toast-body > :nth-child(2)").should(
    //   "have.text",
    //   "Transaction Void Successfull"
    // );
  });

  it("1 Pax with Diplomat Discount", () => {
    cy.contains("BEVERAGES").click();
    cy.contains("Beverages").click();
    cy.contains("Brown Sugar Milk Tea").click();

    cy.contains("Add Discount").click().wait(2000);
    cy.get("#discde").select("Diplomat");
    cy.get("#orderitmid0").click();
    cy.get(".border-blue-500").click();

    cy.get("#cardholder").click().type("Diploooo");
    cy.get("#cardno").click().type("345345");
    cy.get("#tin").click().type("1234234");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : Diplomat"
    );

    const ST = 50;
    const Discount = 0;
    const LVA = (ST / 1.12) * 0.12;
    const LVA1 = Number(LVA.toFixed(2));
    const SC_Formula = (ST / 1.12) * 0.1;
    const T20_SCharge = Number(SC_Formula.toFixed(2));
    const GT = Number(ST - Discount - LVA1);
    const total = Number(GT + T20_SCharge);
    const total1 = Number(total.toFixed(2));

    cy.get(".bg-black > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "50.00"
    );
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      "0.00"
    );
    cy.get(".bg-black > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      LVA1
    );
    cy.get(":nth-child(4) > :nth-child(2)").should("have.text", T20_SCharge);
    cy.get(".font-extrabold > :nth-child(2)").should("have.text", total1);

    cy.contains("Payment").click();

    cy.contains("CASH").click();
    cy.get("#customerName").click().type("Parehko");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );
    cy.wait(2000);

    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click();
    cy.get(".me-2").should("have.text", "Void Transaction");
    cy.contains("INV-0000000000000020").click().wait(1500);

    cy.contains("Set void reason").should("have.text", "Set void reason");
    cy.get("#voidreason").select("Customer Cancelled Order");
    cy.get(".border-blue-500").click();

    // cy.get(".Toastify__toast-body > :nth-child(2)").should(
    //   "have.text",
    //   "Transaction Void Successfull"
    // );

    cy.contains("Cancel Transaction").click();
    cy.get(".border-blue-500").click();
  });

  it("1 Pax with MEMC Senior Discount", () => {
    cy.get("#postypcde").select("TAKEOUT").wait(2000);
    cy.get("#warcde").select("Jollibee 2").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("FOOD").click();
    cy.contains("Family Super Meals").click();
    cy.contains(
      "FSM B 6pc: Chickenjoy Bucket (3 Jolly Spaghetti, 3 Rice, and 3 Regular Drinks)"
    ).click();

    cy.contains("Add Discount").click().wait(2000);
    cy.get("#discde").select("Senior Citizen");
    cy.get("#orderitmid0").click();
    cy.get(".border-blue-500").click();

    cy.get("#cardholder").click().type("Seniorrrritoo");
    cy.get("#cardno").click().type("234");
    cy.get("#tin").click().type("3546");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : Senior"
    );

    const ST = 599;
    const Disc_Formula = Number(100 / 1.12) * 0.2;
    const Discount = Disc_Formula.toFixed(2); 
    const LVA = (100 / 1.12) * 0.12;
    const LVA1 = Number(LVA.toFixed(2));
    const SC_Formula = (ST / 1.12) * 0.1;
    const T21_SCharge = Number(SC_Formula.toFixed(2)); 
    const SCharge_dsc = T21_SCharge * 0.2;
    const SCharge_dsc1 = SCharge_dsc.toFixed(2);
    const GT = Number(ST - Discount - LVA1);
    const total = Number(GT + T21_SCharge - SCharge_dsc1);
    const total1 = Number(total.toFixed(2));

    cy.get(".bg-black > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "599.00"
    );
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      Discount
    );
    cy.get(".bg-black > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      LVA1
    );
    cy.get(":nth-child(4) > :nth-child(2)").should("have.text", T21_SCharge);
    cy.get(":nth-child(5) > :nth-child(2)").should("have.text", SCharge_dsc1);
    cy.get(".font-extrabold > :nth-child(2)").should("have.text", total1);

    cy.contains("Payment").click();

    cy.contains("CASH").click();
    cy.get("#customerName").click().type("MEMSIIII");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );
    
    cy.wait(2000);

    cy.get("#postypcde").select("TAKEOUT").wait(2000);
    cy.get("#warcde").select("Jollibee 2").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click();
    cy.get(".me-2").should("have.text", "Void Transaction");
    cy.contains("INV-0000000000000021").click().wait(1500);

    cy.contains("Set void reason").should("have.text", "Set void reason");
    cy.get("#voidreason").select("Customer Cancelled Order");
    cy.get(".border-blue-500").click();

    // cy.get(".Toastify__toast-body > :nth-child(2)").should(
    //   "have.text",
    //   "Transaction Void Successfull"
    // );

  });

  it("1 Pax with MEMC PWD Discount", () => {

    cy.contains("FOOD").click();
    cy.contains("Family Super Meals").click();
    cy.contains(
      "FSM B 8pc: Chickenjoy Bucket (4 Jolly Spaghetti, 4 Rice, and 4 Regular Drinks)"
    ).click();

    cy.contains("Add Discount").click().wait(2000);
    cy.get("#discde").select("Person with Disability");
    cy.get("#orderitmid0").click();
    cy.get(".border-blue-500").click();

    cy.get("#cardholder").click().type("PIDABALYUDI");
    cy.get("#cardno").click().type("234");
    cy.get("#tin").click().type("3546");
    cy.get("#discountUser > .flex-col > #buttons > .border-blue-500").click();

    cy.get(":nth-child(2) > .MuiTableCell-root > .flex > .ml-10").should(
      "have.text",
      "Discount : PWD"
    );

    const ST = 799;
    const Disc_Formula = Number(200 / 1.12) * 0.2;
    const Discount = Disc_Formula.toFixed(2);
    const LVA = (200 / 1.12) * 0.12;
    const LVA1 = Number(LVA.toFixed(2));
    const SC_Formula = (ST / 1.12) * 0.1;
    const T22_SCharge = Number(SC_Formula.toFixed(2));
    const SCharge_dsc = T22_SCharge * 0.2;
    const SCharge_dsc1 = SCharge_dsc.toFixed(2);
    const GT = Number(ST - Discount - LVA1);
    const total = Number(GT + T22_SCharge - SCharge_dsc1);
    const total1 = Number(total.toFixed(2));

    cy.get(".bg-black > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "799.00"
    );
    cy.get(".bg-black > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      Discount
    );
    cy.get(".bg-black > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      LVA1
    );
    cy.get(":nth-child(4) > :nth-child(2)").should("have.text", T22_SCharge);
    cy.get(":nth-child(5) > :nth-child(2)").should("have.text", SCharge_dsc1);
    cy.get(".font-extrabold > :nth-child(2)").should("have.text", total1);

    cy.contains("Payment").click();

    cy.contains("CASH").click();
    cy.get("#customerName").click().type("YOR");
    cy.get(".border-blue-500").click();
    cy.get(".my-5 > .grid > :nth-child(1) > .text-green-700").click();
    cy.contains("Transaction Complete.").should(
      "have.text",
      "Transaction Complete."
    );
    cy.wait(2000);

    cy.get("#postypcde").select("DINE IN").wait(2000);
    cy.get("#warcde").select("Jollibee 1").wait(2000);
    cy.contains("Proceed").click();

    cy.contains("Void Transaction").click();
    cy.get(".me-2").should("have.text", "Void Transaction");
    cy.contains("INV-0000000000000022").click().wait(1500);

    cy.contains("Set void reason").should("have.text", "Set void reason");
    cy.get("#voidreason").select("Customer Cancelled Order");
    cy.get(".border-blue-500").click();

    // cy.get(".Toastify__toast-body > :nth-child(2)").should(
    //   "have.text",
    //   "Transaction Void Successfull"
    // );
  })

});
