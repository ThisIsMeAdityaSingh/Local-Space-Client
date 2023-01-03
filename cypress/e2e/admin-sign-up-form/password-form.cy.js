/* eslint-disable no-undef */
describe('Admin password form testing', () => {
    const formElements = {
        'First Name' : {
          dataTest: 'primary-form-first-name',
          wrongInput: [
            {
              text: 'Ad',
              message: 'Please enter a minimum of 3 letters'
            }
          ],
          invalidInput: [
            {
              text: '64728256',
              message: 'Please enter a valid value'
            },
            {
              text: 'Adit@',
              message: 'Please enter a valid value',
            },
            {
              text: 'Adi12',
              message: 'Please enter a valid value',
            }
          ],
          correctInput: {
            text: 'Aditya',
          }
        }, 
        'Last Name' : {
          dataTest: 'primary-form-last-name',
          wrongInput: [
            {
              text: 'Si',
              message: 'Please enter a minimum of 3 letters'
            }
          ],
          invalidInput: [
            {
              text: '64728256',
              message: 'Please enter a valid value'
            },
            {
              text: 'Singh@',
              message: 'Please enter a valid value',
            },
            {
              text: 'Singh12',
              message: 'Please enter a valid value',
            }
          ],
          correctInput: {
            text: 'Singh',
          }
        }, 
        'Email' : {
          dataTest: 'primary-form-email',
          wrongInput: [
            {
              text: 'ad@g.co',
              message: 'Please enter a minimum of 8 letters'
            }
          ],
          invalidInput: [
            {
              text: 'aditya@@gmail.com',
              message: 'Please enter a valid value'
            },
            {
              text: 'aditya@gmail..com',
              message: 'Please enter a valid value',
            },
            {
              text: 'aditya_gmail.com',
              message: 'Please enter a valid value'
            },
            {
              text: 'aditya@gmail_com',
              message: 'Please enter a valid value'
            },
            {
              text: 'aditya@gmail@com',
              message: 'Please enter a valid value'
            },
            {
              text: '@aditya.gmail.com',
              message: 'Please enter a valid value'
            }
          ],
          correctInput: {
            text: 'adityasingh@gmail.com'
          }
        }, 
        'Phone number' : {
          dataTest: 'primary-form-phone-number',
          wrongInput: [
            {
              text: '123456789',
              message: 'Please enter a minimum of 10 letters'
            },
            {
              text: '1'.repeat(11),
              message: 'Please enter a maximum of 10 letters'
            }
          ],
          invalidInput: [
            {
              text: '123456Aditya',
              message: 'Please enter a valid value',
            },
            {
              text: '12345@6789',
              message: 'Please enter a valid value'
            },
            {
              text: 'Aditya@#@#',
              message: 'Please enter a valid value'
            },
            {
              text: '@#$%^&*()!',
              message: 'Please enter a valid value'
            }
          ],
          correctInput: {
            text: '9159741472'
          }
        }
    };

    const passwordData = {
        oneLetter: {
            initialCondition: 'password-one-letter-initial',
            wrongData: {
                text: ['123@#@', '32312', '#@!#'],
                dataTest: 'password-one-letter-failed'
            },
            correctInput: {
                text: ['aditya', 'a23123@#', '2323a#@!#', '#@!#A3213', 'ADITYA', 'A121312', '32321$@#$@#A'],
                dataTest: 'password-one-letter-passed'
            },
        },
        oneDigit: {
            initialCondition: 'password-one-digit-initial',
            wrongData: {
                text: ['aAd@#@', 'ADSDas!@', '@$%@'],
                dataTest: 'password-one-digit-failed'
            },
            correctInput: {
                text: ['121212', 'a23123@#', '2323a#@!#', '#@!#A3213', 'ADITYA1', 'A121312', '32321$@#$@#A'],
                dataTest: 'password-one-digit-passed'
            },
        },
        specialCharacter: {
            initialCondition: 'password-spacial-character-initial',
            wrongData: {
                text: ['aAd123', 'ADSDas12', '31231'],
                dataTest: 'password-spacial-character-failed'
            },
            correctInput: {
                text: ['121212@', 'a23123@#', '2323a#@!#', '#@!#A3213', 'ADITYA(1', 'A121312_', '32321$@#$@#A-'],
                dataTest: 'password-spacial-character-passed'
            },
        },
        passwordLength: {
            initialCondition: 'password-min-length-initial',
            wrongData: {
                text: ['aAd12', 'ADSD', '@!@3'],
                dataTest: 'password-min-length-failed'
            },
            correctInput: {
                text: ['121212@', 'a23123@#', '2323a#@!#', '#@!#A3213', 'ADITYA(1', 'A121312_', '32321$@#$@#A-'],
                dataTest: 'password-min-length-passed'
            },
        },
    };

    const correctPasswordSeries = ['Aditya@1', '1@Aditya@1', 'Adi!@12', 'Aditya_1Singh', '21312#@!#A'];

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        Object.keys(formElements).forEach(item => {
            cy.getByData(formElements[item].dataTest).clear();
            cy.getByData(formElements[item].dataTest).type(formElements[item].correctInput.text);
        });
    
        cy.getByData('primary-form-next-button').click();
    });

    context('Testing admin sign up password form', () => {
        //1. test password field
        it("TEST: Password and confirm-password fields should exist", () => {
          cy.getByData('admin-sign-up-password').should('exist');
          cy.getByData('admin-sign-up-cnfPassword').should('exist');
          // initial password checks
        });
    
        //2. check for perfect password.
        it("TEST: User should see password checks in real-time", () => {
            Object.keys(passwordData).forEach(field => {
                cy.getByData(passwordData[field].initialCondition).should('exist');
                passwordData[field].wrongData.text.forEach(item => {
                    cy.getByData('admin-sign-up-password').type(item);
                    cy.getByData(passwordData[field].wrongData.dataTest).should('exist');
                    cy.getByData('admin-sign-up-password').clear();
                    cy.getByData(passwordData[field].initialCondition).should('exist');
                });

                passwordData[field].correctInput.text.forEach(item => {
                    cy.getByData('admin-sign-up-password').type(item);
                    cy.getByData(passwordData[field].correctInput.dataTest).should('exist');
                    cy.getByData('admin-sign-up-password').clear();
                    cy.getByData(passwordData[field].initialCondition).should('exist');
                });
            });
        });
    
        //5. should activate with perfect password.
        it('TEST: User should see all green checks for valid passwords', () => {
            correctPasswordSeries.forEach(password => {
                cy.getByData('admin-sign-up-password').type(password);
                Object.keys(passwordData).forEach(check => {
                    cy.getByData(passwordData[check].correctInput.dataTest).should('exist');
                });
                cy.getByData('admin-sign-up-password').clear();
            });
        });
    
        //6. check continue feature with non-matching password and confirm password.
        it('TEST: Should not allow to continue with non-matching password and confirm password', () => {
            cy.getByData('admin-sign-up-password').type('Aditya@1');
            cy.getByData('admin-sign-up-cnfPassword').type('Aditya@');
            cy.getByData('admin-sign-up-password-next').click();
            cy.getByClassName('ub-ovflw-x_auto > div.ub-box-szg_border-box > .ub-fnt-fam_b77syt').should('exist').contains('Looks like you password and your confirm password does not match!');
            cy.getByClassName('css-elp417').click();
        });
    
        //7. make password and confirm password same and then continue.
      });
});