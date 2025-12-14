class ProductsPage {
  // Elementos de la página
  elements = {
    pageTitle: 'h1:contains("Nuestros Productos")',
    searchInput: 'input[placeholder="Buscar productos..."]',
    categorySelect: 'select',
    productCards: '.product-card',
    addToCartButtons: 'button:contains("Agregar al carrito")',
    productCount: '.text-gray-600',
    noResultsMessage: 'p:contains("No se encontraron productos")',
    footer: 'footer'
  };

  // Acciones
  visit() {
    cy.visit('/products');
  }

  search(term) {
    cy.get('input[placeholder="Buscar productos..."]').clear().type(term);
  }

  selectCategory(category) {
    cy.get('select').select(category);
  }

  addFirstProductToCart() {
    cy.get('.product-card button').first().click();
  }

  addProductToCartByName(productName) {
    cy.contains('.product-card', productName)
      .find('button')
      .click();
  }

  clickProductByName(productName) {
    cy.contains('.product-card h3', productName).click();
  }

  // Verificaciones
  verifyPageTitle() {
    cy.contains('h1', 'Nuestros Productos').should('be.visible');
  }

  verifySearchInputVisible() {
    cy.get('input[placeholder="Buscar productos..."]').should('be.visible');
  }

  verifyCategorySelectVisible() {
    cy.get('select').should('be.visible');
  }

  verifyProductCount(count) {
    cy.get('.product-card').should('have.length', count);
  }

  verifyProductVisible(productName) {
    cy.contains('.product-card', productName).should('be.visible');
  }

  verifyNoProductsFound() {
    cy.contains('No se encontraron productos').should('be.visible');
  }

  verifyFooterVisible() {
    cy.get('footer').should('be.visible');
  }

  verifyFooterNotVisible() {
    cy.get('footer').should('not.exist');
  }

  verifyProductPrice(price) {
    cy.get('.product-card .text-blue-600').first().should('contain', price);
  }

  getProductCards() {
    return cy.get('.product-card');
  }
}

export default new ProductsPage();