
let assertionResults = [];
let failureMessages = [];

describe('Item Subclassification', () => {

    before(() => {

        // Clear the itemsubclassfile table before tests
        cy.task("queryDb","TRUNCATE TABLE itemsubclassfile")

        // Verify that the table is empty
        cy.task("queryDb", "SELECT * FROM itemsubclassfile").then((records) => {

            expect(records.length).to.be.equal(0)
            
        })

        // Delete all file in downloads for check print functinality test case
        cy.task('clearDownloads')

        // Excel file to JSON Converter
        cy.wait(4000)
        cy.execute('npm run sheet-converter master-itemsubclass-data')
        cy.execute('npm run sheet-converter itemsubclass-selector-assert')
        cy.execute('npm run sheet-converter itemsubclass-add-el')
        cy.execute('npm run sheet-converter itemsubclass-edit-el')
        cy.wait(4000)

    })
    
    beforeEach(() => {

        // reset for each test case
        assertionResults = [];
        failureMessages = [];

        // Login with valid credentials
        cy.login('lstv', 'lstventures')

    })

    after(() => {

        // delete unecessary inputed data in the table 'itemsubclassfile'

        cy.fixture('data-to-delete.json').then((data) => {

            // Loop through each character and delete corresponding rows from the 'itemsubclassfile' table
            data.forEach((item) => {

                const specialChar = item.dataToDelete;
                const deleteQuery = `DELETE FROM itemsubclassfile WHERE itemsubclassdsc = '${specialChar}'`;
                
                cy.task('queryDb', deleteQuery).then(() => {

                    cy.log(`Deleted data with description: ${specialChar}`); // Log successful deletions

                })
            })
    
            // Ensure the table is clear of specified data
            cy.task('queryDb', 'SELECT * FROM itemsubclassfile').then((records) => {

                const remainingData = records.map((record) => record.description);
                const deletedChars = data.map((item) => item.dataToDelete);
                
                // Ensure no deleted special characters are still in the table
                deletedChars.forEach((char) => {

                    expect(remainingData).to.not.include(char);

                })
    
                cy.log('Specified data Successfully deleted.'); // Log success
            })
        })
    })

    it('Check Item Subclassification Page', () => {   

        cy.navigateToModule('Master File', 'Item Subclassifications')

        cy.url({timeout: 10000}).should('contain', '/itemSubclassifications/?menfield=masterfile_itemsub')


        cy.checkElementVisibility('.h-screen ', '1.2', 'Upon Navigating to Item Subclassification:', ' "Add Item Subclassification" modal window was not visible or active.', assertionResults, failureMessages)

        cy.wait(2000)

        cy.checkHeaderTitle(':nth-child(1) > .text-\\[2rem\\]','1.2.1', 'Upon Navigating to Item Subclassification pager U/I', 'Item Subclassification', assertionResults, failureMessages)

        cy.wait(2000)

        cy.checkTableColumnTitle(['Actions', 'Item Subclassification', 'Item Classification'], '1.2.2', 'Upon Navigating to Item Subclassification pager U/I', assertionResults, failureMessages)

        // 1.2.3 Check correct button(s) caption.
        // Not necessary since buttons in pager U/I does not have captions.

        // 1.2.4 Check correct objects position.
        // Add this when needed.  

        cy.validateElements('itemsubclass-selector-assert.json', '1.2.5', 'Upon Navigating to Item Subclassification pager U/I', assertionResults, failureMessages)

        // Consolidate the results of various assertions across multiple custom commands into a single summary.
        cy.checkForFailure(assertionResults, failureMessages)
    })

    it('Add Functionality', () => {

        cy.fixture('master-itemsubclass-data.json').then((data) => {

            cy.get('.sc-eDLKkx > .anticon > svg').click()

            cy.wait(4000) 
            
            cy.checkElementVisibility('.shadow-lg', '2.1', 'Upon Clicking the "Save" button:', '"Add Item Subclassification" modal window was not visible or active.', assertionResults, failureMessages)

            cy.checkHeaderTitle('.px-8', '2.1.1', 'Upon clicking the "Add" button on pager UI', 'Add Item Subclassification', assertionResults, failureMessages)

            cy.checkLabelCaption('label[for="itemsubclassdsc"]', '2.1.2', 'Upon clicking the "Add" button on pager U/I', 'Item Subclassification *', assertionResults,failureMessages)

            cy.checkLabelCaption('label[for="itmclacde"]', '2.1.2', 'Upon clicking the "Add" button on pager U/I', 'Item Classification *', assertionResults, failureMessages)

            cy.get('#itemsubclassdsc').invoke('outerWidth').then((width) => {

                expect(width).to.equal(420)
                   
            })

            cy.get('#itmclacde').invoke('outerWidth').then((width) => {

                expect(width).to.equal(420)
                   
            })
            
            // 2.1.5 Check correct all object position

            cy.validateElements('itemsubclass-add-el.json', '2.1.4 & 2.1.6', 'Upon clicking the "Add" button on pager U/I:', assertionResults, failureMessages)

            cy.fixture('dropdown-values.json').then((data) => { 

                const expectedItems = data.itemclass;
    
                cy.wait(2000)
    
                cy.get('select[name="itmclacde"]').as('dropdown')
    
                cy.get('@dropdown')
                  .find('option')
                  .should('have.length', expectedItems.length + 1)
                  .each((option, index) => {
    
                    if (index > 0) {

                        cy.wrap(option).should('have.text', expectedItems[index - 1])

                    }
                })
            })

            // cy.get('svg[data-icon="close"][viewBox="64 64 896 896"]') .click()

            for (const key in data){

                // cy.get('.sc-eDLKkx > .anticon > svg').click()

                cy.wait(4000)

                if (data[key].itemSubclass === "null") {

                    cy.get('#itemsubclassdsc').clear().type(data[key].itemSubclass)

                    cy.get('.border-blue-500').click()

                    cy.wait(4000)

                    cy.checkLabelCaption('.text-sm', '13.2', 'Upon clicking the "Save" button:', 'Item Classification * is required', assertionResults, failureMessages)

                    cy.get('#itemsubclassdsc').clear()

                    cy.get('#itmclacde').select(data[key].itemClass)

                    cy.get('.border-blue-500').click()

                    cy.checkLabelCaption('.text-sm', '13.1', 'Upon clicking the "Save" button:', 'Item Subclassification * is required', assertionResults, failureMessages)

                    cy.wait(4000)

                    cy.get('#itemsubclassdsc').type('Chicken')

                    cy.get('#itmclacde').select('Food')

                    cy.get('.border-blue-500').click()

                    cy.wait(2000)

                    cy.checkLabelCaption('.Toastify__toast-body', '15.1', 'Upon Clicking the "Save" button:', 'Duplicate entry! Kindly check your inputs', assertionResults, failureMessages) 

                } 
                
                else if (data[key].itemSubclass === "Milkshakes") {

                    cy.wait(4000)

                    cy.checkLabelCaption('.bg-green-200', '4.2.3', 'Upon Clicking the "Save" button:', 'To add another data, fill out the details below then click "Save" button. Click "Cancel" button to cancel adding new data.', assertionResults, failureMessages)

                    cy.get('#itemsubclassdsc').clear().type(data[key].itemSubclass)

                    cy.get('#itmclacde').realClick()

                    cy.get('.border-red-500').click()

                    cy.checkLabelCaption('.h-auto', '8.1', 'Upon Clicking the "Save" button:', 'Are you sure you want to cancel?', assertionResults, failureMessages)

                    cy.get('.bg-black\\/75 > .bg-white > .justify-center > .border-red-500').click()

                    cy.wait(3000)

                    cy.checkElementVisibility('.shadow-lg', '8.2.1', 'Upon Clicking the "No" button:', 'The "Add Item Subclassification" modal window was not visible or active.', assertionResults, failureMessages)

                    cy.get('.border-red-500').click()

                    cy.get('.bg-black\\/75 > .bg-white > .justify-center > .border-blue-500').click()

                    cy.wait(3000)

                    cy.checkElementInvisibility('.shadow-lg', '48.3.1', 'Upon Clicking the "Yes" button:', 'The "Add Item Subclassification" modal window was not visible or active.', assertionResults, failureMessages)

                    cy.checkHeaderTitle(':nth-child(1) > .text-\\[2rem\\]', '40.3.2', 'Upon clicking the "Yes" button', 'Item Subclassification', assertionResults, failureMessages)

                    cy.wait(4000)

                    cy.get('.sc-eDLKkx > .anticon > svg').click()
                }

                else if (data[key].itemSubclass === "% & ( ) / - .") {

                    cy.wait(4000)

                    cy.get('#itemsubclassdsc').clear().type(data[key].itemSubclass)

                    cy.get('#itmclacde').select(data[key].itemClass)

                    cy.get('.border-blue-500').click()

                    cy.wait(2000)

                    cy.checkLabelCaption('.Toastify__toast-body', '11.1', 'Upon Clicking the "Save" button:', 'Successfully saved.', assertionResults, failureMessages) 

                    cy.wait(2000)

                    cy.checkElementVisibility('.shadow-lg', '11.2.1', 'Upon clicking the "OK" button:', 'The "Add Item Subclassification" modal window was not visible or active.', assertionResults, failureMessages)

                    // 43.2.2 Check if the "Description" textbox object is cleared or blank.

                }

                else if (data[key].itemSubclass === "Jollibee Filipino Sweet Style Spaghetti Langhap Sarap") {

                    cy.wait(4000)

                    cy.get('#itemsubclassdsc').clear().type(data[key].itemSubclass)

                    // cy.checkElementVisibility('.Toastify__toast-body', '19.2', 'Upon encoding data:', 'The validation message for "Please limit your input to 50 characters." was not visible.', assertionResults, failureMessages)

                    cy.checkInputMaxLength('#itemsubclassdsc', 50, '16.2', 'Upon Encoding in "Item Subclassification" Textbox:', assertionResults, failureMessages)

                    cy.get('#itmclacde').select(data[key].itemClass)

                    // Click "Save" button.
                    cy.get('.border-blue-500').click()
                }

                else if (data[key].itemSubclass === "© ™ ® à á â ñ ä ¢ £ ¥ € ! @ # $ ^ * _ + = < > ? ` ~ \" | \\ [ ] ; :") {

                    cy.wait(4000)

                    cy.get('#itemsubclassdsc').clear().type(data[key].itemSubclass)

                    cy.checkLabelCaption('.Toastify__toast-body', '17.1', 'Upon encoding not allowed special characters:', 'Please use only the following approved special characters: % & ( ) / - .', assertionResults, failureMessages)

                    cy.get('#itmclacde').select(data[key].itemClass)

                    cy.get('.border-blue-500').click()

                    cy.wait(2000)

                    // cy.checkLabelCaption('.Toastify__toast-body', '15.1', 'Upon Clicking the "Save" button:', 'Please use only the following approved special characters: % & ( ) / - .', assertionResults, failureMessages) 

                    cy.checkElementVisibility('.shadow-lg', '15.2.1', 'Upon clicking the "OK" button:', 'The "Add Void/Refund Reasons" modal window was visible or active.', assertionResults, failureMessages)                        

                }

                else {

                    cy.wait(8000)

                    cy.get('#itemsubclassdsc').clear().type(data[key].itemSubclass)

                    cy.get('#itmclacde').select(data[key].itemClass)

                    cy.get('.border-blue-500').click()

                    cy.checkLabelCaption('.Toastify__toast-body', '4.1', 'Upon Clicking the "Save" button:', 'Successfully saved.', assertionResults, failureMessages) 

                    cy.wait(3000)
                    
                    cy.checkElementVisibility('.shadow-lg', '4.2.1', 'Upon Clicking the "Save" button:', 'The "Add Item Subclassification" modal window was not visible or active.', assertionResults, failureMessages)

                    // cy.get('.MuiSelect-select.MuiTablePagination-select').click()

                    // cy.get('ul[role="listbox"] li').contains('15').click()

                    // cy.get('.MuiTableBody-root').contains(data[key].itemSubclass).should('exist')
                }
            }
        })

        cy.wait(4000)

        cy.checkForFailure(assertionResults, failureMessages)
        
    })

    it('Edit Functionality', () => {

        cy.get('.border-red-500').click()

        cy.fixture('master-itemsubclass-data.json').then((data) => {

            const specificItemSubclass = data[1];

                cy.get('.MuiSelect-select.MuiTablePagination-select').click();

                cy.get('ul[role="listbox"] li').contains('100').click();

                cy.wait(4000);

                cy.contains('tbody > tr', specificItemSubclass.itemSubclass).within(() => {

                    cy.get('[data-icon="edit"][aria-hidden="true"]').click()
                })

                cy.wait(4000)

                cy.checkElementVisibility('.shadow-lg', '22.1', 'Upon Clicking the "Edit" button:', 'The "Edit Item Subclassification" modal window was not visible or active.', assertionResults, failureMessages)

                cy.checkHeaderTitle('.px-8', '22.1.1', 'Upon clicking the "Edit" button on pager UI', 'Edit Item Subclassification', assertionResults, failureMessages)

                cy.checkLabelCaption('label[for="itemsubclassdsc"]', '2.1.2', 'Upon clicking the "Edit" button on pager U/I', 'Item Subclassification *', assertionResults,failureMessages)

                cy.checkLabelCaption('label[for="itmclacde"]', '2.1.2', 'Upon clicking the "Edit" button on pager U/I', 'Item Classification *', assertionResults, failureMessages)
            
                // Check correct object (textbox) width
                // Add when needed

                cy.validateElements('itemsubclass-edit-el.json', '22.1.4 & 22.1.6', 'Upon clicking the "Add" button on pager U/I:', assertionResults, failureMessages)

                cy.get('#itemsubclassdsc')
                    .should('have.value', specificItemSubclass.itemSubclass)
                    .clear()

                cy.get('#itemsubclassdsc').type(specificItemSubclass.editItemSubclass)

                cy.get('#itmclacde').select(specificItemSubclass.editItemClass)

                cy.get('.border-blue-500').click()

                cy.wait(2000)

                cy.checkLabelCaption('.Toastify__toast-body', '25.1', 'Upon Clicking the "Save" button:', 'Successfully updated.', assertionResults, failureMessages)

                cy.checkElementInvisibility('.shadow-lg', '25.2.1', 'Upon Clicking the "Update Data" button:', 'The "Edit Item Subclassification" modal window still visible', assertionResults, failureMessages)

                cy.get('.MuiTableBody-root').contains(specificItemSubclass.editItemSubclass).should('exist')

        })

        cy.wait(4000)

        cy.checkForFailure(assertionResults, failureMessages)
    })

    it('Delete Functionality', () => {

        cy.fixture('master-itemsubclass-data.json').then((data) => {
            
            const specificItemSubclass = data[2];

                cy.wait(2000)

                cy.contains('tbody > tr', specificItemSubclass.itemSubclass).within(() => {

                    cy.get('[data-icon="delete"][aria-hidden="true"]').click()

                })


                cy.checkElementVisibility('.px-8', '30.1', 'Upon clicking the "Delete" button on pager UI:', 'The "Delete Confirmation" modal is not visible.')


                cy.checkHeaderTitle('.px-8', '30.2', 'Upon clicking the "Delete" button on pager UI:', 'Delete Confirmation', assertionResults, failureMessages)
                

                cy.checkLabelCaption('.h-\\[500px\\] > h1', 'Do you want to delete: ' + specificItemSubclass.editItemClass + ' ?', assertionResults, failureMessages)

                cy.validateElements('delete-confirm-el.json', '30.3', 'Upon clicking the "Delete" button on pager U/I:', assertionResults, failureMessages)

                cy.get('.border-blue-500').click()

                cy.wait(3000)

                cy.checkElementInvisibility('.shadow-lg', '30.4.1', 'Upon Clicking the "Cancel" button:', 'The "Delete Confirmation" modal window still visible.', assertionResults, failureMessages)

                cy.wait(3000)

                cy.contains('tbody > tr', specificItemSubclass.itemSubclass).within(() => {
                    // 29. Click the delete button within this row
                    cy.get('[data-icon="delete"][aria-hidden="true"]').click()
                })

                cy.get('.border-red-500').click()

                cy.wait(2000)

                cy.checkLabelCaption('.Toastify__toast-body', '30.5.1', 'Upon Clicking the "Save" button:', 'Successfully deleted.', assertionResults, failureMessages) 

                cy.checkElementInvisibility('.shadow-lg', '30.5.2 ', 'Upon Clicking the "Confirm" button:', 'The "Delete Confirmation" modal window still visible.', assertionResults, failureMessages)

        })

        cy.wait(4000)

        cy.checkForFailure(assertionResults, failureMessages)
    })


    it('Search Functionality', () => {

        cy.fixture('master-itemsubclass-data.json').then((data) => {

            const specificItemSubclass = data[4];

                cy.wait(2000);


                cy.get('[data-testid="SearchIcon"]')
                    .click();

  
                cy.get('#\\:re\\:')
                  .clear()
                  .type(specificItemSubclass.itemSubclass)
                  .type('{enter}')

                cy.wait(2000)
   
                cy.get('.MuiTableBody-root').contains(specificItemSubclass.itemSubclass).should('exist')
        })

        cy.wait(2000);
                
                cy.get('[data-testid="SearchIcon"]').click()

                cy.get('#\\:re\\:')
                  .clear()
                  .type('Mashed Potatoes')
                   .type('{enter}')

                cy.wait(4000)

                cy.get('td > .MuiTypography-root').should('have.text', 'No records to display')
    });

    it('Print functionality', () => {

        cy.wait(2000)

        cy.xpath('//span[@aria-label="printer"]').click()

        cy.wait(8000)

        cy.task('verifyDownloads', Cypress.config('downloadsFolder')).then((files) => {

            const fileName = files.find(file => /^[0-9a-fA-F\-]+\.pdf$/.test(file))

            expect(fileName).to.exist;
        })
    })

    it('Back Button Functionality', () => {

        cy.wait(2000);

        cy.get(':nth-child(1) > .flex > .anticon > svg').click()

        cy.get('.text-\\[3rem\\]').should('be.visible')
          .should('have.text', 'Masterfile')
    })
})
