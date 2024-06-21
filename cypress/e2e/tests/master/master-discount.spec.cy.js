
let assertionResults = [];
let failureMessages = [];

describe('Discount', () => {


    before(() => {

        cy.task("queryDb","TRUNCATE TABLE discountfile")

        cy.task("queryDb", "SELECT * FROM discountfile").then((records) => {
            expect(records.length).to.be.equal(0)
        })

        cy.task('clearDownloads')

        cy.wait(4000)
        cy.execute('npm run sheet-converter master-discount-data')
        cy.execute('npm run sheet-converter module-selector-assert')
        cy.execute('npm run sheet-converter discount-add-el')
        cy.execute('npm run sheet-converter discount-edit-el')
        cy.wait(4000)

    })
    
    beforeEach(() => {

        assertionResults = [];
        failureMessages = [];

        cy.login('lstv', 'lstventures')

    })

    it('Check Discounts Page', () => {   

        cy.navigateToModule('Master File', 'Discounts')

        cy.url({timeout: 10000}).should('contain', '/discount/?menfield=masterfile_discounts')

        cy.checkElementVisibility('.h-screen ', '1.2', 'Upon Navigating to Discounts:', '"Discounts" modal window was not visible or active.', assertionResults, failureMessages)

        cy.wait(2000)

        cy.checkHeaderTitle(':nth-child(1) > .text-\\[2rem\\]','1.2.1', 'Upon Navigating to Discount pager U/I', 'Discounts', assertionResults, failureMessages)

        cy.wait(2000)

        cy.checkTableColumnTitle(['Actions', 'Description'], '1.2.2', 'Upon Navigating to Discount pager U/I', assertionResults, failureMessages)

        cy.validateElements('module-selector-assert.json', '1.2.5', 'Upon Navigating to Discount pager U/I:', assertionResults, failureMessages)

        cy.checkForFailure(assertionResults, failureMessages)
    })

    it('Add Functionality', () => {

        cy.fixture('master-discount-data.json').then((data) => {

            cy.get('.sc-eDLKkx > .anticon > svg').click()

            cy.wait(4000) 
            
            cy.checkElementVisibility('.shadow-lg', '2.1', 'Upon Clicking the "Save" button:', '"Add Discount" modal window was not visible or active.', assertionResults, failureMessages)

            cy.checkHeaderTitle('.px-8', '2.1.1', 'Upon clicking the "Add" button on pager UI', 'Add Discount', assertionResults, failureMessages)

            cy.checkLabelCaption('label[for="discde"]', '2.1.2', 'Upon clicking the "Add" button on pager U/I', 'Code *', assertionResults, failureMessages)

            cy.checkLabelCaption('label[for="disdsc"]', '2.1.2', 'Upon clicking the "Add" button on pager U/I', 'Description *', assertionResults, failureMessages)

            cy.checkLabelCaption('label[for="distyp"]', '2.1.2', 'Upon clicking the "Add" button on pager U/I', 'Type *', assertionResults, failureMessages)
            
            cy.get('#discde').invoke('outerWidth').then((width) => {

                expect(width).to.equal(403)
                   
            })

            cy.get('#disdsc').invoke('outerWidth').then((width) => {

                expect(width).to.equal(403)
                   
            })

            cy.get('#distyp').invoke('outerWidth').then((width) => {

                expect(width).to.equal(403)
                   
            })

            // 2.1.5 Check correct all object position

            cy.validateElements('discount-add-el.json', '2.1.4 & 2.1.6', 'Upon clicking the "Add" button on pager U/I:', assertionResults, failureMessages)

            cy.get('svg[data-icon="close"][viewBox="64 64 896 896"]') .click()

            for (const key in data){

                cy.get('.sc-eDLKkx > .anticon > svg').click()
                
                cy.get('#discde')
                  .clear().type(data[key].discountCode)
                  .then(($input) => {

                    if ($input.val() === "null") {
                        
                        cy.get('#discde').clear()

                        cy.get('#disdsc').clear()

                        cy.get('.border-blue-500').click()


                        cy.checkLabelCaption('div:contains("Code *")', '33.2', 'Upon clicking the "Save" button:', 'Code * is required', assertionResults, failureMessages)

                        cy.checkLabelCaption('div:contains("Discount Description *")', '33.3', 'Upon clicking the "Save" button:', 'Description * is required', assertionResults, failureMessages)

                        cy.checkLabelCaption('div:contains("Type *")', '13.4', 'Upon clicking the "Save" button:', 'Type * is required', assertionResults, failureMessages)

                        cy.get('#discde').clear().type('PWD')

                        cy.get('#disdsc').clear().type('PWD')

                        cy.get('#distyp').select('Percent')

                        cy.get('#disper').clear().type('20')

                        cy.get('#ExemptYes').click()

                        cy.get('#SCNo').click()

                        cy.get('#GovYes').click()

                        cy.get('#ODNo').click()

                        cy.get('.border-blue-500').click()

                        cy.checkLabelCaption('.Toastify__toast-body', '42.1', 'Upon Clicking the "Save" button:', 'Duplicate entry! Kindly check your inputs', assertionResults, failureMessages)

                        cy.wait(6000)

                        cy.get('span[role="img"] svg[data-icon="close"]').click()

                    } 
                    
                    else if ($input.val() === "SUMMERSALE") {

                        cy.get('.border-red-500').click()

                        cy.checkLabelCaption('.h-auto', '13.1', 'Upon Clicking the "Cancel" button:', 'Are you sure you want to cancel?', assertionResults, failureMessages)

                        cy.contains('button[class*="border-red-500"]', 'No').click()

                        cy.wait(3000)

                        cy.checkElementVisibility('.shadow-lg', '13.2.1', 'Upon Clicking the "No" button in "Cancel" modal:', 'The "Add Discount" modal window was not visible or active.', assertionResults, failureMessages)

                        cy.get('.border-red-500').click()

                        cy.contains('button[class*="border-blue-500"]', 'Yes').click()

                        cy.wait(3000)

                        cy.checkElementInvisibility('.shadow-lg', '13.3.1', 'Upon Clicking the "Yes" button in "Cancel" modal:', 'The "Add Discount" modal window was visible or active.', assertionResults, failureMessages)

                        cy.checkElementVisibility('.h-screen', '13.3.2', 'Upon clicking the "Yes" button, should back in Discount Pager U/I', assertionResults, failureMessages)

                        cy.wait(6000)

                    }

                    else if ($input.val() === "% & ( ) / - .") {

                        cy.get('#disdsc').clear().type(data[key].discountDesc)

                        cy.get('#distyp').select(data[key].discountType).then((selected) => {

                            const selectedValue = selected.val()

                            if (selectedValue === 'Percent') {
                            
                                cy.get('#disper').clear().type(data[key].percentAmount)

                            } else {

                                cy.get('#disamt').clear().type(data[key].percentAmount)

                            }

                        })


                        if (data[key].exemptVat === 'Yes') {

                            cy.get('#ExemptYes').click()
                        
                        } else {

                            cy.get('#ExemptNo').click()
                        }

                        if (data[key].lessVATDisc === 'Yes') {

                            cy.get('#LessYes').click()

                        } else if (data[key].lessVATDisc === 'null'){

                            // do nothing

                        } else {

                            cy.get('#LessNo').click()

                        }

                        if (data[key].serviceChargeDisc === 'Yes') {

                            cy.get('#SCYes').click()
                        
                        } else {

                            cy.get('#SCNo').click()
                        }

                        if (data[key].govDisc === 'Yes') {

                            cy.get('#GovYes').click()
                        
                        } else {

                            cy.get('#GovNo').click()
                        }

                        if (data[key].onlineDeals === 'Yes') {

                            cy.get('#ODYes').click()
                        
                        } else {

                            cy.get('#ODNo').click()
                        }

                        cy.get('.border-blue-500').click()

                        cy.checkLabelCaption('.Toastify__toast-body', '33.1', 'Upon Clicking the "Save" button:', 'Successfully saved.', assertionResults, failureMessages) 

                        cy.checkElementInvisibility('.shadow-lg', '33.2.1', 'Upon clicking the "Save" button:', 'The "Add Discount" modal window was not visible or active.', assertionResults, failureMessages)

                        // 11.2.2 Check if the "Description" textbox object is cleared or blank.

                        cy.wait(6000)

                    }

                    else if ($input.val() === "WINTERHOLIDAY50PERCENTDISCOUNTFORALLITEMSOVER1000PHP") {

                        cy.wrap($input).should('have.value', data[key].discountCode)

                        cy.get('#disdsc').clear().type(data[key].discountDesc)

                        cy.get('#distyp').select(data[key].discountType).then((selected) => {

                            const selectedValue = selected.val()

                            if (selectedValue === 'Percent') {
                            
                                cy.get('#disper').clear().type(data[key].percentAmount)

                            } else {

                                cy.get('#disamt').clear().type(data[key].percentAmount)

                            }

                        })


                        if (data[key].exemptVat === 'Yes') {

                            cy.get('#ExemptYes').click()
                        
                        } else {

                            cy.get('#ExemptNo').click()
                        }

                        if (data[key].lessVATDisc === 'Yes') {

                            cy.get('#LessYes').click()

                        } else if (data[key].lessVATDisc === 'null'){

                            // do nothing

                        } else {

                            cy.get('#LessNo').click()

                        }

                        if (data[key].serviceChargeDisc === 'Yes') {

                            cy.get('#SCYes').click()
                        
                        } else {

                            cy.get('#SCNo').click()
                        }

                        if (data[key].govDisc === 'Yes') {

                            cy.get('#GovYes').click()
                        
                        } else {

                            cy.get('#GovNo').click()
                        }

                        if (data[key].onlineDeals === 'Yes') {

                            cy.get('#ODYes').click()
                        
                        } else {

                            cy.get('#ODNo').click()
                        }

                        cy.checkElementVisibility('.text-sm', '14.1', 'Upon encoding data:', 'The validation message "Please limit your input to 50 characters." was not visible.', assertionResults, failureMessages)

                        cy.get('.border-blue-500').click()

                        cy.wait(6000)

                    }

                    else if ($input.val() === "© ™ ® à á â ñ ä ¢ £ ¥ € ! @ # $ ^ * _ + = < > ? ` ~ \" | \\ [ ] ; :") {

                        cy.get('#disdsc').clear().type(data[key].discountDesc)

                        cy.get('#distyp').select(data[key].discountType).then((selected) => {

                            const selectedValue = selected.val()

                            if (selectedValue === 'Percent') {
                            
                                cy.get('#disper').clear().type(data[key].percentAmount)

                            } else {

                                cy.get('#disamt').clear().type(data[key].percentAmount)

                            }

                        })


                        if (data[key].exemptVat === 'Yes') {

                            cy.get('#ExemptYes').click()
                        
                        } else {

                            cy.get('#ExemptNo').click()
                        }

                        if (data[key].lessVATDisc === 'Yes') {

                            cy.get('#LessYes').click()

                        } else if (data[key].lessVATDisc === 'null'){

                            // do nothing

                        } else {

                            cy.get('#LessNo').click()

                        }

                        if (data[key].serviceChargeDisc === 'Yes') {

                            cy.get('#SCYes').click()
                        
                        } else {

                            cy.get('#SCNo').click()
                        }

                        if (data[key].govDisc === 'Yes') {

                            cy.get('#GovYes').click()
                        
                        } else {

                            cy.get('#GovNo').click()
                        }

                        if (data[key].onlineDeals === 'Yes') {

                            cy.get('#ODYes').click()
                        
                        } else {

                            cy.get('#ODNo').click()
                        }

                        cy.get('.border-blue-500').click()

                        cy.checkLabelCaption('.Toastify__toast-body', '51.1', 'Upon Clicking the "Save" button:', '"Please use only the following approved special characters: % & ( ) / - ."', assertionResults, failureMessages) 

                        cy.checkElementInvisibility('.shadow-lg', '51.2', 'Upon clicking the "Save" button:', 'The "Add Discount" modal window was not visible or active.', assertionResults, failureMessages)

                        // Check if the "Description" textbox object is cleared or blank. 

                        cy.wait(6000)

                    }

                    else {

                        cy.wrap($input).should('have.value', data[key].discountCode)

                        cy.get('#disdsc').clear().type(data[key].discountDesc)

                        cy.get('#distyp').select(data[key].discountType).then((selected) => {

                            const selectedValue = selected.val()

                            if (selectedValue === 'Percent') {
                            
                                cy.get('#disper').clear().type(data[key].percentAmount)

                            } else {

                                cy.get('#disamt').clear().type(data[key].percentAmount)

                            }

                        })

                        if (data[key].exemptVat === 'Yes') {

                            cy.get('#ExemptYes').click()
                        
                        } else {

                            cy.get('#ExemptNo').click()
                        }

                        if (data[key].lessVATDisc === 'Yes') {

                            cy.get('#LessYes').click()

                        } else if (data[key].lessVATDisc === 'null'){

                            // do nothing

                        } else {

                            cy.get('#LessNo').click()

                        }

                        if (data[key].serviceChargeDisc === 'Yes') {

                            cy.get('#SCYes').click()
                        
                        } else {

                            cy.get('#SCNo').click()
                        }

                        if (data[key].govDisc === 'Yes') {

                            cy.get('#GovYes').click()
                        
                        } else {

                            cy.get('#GovNo').click()
                        }

                        if (data[key].onlineDeals === 'Yes') {

                            cy.get('#ODYes').click()
                        
                        } else {

                            cy.get('#ODNo').click()
                        }

                        cy.get('.border-blue-500').click()


                        cy.checkLabelCaption('.Toastify__toast-body', '11.1', 'Upon Clicking the "Save" button:', 'Successfully saved.', assertionResults, failureMessages) 

                        cy.wait(6000)
                        
                        cy.checkElementVisibility('.shadow-lg', '11.2', 'Upon Clicking the "Save" button:', 'The "Add Discount" modal window was not visible or active.', assertionResults, failureMessages)

                        cy.get('.MuiTableBody-root').contains(data[key].discountCode).should('exist')

                        cy.wait(8000)
                    }
                }) 
            }
        }) 

        cy.wait(2000)

        cy.checkForFailure(assertionResults, failureMessages)
        
    })

    it('Edit Functionality', () => {

        cy.wait(8000)

        cy.fixture('master-discount-data.json').then((data) => {

        const specificdiscount = data[6];

            cy.wait(2000)

            cy.contains('tbody > tr', specificdiscount.discountCode).within(() => {

                cy.get('[data-icon="edit"][aria-hidden="true"]').click()

            })

            cy.checkElementVisibility('.shadow-lg', '22.1', 'Upon Clicking the "Edit" button:', '"Edit Discount" modal window was not visible or active.', assertionResults, failureMessages)

            cy.checkHeaderTitle('.px-8', '22.1.1', 'Upon clicking the "Edit" button on pager UI', 'Edit Discount', assertionResults, failureMessages)

            cy.checkLabelCaption('.mb-2', '22.1.2', 'Upon clicking the "Edit" button on pager U/I', 'Discount *', assertionResults, failureMessages)
        
            // 21.1.3 Check correct object (textbox) width
            // Add when needed

            // 21.1.4 Check correct buttons(s) caption

            // 21.1.5 Check correct all object position

            cy.validateElements('discount-edit-el.json', '19.1.4 & 19.1.6', 'Upon clicking the "Edit" button on pager U/I:', assertionResults, failureMessages)

            cy.get('#discde')
                .should('have.value', specificdiscount.discountCode)
                .clear()

            cy.get('#discde').clear().type(specificdiscount.editDiscountCode)

            cy.get('#disdsc')
              .clear()
              .clear().type(specificdiscount.editDiscountDesc)

            cy.get('#distyp').select(specificdiscount.editDiscountType).then((selected) => {

                const selectedValue = selected.val()

                if (selectedValue === 'Percent') {
                
                    cy.get('#disper').clear().type(specificdiscount.editPercentAmount)

                } else {

                    cy.get('#disamt').clear().type(specificdiscount.editPercentAmount)

                }

            })

            if (specificdiscount.editExemptVAT === 'Yes') {

                cy.get('#ExemptYes').click()

            } else {

                cy.get('#ExemptNo').click()
            }

            if (specificdiscount.editLessVATDisc === 'Yes') {

                cy.get('#LessYes').click()

            } else if (specificdiscount.editLessVATDisc === 'null'){

                // do nothing

            } else {

                cy.get('#LessNo').click()

            }

            if (specificdiscount.editServiceChargeDisc === 'Yes') {

                cy.get('#SCYes').click()

            } else {

                cy.get('#SCNo').click()
            }

            if (specificdiscount.editGovDisc === 'Yes') {

                cy.get('#GovYes').click()

            } else {

                cy.get('#GovNo').click()
            }

            if (specificdiscount.onlineDeals === 'Yes') {

                cy.get('#ODYes').click()

            } else {

                cy.get('#ODNo').click()
            }

            cy.get('.border-blue-500').click()

            cy.checkLabelCaption('.Toastify__toast-body', '62.1', 'Upon Clicking the "Save" button:', 'Successfully updated.', assertionResults, failureMessages)

            cy.checkElementInvisibility('.shadow-lg', '62.2.1', 'Upon Clicking the "Update" button:', 'The "Edit Discount" modal window still visible', assertionResults, failureMessages)

            cy.get('.MuiTableBody-root').contains(specificdiscount.editDiscountDesc).should('exist')
        })

        cy.wait(4000)

        cy.checkForFailure(assertionResults, failureMessages)
    })

    it('Delete Functionality', () => {

        cy.fixture('master-discount-data.json').then((data) => {
            
            for (const key in data) {

                if (data[key].onlyDelete === true) {

                    cy.wait(2000)

                    cy.contains('tbody > tr', data[key].discountDesc).within(() => {

                        cy.get('[data-icon="delete"][aria-hidden="true"]').click()

                    })

                    cy.checkHeaderTitle('.px-8', '63.1', 'Upon clicking the "Delete" button on pager UI', 'Delete Confirmation', assertionResults, failureMessages)
                    
                    cy.checkLabelCaption('.h-\\[500px\\] > h1', '63.3', 'Upon clicking the "Delete" button on pager UI', 'Do you want to delete: ' + data[key].discountDesc + ' ?', assertionResults, failureMessages);

                    cy.contains('button[class*="border-blue-500"]', 'Cancel').click()

                    cy.wait(3000)

                    cy.checkElementInvisibility('.shadow-lg', '36.4.1', 'Upon Clicking the "Cancel" button:', 'The "Delete Confirmation" modal window still visible.', assertionResults, failureMessages)

                    cy.contains('tbody > tr', data[key].discountDesc).within(() => {

                        cy.get('[data-icon="delete"][aria-hidden="true"]').click()

                    })

                    cy.contains('button[class*="border-red-500"]', 'Confirm').click()

                    cy.checkLabelCaption('.Toastify__toast-body', '63.5.1', 'Upon Clicking the "Save" button:', 'Successfully deleted.', assertionResults, failureMessages) 

                    cy.checkElementInvisibility('.shadow-lg', '63.5.2', 'Upon Clicking the "Confirm" button:', 'The "Delete Confirmation" modal window still visible.', assertionResults, failureMessages)
                }
            }

        })

        cy.checkForFailure(assertionResults, failureMessages)
    })

    it('Search Functionality', () => {

        cy.fixture('master-discount-data.json').then((data) => {

            for (const key in data) {

                if (data[key].onlySearchVal === true) {

                    // search valid data
                    cy.wait(2000)

                    cy.get('[data-testid="SearchIcon"]').click()
    
                    cy.get('input[placeholder="Search Discount"]')
                    .clear()
                    .clear().type(data[key].discountDesc)

                    cy.wait(2000)
    
                    cy.get('.MuiTableBody-root').contains(data[key].discountDesc).should('exist')

                }

                if (data[key].onlySearchInval === true) {

                    // search invalid or not existing data
                    cy.wait(2000)
                
                    cy.get('[data-testid="SearchIcon"]').click()

                    cy.get('input[placeholder="Search Discount"]')
                    .clear()
                    .clear().type(data[key].discountDesc)

                    cy.wait(4000)

                    cy.get('td > .MuiTypography-root').should('have.text', 'No records to display')

                }

            }
        })
    })

    it('Print functionality', () => {

        cy.wait(2000)

        cy.xpath('//span[@aria-label="printer"]').click()

        cy.wait(15000)

        cy.task('verifyDownloads', Cypress.config('downloadsFolder')).then((files) => {

            const fileName = files.find(file => /^[0-9a-fA-F\-]+\.pdf$/.test(file))

            expect(fileName).to.exist;

        })
    })

    it('Back Button Functionality', () => {

        cy.wait(2000);

        cy.get(':nth-child(1) > .flex > .anticon > svg').click();

        cy.get('.text-\\[3rem\\]').should('be.visible')
          .and('have.text', 'Masterfile');
    })
})
