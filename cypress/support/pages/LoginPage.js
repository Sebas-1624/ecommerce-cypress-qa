class LoginPage {
  // Elementos de la página
  elements = {
    pageTitle: 'h2:contains("Iniciar Sesión")',
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    registerLink: 'a:contains("Regístrate")',
    errorMessage: '.bg-red-100',
    emailError: '.text-red-500:contains("email")',
    passwordError: '.text-red-500:contains("contraseña")',
    testUsersCard: '.bg-blue-50'
  };

  // Acciones
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    cy.get('input[name="email"]').clear().type(email);
  }

  fillPassword(password) {
    cy.get('input[name="password"]').clear().type(password);
  }

  fillCredentials(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLogin();
  }

  clickRegisterLink() {
    cy.contains('a', 'Regístrate').click();
  }

  // Verificaciones
  verifyPageTitle() {
    cy.contains('h2', 'Iniciar Sesión').should('be.visible');
  }

  verifyEmailFieldVisible() {
    cy.get('input[name="email"]').should('be.visible');
  }

  verifyPasswordFieldVisible() {
    cy.get('input[name="password"]').should('be.visible');
  }

  verifyLoginButtonVisible() {
    cy.get('button[type="submit"]').should('be.visible');
  }

  verifyLoginButtonText(text) {
    cy.get('button[type="submit"]').should('contain', text);
  }

  verifyErrorMessage(message) {
    cy.get('.bg-red-100').should('contain', message);
  }

  verifyEmailError(message) {
    cy.contains('.text-red-500', message).should('be.visible');
  }

  verifyPasswordError(message) {
    cy.contains('.text-red-500', message).should('be.visible');
  }

  verifyNoErrorMessage() {
    cy.get('.bg-red-100').should('not.exist');
    cy.get('.text-red-500').should('not.exist');
  }

  verifyTestUsersVisible() {
    cy.get('.bg-blue-50').should('be.visible');
    cy.contains('admin@store.com').should('be.visible');
    cy.contains('user@test.com').should('be.visible');
  }

  verifyRedirectedToHome() {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  }

  verifyUserLoggedIn(userName) {
    cy.contains(`👤 ${userName}`).should('be.visible');
  }

  verifyLoginButtonEnabled() {
    cy.get('button[type="submit"]').should('not.be.disabled');
  }

  verifyLoginButtonDisabled() {
    cy.get('button[type="submit"]').should('be.disabled');
  }
}

export default new LoginPage();