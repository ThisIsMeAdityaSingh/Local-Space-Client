/* eslint-disable no-undef */

describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  context('Testing primary Admin sign up form', () => {
    it("Tests all fields are present or not", () => {
      cy.getByData('primary-form-first-name').should('exist');
      cy.getByData('primary-form-last-name').should('exist');
      cy.getByData('primary-form-email').should('exist');
      cy.getByData('primary-form-phone-number').should('exist');
      cy.getByData('primary-form-next-button').should('exist');
    });

    it('Tests first-name field error handling', () => {
      cy.getByData('primary-form-first-name').type('Ad');
      cy.getByData('primary-form-first-name-error').contains('Please enter a minimum of 3 letters');
      cy.getByData('primary-form-first-name').clear();
      cy.getByData('primary-form-first-name').type('Aditya');
      cy.getByData('primary-form-first-name-error').contains('Required');
      cy.getByData('primary-form-first-name').clear();
      cy.getByData('primary-form-first-name').type('3423423');
      cy.getByData('primary-form-first-name-error').contains('Please enter a valid value');
    });
  });
})