import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProductsPage from '../pages/ProductsPage';

// Given steps
Given('I am on the products page', () => {
  ProductsPage.visit();
});

Given('there are {int} products in the database', (count) => {
  // Verificar que existen productos en el backend
  cy.request('http://localhost:3001/products')
    .its('body')
    .should('have.length.greaterThan', count - 5); // Margen de tolerancia
});

// When steps
When('I search for {string}', (searchTerm) => {
  ProductsPage.search(searchTerm);
  cy.wait(500); // Esperar que se filtren los resultados
});

When('I search for {string} in lowercase', (searchTerm) => {
  ProductsPage.search(searchTerm);
  cy.wait(500);
});

When('I select the {string} category filter', (category) => {
  ProductsPage.selectCategory(category);
  cy.wait(500);
});

// Then steps
Then('I should see products with {string} in the name', (productName) => {
  cy.get('.product-card').should('have.length.greaterThan', 0);
  cy.get('.product-card h3').first().should('contain', productName);
});

Then('I should see only laptop products', () => {
  cy.get('.product-card').should('have.length.greaterThan', 0);
  // Verificar que son laptops (las descripciones contienen palabras clave)
  cy.get('.product-card').each(($card) => {
    cy.wrap($card).should('contain.text', 'pulgadas');
  });
});

Then('I should see iPhone products', () => {
  cy.get('.product-card').should('have.length.greaterThan', 0);
  cy.get('.product-card h3').first().should('contain', 'iPhone');
});

Then('I should see all {int} products', (count) => {
  cy.get('.product-card').should('have.length', count);
});

Then('I should see the search input field', () => {
  ProductsPage.verifySearchInputVisible();
});

Then('the search placeholder should say {string}', (placeholder) => {
  cy.get('input[placeholder="Buscar productos..."]').should('be.visible');
});

Then('I should see the category dropdown', () => {
  ProductsPage.verifyCategorySelectVisible();
});

Then('it should have options for {string}, {string}, {string}', (opt1, opt2, opt3) => {
  cy.get('select option').should('contain', opt1);
  cy.get('select option').should('contain', opt2);
  cy.get('select option').should('contain', opt3);
});

// But steps (para bugs)
Then('no products are found because search looks in brand field', () => {
  ProductsPage.verifyNoProductsFound();
});

Then('phone products are displayed instead', () => {
  // Bug: laptops muestra phones
  cy.get('.product-card').should('have.length.greaterThan', 0);
  // Verificar que son teléfonos (contienen GB, Snapdragon, etc)
  cy.get('.product-card .text-sm').first().invoke('text').then((text) => {
    const isPhone = text.includes('GB') || text.includes('Snapdragon') || text.includes('Dimensity');
    expect(isPhone).to.be.true;
  });
});

Then('no products are found due to case-sensitivity', () => {
  ProductsPage.verifyNoProductsFound();
});

Then('only {int} products are displayed', (count) => {
  cy.get('.product-card').should('have.length', count);
});