class CartPage {
  // Elementos de la página
  elements = {
    pageTitle: 'h1:contains("Carrito de Compras")',
    cartItems: '.cart-item',
    cartBadge: '.bg-red-500',
    productName: '.cart-item h3',
    productPrice: '.cart-item .text-gray-600',
    quantityDecrease: 'button:contains("-")',
    quantityIncrease: 'button:contains("+")',
    quantityDisplay: '.text-xl',
    deleteButton: 'button:contains("🗑️")',
    clearCartButton: 'button:contains("Vaciar carrito")',
    subtotal: '.border-t',
    total: '.text-2xl.font-bold',
    checkoutButton: 'button:contains("Proceder al Pago")',
    emptyCartMessage: 'p:contains("Tu carrito está vacío")',
    continueShoppingLink: 'a:contains("Ver productos")'
  };

  // Acciones
  visit() {
    cy.visit('/cart');
  }

  increaseQuantity(itemIndex = 0) {
    cy.get('.cart-item').eq(itemIndex).find('button:contains("+")').click();
  }

  decreaseQuantity(itemIndex = 0) {
    cy.get('.cart-item').eq(itemIndex).find('button:contains("-")').click();
  }

  setQuantity(itemIndex, quantity) {
    // Obtener la cantidad actual
    cy.get('.cart-item').eq(itemIndex).find('.text-xl').then(($el) => {
      const currentQty = parseInt($el.text());
      const diff = quantity - currentQty;
      
      if (diff > 0) {
        // Aumentar
        for (let i = 0; i < diff; i++) {
          cy.get('.cart-item').eq(itemIndex).find('button:contains("+")').click();
        }
      } else if (diff < 0) {
        // Disminuir
        for (let i = 0; i < Math.abs(diff); i++) {
          cy.get('.cart-item').eq(itemIndex).find('button:contains("-")').click();
        }
      }
    });
  }

  deleteItem(itemIndex = 0) {
    cy.get('.cart-item').eq(itemIndex).find('button:contains("🗑️")').click();
  }

  deleteItemByName(productName) {
    cy.contains('.cart-item', productName).find('button:contains("🗑️")').click();
  }

  clearCart() {
    cy.contains('button', 'Vaciar carrito').click();
  }

  proceedToCheckout() {
    cy.contains('button', 'Proceder al Pago').click();
  }

  clickContinueShopping() {
    cy.contains('a', 'Ver productos').click();
  }

  // Verificaciones
  verifyCartItemCount(count) {
    if (count === 0) {
      cy.get('.cart-item').should('not.exist');
    } else {
      cy.get('.cart-item').should('have.length', count);
    }
  }

  verifyCartBadge(count) {
    if (count === 0) {
      cy.get('nav .bg-red-500').should('not.exist');
    } else {
      cy.get('nav .bg-red-500').should('contain', count);
    }
  }

  verifyProductInCart(productName) {
    cy.contains('.cart-item', productName).should('exist');
  }

  verifyProductNotInCart(productName) {
    cy.contains('.cart-item', productName).should('not.exist');
  }

  verifyTotal(expectedTotal) {
    cy.get('.text-2xl.font-bold.text-blue-600').should('contain', expectedTotal);
  }

  verifyEmptyCart() {
    cy.contains('Tu carrito está vacío').should('be.visible');
  }

  verifyCartNotEmpty() {
    cy.get('.cart-item').should('exist');
  }

  verifyQuantity(itemIndex, quantity) {
    cy.get('.cart-item').eq(itemIndex).find('.text-xl').should('contain', quantity);
  }

  getTotal() {
    return cy.get('.text-2xl.font-bold.text-blue-600').invoke('text');
  }

  getCartItemsCount() {
    return cy.get('.cart-item').its('length');
  }
}

export default new CartPage();