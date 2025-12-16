// ***********************************************************
// cypress/support/e2e.js
// SOLUCIÓN COMPLETA - Fixtures + Interceptors
// ***********************************************************

import './commands';

// ============================================
// 1. MANEJO DE ERRORES
// ============================================
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorar errores de red y React que no afectan tests
  if (
    err.message.includes('Network Error') ||
    err.message.includes('ERR_EMPTY_RESPONSE') ||
    err.message.includes('ERR_NETWORK') ||
    err.message.includes('Failed to fetch')
  ) {
    return false;
  }
  return true;
});

// ============================================
// 2. FIXTURES - MOCKEAR BACKEND COMPLETO
// ============================================
beforeEach(() => {
  // ----------------------------------------
  // PRODUCTOS - Mockear con fixtures
  // ----------------------------------------
  cy.fixture('products.json').then((products) => {
    // Interceptar GET /products (todos)
    cy.intercept('GET', '**/products*', {
      statusCode: 200,
      body: products,
      headers: {
        'access-control-allow-origin': '*',
        'content-type': 'application/json',
      },
    }).as('getProducts');

    // Interceptar GET /products/:id (individual)
    cy.intercept('GET', '**/products/*', (req) => {
      const productId = req.url.split('/').pop().split('?')[0];
      const product = products.find(p => p.id === productId);
      
      req.reply({
        statusCode: product ? 200 : 404,
        body: product || { error: 'Product not found' },
        headers: {
          'access-control-allow-origin': '*',
          'content-type': 'application/json',
        },
      });
    }).as('getProduct');
  });

  // ----------------------------------------
  // USUARIOS - Mockear login
  // ----------------------------------------
  cy.intercept('GET', '**/users*', (req) => {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const email = urlParams.get('email');
    const password = urlParams.get('password');

    const users = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@store.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        id: '2',
        name: 'Test User',
        email: 'user@test.com',
        password: 'test123',
        role: 'user'
      }
    ];

    const user = users.find(u => u.email === email && u.password === password);

    req.reply({
      statusCode: 200,
      body: user ? [user] : [],
      headers: {
        'access-control-allow-origin': '*',
        'content-type': 'application/json',
      },
    });
  }).as('getUsers');

  // ----------------------------------------
  // ÓRDENES - Mockear checkout
  // ----------------------------------------
  cy.intercept('POST', '**/orders*', (req) => {
    req.reply({
      statusCode: 201,
      body: {
        ...req.body,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      },
      headers: {
        'access-control-allow-origin': '*',
        'content-type': 'application/json',
      },
    });
  }).as('postOrders');

  // Interceptar GET /orders
  cy.intercept('GET', '**/orders*', {
    statusCode: 200,
    body: [],
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
    },
  }).as('getOrders');
});