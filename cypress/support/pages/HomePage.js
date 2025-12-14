class HomePage {
  // Elementos de la página
  elements = {
    navbar: 'nav',
    logo: 'a:contains("TechStore")',
    heroSection: 'section',
    heroTitle: 'h1:contains("Bienvenido a TechStore")',
    heroButton: 'a:contains("Ver Productos")',
    productCards: '.product-card',
    productsLink: 'a:contains("Productos")',
    cartLink: 'a:contains("Carrito")',
    loginLink: 'a:contains("Iniciar Sesión")'
  };

  // Acciones
  visit() {
    cy.visit('/');
  }

  clickProductsLink() {
    cy.contains('a', 'Productos').click();
  }

  clickCartLink() {
    cy.contains('a', 'Carrito').click();
  }

  clickLoginLink() {
    cy.contains('a', 'Iniciar Sesión').click();
  }

  clickHeroButton() {
    cy.contains('a', 'Ver Productos').click();
  }

  // Verificaciones
  verifyLogoVisible() {
    cy.contains('🛒 TechStore').should('be.visible');
  }

  verifyHeroTitleVisible() {
    cy.contains('Bienvenido a TechStore').should('be.visible');
  }

  verifyNavbarVisible() {
    cy.get('nav').should('be.visible');
  }

  verifyFeaturedProducts() {
    cy.get('.product-card').should('have.length.greaterThan', 0);
  }

  verifyFooterVisible() {
    cy.contains('Sobre nosotros').should('be.visible');
  }
}

export default new HomePage();