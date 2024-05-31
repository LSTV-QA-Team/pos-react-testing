let assertionResults = [];
let failureMessages = [];

describe('Receipt Footer Set Up', () => {


    before(() => {

        // Excel file to JSON Converter
        cy.wait(4000)
        cy.execute('npm run sheet-converter master-footer-data')
        cy.execute('npm run sheet-converter footer-selector-assert')
        cy.wait(4000)

    })
    
    beforeEach(() => {

        // reset for each test case
        assertionResults = [];
        failureMessages = [];

        // Login with valid credentials
        cy.login('lstv', 'lstventures')


    })

    it('Check Receipt Footer Set Up Page', () => {   

        cy.navigateToModule('Master File', 'Footer')

        cy.url({timeout: 10000})
            .should('contain', '/masterfile/footer/?menfield=masterfile_footer')

        cy.checkElementVisibility('.shadow-lg', '1.2', 'Upon Navigating to "Receipt Footer Set Up":', '"Receipt Footer Set Up" modal window was not visible or active.', assertionResults, failureMessages)

        cy.wait(2000)

        cy.checkHeaderTitle('.px-8','1.2.1', 'Upon Navigating to "Receipt Footer Set Up" pager U/I', 'Receipt Footer Set Up', assertionResults, failureMessages)

        cy.wait(2000)

        // Check correct objects position.

        cy.validateElements('footer-selector-assert.json', '1.2.2 & 1.2.3 & 1.2.5', 'Upon Navigating to Receipt Footer Set Up pager U/I', assertionResults, failureMessages)

        cy.checkForFailure(assertionResults, failureMessages)
    });

    it('Valid Update Functionality', () => {

        cy.fixture('master-footer-data.json').then((data) => {
            for (const key in data){
                if (data[key].forValid === true) {

                    cy.wait(4000)

                    cy.get('#officialreceipt').select(data[key].officialReceipt)

                    cy.get('#supname')
                        .type(data[key].suppName)


                    cy.get('#supaddress').clear()
                        .type(data[key].suppAdd)


                    cy.get('#supvarregtin').clear()
                        .type(data[key].suppVAT)


                    cy.get('#supnonvatregtin').clear()
                        .type(data[key].suppNonVAT)
                    

                    cy.get('#accrenum').clear()
                        .type(data[key].accredNo)


                    cy.get('#accredate').clear()
                        .type(data[key].accredDate)

                    cy.get('#permitnum').clear()
                        .type(data[key].permitNo)

                    
                    cy.get('#validyr').clear()
                        .type(data[key].yearsValidity)
                    
                    cy.get('#dateissued').clear()
                        .type(data[key].dateIssued)

                    cy.get('#footermsg1').clear()
                        .type(data[key].lineMsg1)


                    cy.get('#footermsg2').clear()
                        .type(data[key].lineMsg2)


                    cy.get('#footermsg3').clear()
                        .type(data[key].lineMsg3)


                    cy.get('#footermsg4').clear()
                        .type(data[key].lineMsg4)
                        
                    cy.get('#footermsg5').clear()
                        .type(data[key].lineMsg5)
                    

                    cy.get('.border-blue-500').click()

                    cy.checkLabelCaption('.Toastify__toast-body', '3.1', 'Upon Clicking the "Update" button:', 'Successfully updated.', assertionResults, failureMessages)

                    // 17.1 Check all encoded data should reflect to the receipt (Validate on Preview) 

                    cy.contains('Footer').click()
                } 
                
            } 
        })
        cy.wait(4000)

        cy.checkForFailure(assertionResults, failureMessages)
    })

    it('Check Max Length of Input Characters', () => {
        cy.fixture('master-footer-data.json').then((data) => {
            for (const key in data){
                if (data[key].forInvalid === true) {

                    cy.wait(4000)

                    cy.get('#officialreceipt').select(data[key].officialReceipt)

                    cy.get('#supname').clear()
                        .type(data[key].suppName)

                    cy.checkInputMaxLength('#supname', 50, '22.1', 'Upon Encoding in "Supplier Name" Textbox:', assertionResults, failureMessages)

                    cy.get('#supaddress').clear()
                        .type(data[key].suppAdd)

                    cy.checkInputMaxLength('#supaddress', 50, '23.1', 'Upon Encoding in "Supplier Address" Textbox:', assertionResults, failureMessages)

                    cy.get('#supvarregtin').clear()
                        .type(data[key].suppVAT)

                    cy.checkInputMaxLength('#supvarregtin', 12, '24.1', 'Upon Encoding in "Supplier VAT Registered TIN" Textbox:', assertionResults, failureMessages)

                    cy.get('#supnonvatregtin').clear()
                        .type(data[key].suppNonVAT)
                    
                    cy.checkInputMaxLength('#supnonvatregtin', 12, '25.1', 'Upon Encoding in "Supplier Non-VAT Registered TIN" Textbox:', assertionResults, failureMessages)

                    cy.get('#accrenum').clear()
                        .type(data[key].accredNo)

                    cy.checkInputMaxLength('#accrenum', 50, '27.1', 'Upon Encoding in "Accredited No." Textbox:', assertionResults, failureMessages)

                    cy.get('#accredate').clear()
                        .type(data[key].accredDate)

                    cy.get('#permitnum').clear()
                        .type(data[key].permitNo)

                    cy.checkInputMaxLength('#permitnum', 50, '28.1', 'Upon Encoding in "Permit No." Textbox:', assertionResults, failureMessages)
                    
                    cy.get('#validyr').clear()
                        .type(data[key].yearsValidity)

                    cy.checkInputMaxLength('#validyr', 5, '29.1', 'Upon Encoding in "Years Validity" Textbox:', assertionResults, failureMessages)
                    
                    cy.get('#dateissued').clear()
                        .type(data[key].dateIssued)

                    cy.get('#footermsg1').clear()
                        .type(data[key].lineMsg1)

                    cy.checkInputMaxLength('#footermsg1', 50, '31.1', 'Upon Encoding in "Line Message 1" Textbox:', assertionResults, failureMessages)

                    cy.get('#footermsg2').clear()
                        .type(data[key].lineMsg2)

                    cy.checkInputMaxLength('#footermsg2', 50, '32.1', 'Upon Encoding in "Line Message 2" Textbox:', assertionResults, failureMessages)

                    cy.get('#footermsg3').clear()
                        .type(data[key].lineMsg3)

                    cy.checkInputMaxLength('#footermsg3', 50, '33.1', 'Upon Encoding in "Line Message 3" Textbox:', assertionResults, failureMessages)

                    cy.get('#footermsg4').clear()
                        .type(data[key].lineMsg4)

                    cy.checkInputMaxLength('#footermsg4', 50, '34.1', 'Upon Encoding in "Line Message 4" Textbox:', assertionResults, failureMessages)
                        
                    cy.get('#footermsg5').clear()
                        .type(data[key].lineMsg5)
                    
                    cy.checkInputMaxLength('#footermsg5', 50, '35.1', 'Upon Encoding in "Line Message 5" Textbox:', assertionResults, failureMessages)    
                    
                    cy.get('.border-blue-500').click()
                }
                
            } 
        })
        cy.wait(4000)

        cy.checkForFailure(assertionResults, failureMessages)
    })

    it('Check Required Field Functionality', () => {

        cy.contains('Footer').click()

        cy.wait(4000)

         // Force enable the first option
        cy.get('#officialreceipt')
            .find('option')
            .first()
            .invoke('removeAttr', 'disabled')
            .should('not.have.attr', 'disabled');
        
        cy.get('#officialreceipt').select('-- Select an option --')

        cy.get('#supname').clear()

        cy.get('#supaddress').clear()

        cy.get('#supvarregtin').clear()

        cy.get('#supnonvatregtin').clear()

        cy.get('#accrenum').clear()

        cy.get('#accredate').clear()

        cy.get('#permitnum').clear()
        
        cy.get('#validyr').clear()
        
        cy.get('#dateissued').clear()

        cy.get('#footermsg1').clear()

        cy.get('#footermsg2').clear()

        cy.get('#footermsg3').clear()

        cy.get('#footermsg4').clear()
            
        cy.get('#footermsg5').clear()

        cy.get('.border-blue-500').click()

        cy.checkLabelCaption('.Toastify__toast-body', '36.1', 'Upon Clicking the "Update" button:', 'Please input valid data.', assertionResults, failureMessages)

        cy.wait(4000)

        // cy.checkElementVisibility('.shadow-lg', '19.1', 'Upon Clicking the "Update" button:', '"Receipt Footer Set Up" modal window was not visible or active.', assertionResults, failureMessages)

        // cy.checkLabelCaption('#footer-form', '3.1', 'Upon Clicking the "Update" button:', '"Supplier Name * is required" was not visible', assertionResults, failureMessages)

        // cy.checkLabelCaption('#footer-form', '3.1', 'Upon Clicking the "Update" button:', '"Supplier Address * is required" was not visible', assertionResults, failureMessages)

        // cy.checkLabelCaption('#footer-form', '3.1', 'Upon Clicking the "Update" button:', '"Supplier VAT Registered TIN * is required" was not visible', assertionResults, failureMessages)

        // cy.checkLabelCaption('#footer-form', '3.1', 'Upon Clicking the "Update" button:', '"Supplier Non-VAT registered TIN * is required', assertionResults, failureMessages)

        // cy.checkLabelCaption('#footer-form', '3.1', 'Upon Clicking the "Update" button:', '"Accredited No. * is required"', assertionResults, failureMessages)

        // cy.checkLabelCaption('#footer-form', '3.1', 'Upon Clicking the "Update" button:', '"Permit No. * is required', assertionResults, failureMessages)

        // cy.checkLabelCaption('#footer-form', '3.1', 'Upon Clicking the "Update" button:', '"Accredited Data * is required" was not visible', assertionResults, failureMessages)

        // cy.checkLabelCaption('#footer-form', '3.1', 'Upon Clicking the "Update" button:', '"Date Issued * is required" was not visible', assertionResults, failureMessages)

        // cy.checkLabelCaption('#footer-form', '3.1', 'Upon Clicking the "Update" button:', '"Years Validity * is required" was not visible', assertionResults, failureMessages)

        cy.wait(4000)

        cy.checkForFailure(assertionResults, failureMessages)

    })

    it('Cancel Functionlity', () => {
        
        cy.contains('Footer').click()

        cy.wait(4000)

        cy.checkElementVisibility('.shadow-lg', '37.1', 'Upon Clicking the "Footer Option" in Master File Menu', '"Receipt Footer Set Up" modal window was not visible or active.', assertionResults, failureMessages)

        cy.get('.border-red-500').click()

        cy.checkElementInvisibility('.shadow-lg', '38.1', 'Upon Clicking the "Cancel" button:', '"Receipt Footer Set Up" modal window was still visible or active.', assertionResults, failureMessages)

        cy.checkElementVisibility('.h-full', '38.2', 'Upon Clicking the "Cancel" button:', '"Master File Menu" modal window was not visible or active.', assertionResults, failureMessages)

        cy.wait(4000)

        cy.checkForFailure(assertionResults, failureMessages)
    });
})