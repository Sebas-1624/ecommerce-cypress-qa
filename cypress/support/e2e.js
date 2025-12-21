import './commands';

// Manejar errores de Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
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

// Interceptores globales - Se ejecutan antes de cada test
beforeEach(() => {
  // Cargar fixture de productos
  cy.fixture('products.json').then((products) => {
    // Interceptor para GET /products
    cy.intercept('GET', '**/products*', {
      statusCode: 200,
      body: products,
      headers: {
        'access-control-allow-origin': '*',
        'content-type': 'application/json',
      },
    }).as('getProducts');

    // Interceptor para GET /products/:id
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

  // Interceptor para GET /users (login)
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

  // Interceptor para POST /orders (crear orden)
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

  // Interceptor para GET /orders (obtener órdenes)
  cy.intercept('GET', '**/orders*', {
    statusCode: 200,
    body: [],
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
    },
  }).as('getOrders');
});