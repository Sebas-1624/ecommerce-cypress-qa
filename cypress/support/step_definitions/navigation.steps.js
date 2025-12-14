import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';

// Given steps
Given('I am on a product detail page', () => {
  HomePage.visit();
  HomePage.clickProductsLink();
  // Click en el primer producto para ir al detalle
  cy.get('.product-card h3').first().click();
  cy.wait(500);
});

Given('I am on any page', () => {
  HomePage.visit();
});

// When steps
When('I click the {string} link in the navbar', (linkText) => {
  cy.contains('nav a', linkText).click();
  cy.wait(500);
});

When('I click the {string} button', (buttonText) => {
  cy.contains('button', buttonText).click();
  cy.wait(500);
});

When('I view the product {string}', (productName) => {
  // Buscar el producto específico
  cy.contains('.product-card', productName).should('be.visible');
});

When('I navigate to the products page', () => {
  ProductsPage.visit();
});

When('I view any product card', () => {
  cy.get('.product-card').first().should('be.visible');
});

When('I navigate to {string}', (route) => {
  cy.visit(route);
  cy.wait(500);
});

// Then steps
Then('I should be on the products page at {string}', (route) => {
  cy.url().should('include', route);
});

Then('I should return to the previous page', () => {
  // Verificar que no estamos en la página de detalle
  cy.url().should('not.include', '/product/');
});

Then('the product image should load correctly', () => {
  cy.get('.product-card img').first().should('be.visible');
  cy.get('.product-card img').first().should('have.attr', 'src').and('not.be.empty');
});

Then('the footer should be visible at the bottom', () => {
  ProductsPage.verifyFooterVisible();
});

Then('the price should display the actual product price', () => {
  // Verificar que NO sea $0
  cy.get('.product-card .text-blue-600').first().invoke('text').then((price) => {
    expect(price).not.to.equal('$0');
  });
});

Then('I should see the navbar with {string} logo', (logoText) => {
  cy.contains('nav', logoText).should('be.visible');
});

Then('I should see the navbar', () => {
  cy.get('nav').should('be.visible');
});

Then('the navbar should contain link {string}', (linkText) => {
  cy.contains('nav a', linkText).should('be.visible');
});

// But steps (para bugs)
Then('I am redirected to home page {string}', (route) => {
  cy.url().should('include', route);
  cy.url().should('not.include', '/products');
});

Then('nothing happens and I stay on the same page', () => {
  // Bug: botón volver no funciona
  cy.url().should('include', '/product/');
});

Then('the image shows as broken', () => {
  // Bug: imagen con URL rota
  cy.get('.product-card img').first().should('have.attr', 'src').and('include', 'URL-ROTA-INEXISTENTE');
});

Then('the footer is hidden on the products page', () => {
  // Bug: footer desaparece
  ProductsPage.verifyFooterNotVisible();
});

Then('all products show {string}', (price) => {
  // Bug: todos muestran $0
  cy.get('.product-card .text-blue-600').first().should('contain', price);
});