/* eslint-disable no-undef */

describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  context('Testing primary Admin sign up form', () => {

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

    it("Tests all fields are present or not", () => {
      Object.keys(formElements).forEach(item => {
        cy.getByData(formElements[item].dataTest).should('exist');
      });
    });

    Object.keys(formElements).forEach(field => {
      it(`Tests input field: ${field}`, () => {
        formElements[field].wrongInput.forEach(test => {
          cy.getByData(formElements[field].dataTest).type(test.text);
          cy.getByData(`${formElements[field].dataTest}-error`).contains(test.message);
          cy.getByData(formElements[field].dataTest).clear();
        });

        formElements[field].invalidInput.forEach(test => {
          cy.getByData(formElements[field].dataTest).type(test.text);
          cy.getByData(formElements[field].dataTest).clear();
        });

        cy.getByData(formElements[field].dataTest).type(formElements[field].correctInput.text);
        cy.getByData(`${formElements[field].dataTest}-error`).contains('Required');
        cy.getByData(formElements[field].dataTest).clear();
      });
    });
  });
})