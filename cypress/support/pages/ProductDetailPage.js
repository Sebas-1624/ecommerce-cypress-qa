class ProductDetailPage {
  // Elementos de la página
  elements = {
    backButton: 'button:contains("Volver")',
    productImage: 'img',
    productBrand: '.text-blue-600.font-semibold',
    productName: 'h1',
    productRating: '.text-yellow-500',
    productDescription: 'p.text-gray-700',
    productPrice: '.text-4xl.font-bold.text-blue-600',
    stockInfo: '.text-sm',
    quantityDecrease: 'button:contains("-")',
    quantityIncrease: 'button:contains("+")',
    quantityDisplay: '.text-xl.font-semibold',
    addToCartButton: 'button:contains("Agregar al Carrito")'
  };

  // Acciones
  visitProduct(productId) {
    cy.visit(`/product/${productId}`);
  }

  clickBackButton() {
    cy.contains('button', 'Volver').click();
  }

  increaseQuantity() {
    cy.contains('button', '+').click();
  }

  decreaseQuantity() {
    cy.contains('button', '-').click();
  }

  setQuantity(quantity) {
    // Resetear a 1 primero
    cy.contains('button', '-').click();
    
    // Incrementar hasta la cantidad deseada
    for (let i = 1; i < quantity; i++) {
      cy.contains('button', '+').click();
    }
  }

  clickAddToCart() {
    cy.contains('button', 'Agregar al Carrito').click();
  }

  // Verificaciones
  verifyBackButtonVisible() {
    cy.contains('button', 'Volver').should('be.visible');
  }

  verifyProductName(name) {
    cy.get('h1').should('contain', name);
  }

  verifyProductPrice(price) {
    cy.get('.text-4xl.font-bold.text-blue-600').should('contain', price);
  }

  verifyQuantityDisplay(quantity) {
    cy.get('.text-xl.font-semibold').should('contain', quantity);
  }

  verifyImageVisible() {
    cy.get('img').should('be.visible');
  }

  verifyImageBroken() {
    cy.get('img').should('have.attr', 'src').and('include', 'URL-ROTA-INEXISTENTE');
  }

  verifyStockInfo(stock) {
    cy.contains(`${stock} disponibles`).should('be.visible');
  }

  verifyAddToCartButtonEnabled() {
    cy.contains('button', 'Agregar al Carrito').should('not.be.disabled');
  }

  verifyAddToCartButtonDisabled() {
    cy.contains('button', 'Agregar al Carrito').should('be.disabled');
  }
}

export default new ProductDetailPage();