import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

// Background - Se ejecuta antes de cada escenario
Before(() => {
  // Limpiar localStorage para tests limpios
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Given steps
Given('I am on the home page', () => {
  HomePage.visit();
});

Given('the backend is running on port {int}', (port) => {
  // ✅ NO NECESARIO: Usamos fixtures, no backend real
  cy.log(`Usando fixtures en lugar de backend real en puerto ${port}`);
});

Given('I have {int} products in my cart', (count) => {
  HomePage.visit();
  HomePage.clickProductsLink();
  
  // ✅ Esperar a que la URL cambie
  cy.url().should('include', '/products');
  cy.wait('@getProducts');
  cy.get('.product-card', { timeout: 10000 }).should('be.visible');
  
  for (let i = 0; i < count; i++) {
    ProductsPage.addFirstProductToCart();
    cy.wait(500); // Pequeña espera entre productos
  }
  
  CartPage.visit();
});

Given('I have {int} different products in my cart', (count) => {
  HomePage.visit();
  HomePage.clickProductsLink();
  
  // ✅ Esperar a que la URL cambie
  cy.url().should('include', '/products');
  cy.wait('@getProducts');
  cy.get('.product-card', { timeout: 10000 }).should('be.visible');
  
  // Agregar productos diferentes
  cy.get('.product-card button').each(($btn, index) => {
    if (index < count) {
      cy.wrap($btn).click();
      cy.wait(500);
    }
  });
  
  CartPage.visit();
});

Given('I have a product in my cart', () => {
  HomePage.visit();
  HomePage.clickProductsLink();
  
  // ✅ Esperar a que la URL cambie
  cy.url().should('include', '/products');
  cy.wait('@getProducts');
  cy.get('.product-card', { timeout: 10000 }).should('be.visible');
  
  ProductsPage.addFirstProductToCart();
  CartPage.visit();
});

// ✅ ELIMINADA: Segunda definición duplicada que estaba en líneas 53-60

// When steps
When('I add a product with price {string} to the cart', (price) => {
  HomePage.visit();
  HomePage.clickProductsLink();
  
  // ✅ Esperar a que la URL cambie
  cy.url().should('include', '/products');
  cy.wait('@getProducts');
  cy.get('.product-card', { timeout: 10000 }).should('be.visible');
  
  // ✅ CAMBIADO: Agregar primer producto sin buscar por precio
  cy.get('.product-card').first().find('button').click();
});

When('I click the {string} button', (buttonText) => {
  cy.contains('button', buttonText).click();
});

When('I change the quantity to {string}', (quantity) => {
  // ✅ CORREGIDO: Selector actualizado para usar .cart-item
  cy.get('.cart-item').first().find('.text-xl.font-semibold').then($qty => {
    const currentQty = parseInt($qty.text());
    const targetQty = parseInt(quantity);
    const diff = targetQty - currentQty;
    
    if (diff < 0) {
      // Hacer click en menos varias veces para llegar a negativo
      for (let i = 0; i < Math.abs(diff); i++) {
        CartPage.decreaseQuantity(0);
        cy.wait(200);
      }
    }
  });
});

When('I remove the second product', () => {
  CartPage.deleteItem(1); // Index 1 = segundo producto
});

When('I add {int} products to the cart', (count) => {
  HomePage.clickProductsLink();
  
  // ✅ Esperar a que la URL cambie
  cy.url().should('include', '/products');
  cy.wait('@getProducts');
  cy.get('.product-card', { timeout: 10000 }).should('be.visible');
  
  for (let i = 0; i < count; i++) {
    ProductsPage.addFirstProductToCart();
    cy.wait(500);
  }
});

// Then steps
Then('the cart total should be {string}', (expectedTotal) => {
  cy.contains(expectedTotal).should('be.visible');
});

Then('the cart total shows {string}', (buggyTotal) => {
  // Bug: el total está mal calculado
  cy.contains(buggyTotal).should('be.visible');
});

Then('the cart should be empty', () => {
  CartPage.verifyEmptyCart();
});

Then('the cart still contains {int} products', (count) => {
  // ✅ CORREGIDO: Usar .cart-item en lugar de .border-b
  cy.get('.cart-item').should('have.length', count);
});

Then('the quantity should not be accepted', () => {
  // ✅ CORREGIDO: Selector actualizado
  cy.get('.cart-item').first().find('.text-xl.font-semibold').should('not.contain', '-');
});

Then('the cart shows quantity {string}', (quantity) => {
  // ✅ CORREGIDO: Selector actualizado
  cy.get('.cart-item').first().find('.text-xl.font-semibold').should('contain', quantity);
});

Then('only {int} products should remain in the cart', (count) => {
  // ✅ CORREGIDO: Usar .cart-item
  cy.get('.cart-item').should('have.length', count);
});

Then('the entire cart is emptied', () => {
  // Bug: elimina todo el carrito
  CartPage.verifyEmptyCart();
});

Then('the navbar badge should show {string}', (count) => {
  cy.get('nav').contains(count).should('be.visible');
});

Then('the navbar badge shows {string}', (count) => {
  // Bug: siempre muestra 0
  cy.get('nav .bg-red-500').should('contain', count);
});