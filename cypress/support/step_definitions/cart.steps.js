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
  // Verificar que el backend esté disponible
  cy.request(`http://localhost:${port}/products`).its('status').should('eq', 200);
});

Given('I have {int} products in my cart', (count) => {
  HomePage.visit();
  HomePage.clickProductsLink();
  
  for (let i = 0; i < count; i++) {
    ProductsPage.addFirstProductToCart();
    cy.wait(500); // Pequeña espera entre productos
  }
  
  CartPage.visit();
});

Given('I have {int} different products in my cart', (count) => {
  HomePage.visit();
  HomePage.clickProductsLink();
  
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
  ProductsPage.addFirstProductToCart();
  CartPage.visit();
});

Given('I have {int} products in my cart', (count) => {
  HomePage.visit();
  HomePage.clickProductsLink();
  
  for (let i = 0; i < count; i++) {
    ProductsPage.addFirstProductToCart();
    cy.wait(300);
  }
});

// When steps
When('I add a product with price {string} to the cart', (price) => {
  HomePage.visit();
  HomePage.clickProductsLink();
  
  // Buscar producto por precio
  cy.contains('.product-card', price).find('button').click();
});

When('I click the {string} button', (buttonText) => {
  cy.contains('button', buttonText).click();
});

When('I change the quantity to {string}', (quantity) => {
  // Limpiar el input y escribir cantidad negativa
  cy.get('.text-xl.font-semibold').first().then($qty => {
    const currentQty = parseInt($qty.text());
    const targetQty = parseInt(quantity);
    const diff = targetQty - currentQty;
    
    if (diff < 0) {
      // Hacer click en menos varias veces
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
  
  for (let i = 0; i < count; i++) {
    ProductsPage.addFirstProductToCart();
    cy.wait(300);
  }
});

// Then steps
Then('the cart total should be {string}', (expectedTotal) => {
  CartPage.visit();
  CartPage.verifyTotal(expectedTotal);
});

Then('the cart should be empty', () => {
  CartPage.verifyCartItemCount(0);
});

Then('the cart still contains {int} products', (count) => {
  CartPage.verifyCartItemCount(count);
});

Then('the quantity should not be accepted', () => {
  // Verificar que la cantidad mínima es 1
  cy.get('.text-xl.font-semibold').first().should('contain', '1');
});

Then('only {int} products should remain in the cart', (count) => {
  CartPage.verifyCartItemCount(count);
});

Then('the entire cart is emptied', () => {
  CartPage.verifyCartItemCount(0);
});

Then('the navbar badge should show {string}', (count) => {
  CartPage.verifyCartBadge(count);
});

// But steps (para bugs)
Then('the cart total shows {string}', (actualTotal) => {
  // Este verifica el total incorrecto (bug)
  CartPage.verifyTotal(actualTotal);
});

Then('the cart shows quantity {string}', (quantity) => {
  cy.get('.text-xl.font-semibold').first().should('contain', quantity);
});

Then('the navbar badge shows {string}', (badgeCount) => {
  if (badgeCount === '0') {
    // Bug: badge siempre muestra 0
    cy.get('nav .bg-red-500').should('not.exist');
  } else {
    cy.get('nav .bg-red-500').should('contain', badgeCount);
  }
});