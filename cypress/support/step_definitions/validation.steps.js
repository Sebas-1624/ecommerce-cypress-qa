import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/LoginPage';
import CheckoutPage from '../pages/CheckoutPage';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

// Given steps
Given('I am on the login page', () => {
  LoginPage.visit();
});

Given('I have products in my cart', () => {
  HomePage.visit();
  HomePage.clickProductsLink();
  ProductsPage.addFirstProductToCart();
  cy.wait(500);
});

Given('I am on the checkout page', () => {
  // Primero agregar producto al carrito
  HomePage.visit();
  HomePage.clickProductsLink();
  ProductsPage.addFirstProductToCart();
  cy.wait(500);
  
  // Ir a checkout
  CartPage.visit();
  CartPage.proceedToCheckout();
});

// When steps
When('I enter email {string} without @ symbol', (email) => {
  LoginPage.fillEmail(email);
});

When('I enter email {string}', (email) => {
  LoginPage.fillEmail(email);
});

When('I enter password {string}', (password) => {
  LoginPage.fillPassword(password);
});

When('I click the login button', () => {
  LoginPage.clickLogin();
  cy.wait(1000); // Esperar respuesta del backend
});

When('I leave the name field empty', () => {
  CheckoutPage.fillName('');
});

When('I leave the email field empty', () => {
  CheckoutPage.fillEmail('');
});

When('I click {string}', (buttonText) => {
  cy.contains('button', buttonText).click();
  cy.wait(1000);
});

When('I enter {string} in the phone field', (phone) => {
  CheckoutPage.fillPhone(phone);
});

// Then steps
Then('I should see an error {string}', (errorMessage) => {
  cy.contains('.text-red-500', errorMessage).should('be.visible');
});

Then('I should see validation errors', () => {
  cy.get('.text-red-500').should('have.length.greaterThan', 0);
});

Then('I should see a label {string}', (label) => {
  cy.contains('label', label).should('be.visible');
});

Then('I should see a button {string}', (buttonText) => {
  cy.contains('button', buttonText).should('be.visible');
});

Then('I should see field {string}', (fieldLabel) => {
  cy.contains('label', fieldLabel).should('be.visible');
});

// But steps (para bugs)
Then('the form is submitted without validation', () => {
  // Verificar que no hay errores (bug: debería haber errores)
  cy.get('.text-red-500').should('not.exist');
  // O verificar que se redirigió (login exitoso incorrecto)
  cy.url().should('not.include', '/login');
});

Then('the form is submitted', () => {
  // Bug: formulario se envía sin validación
  cy.get('.text-red-500').should('not.exist');
});

Then('the order is submitted with empty fields', () => {
  // Bug: orden se crea sin validación
  cy.contains('¡Orden Confirmada!').should('be.visible');
});

Then('the form is submitted with letters in phone', () => {
  // Bug: acepta letras en teléfono
  cy.contains('¡Orden Confirmada!').should('be.visible');
});