class CheckoutPage {
  // Elementos de la página
  elements = {
    pageTitle: 'h1:contains("Checkout")',
    nameInput: 'input[name="name"]',
    emailInput: 'input[name="email"]',
    phoneInput: 'input[name="phone"]',
    addressInput: 'input[name="address"]',
    cityInput: 'input[name="city"]',
    creditCardRadio: 'input[value="credit-card"]',
    debitCardRadio: 'input[value="debit-card"]',
    cashRadio: 'input[value="cash"]',
    orderSummary: '.bg-white.rounded-lg.shadow',
    totalAmount: '.text-xl .font-bold.text-blue-600',
    confirmButton: 'button:contains("Confirmar Orden")',
    processingButton: 'button:contains("Procesando...")',
    errorMessage: '.text-red-500',
    successIcon: '.text-6xl:contains("✅")',
    orderNumber: '.text-2xl.font-bold.text-blue-600',
    backToHomeButton: 'button:contains("Volver al Inicio")'
  };

  // Acciones
  visit() {
    cy.visit('/checkout');
  }

  fillName(name) {
    cy.get('input[name="name"]').clear().type(name);
  }

  fillEmail(email) {
    cy.get('input[name="email"]').clear().type(email);
  }

  fillPhone(phone) {
    cy.get('input[name="phone"]').clear().type(phone);
  }

  fillAddress(address) {
    cy.get('input[name="address"]').clear().type(address);
  }

  fillCity(city) {
    cy.get('input[name="city"]').clear().type(city);
  }

  fillShippingInfo(data) {
    if (data.name) this.fillName(data.name);
    if (data.email) this.fillEmail(data.email);
    if (data.phone) this.fillPhone(data.phone);
    if (data.address) this.fillAddress(data.address);
    if (data.city) this.fillCity(data.city);
  }

  selectCreditCard() {
    cy.get('input[value="credit-card"]').check();
  }

  selectDebitCard() {
    cy.get('input[value="debit-card"]').check();
  }

  selectCash() {
    cy.get('input[value="cash"]').check();
  }

  selectPaymentMethod(method) {
    cy.get(`input[value="${method}"]`).check();
  }

  clickConfirmOrder() {
    cy.contains('button', 'Confirmar Orden').click();
  }

  clickBackToHome() {
    cy.contains('button', 'Volver al Inicio').click();
  }

  // Verificaciones
  verifyPageTitle() {
    cy.contains('h1', 'Checkout').should('be.visible');
  }

  verifyNameFieldVisible() {
    cy.get('input[name="name"]').should('be.visible');
  }

  verifyEmailFieldVisible() {
    cy.get('input[name="email"]').should('be.visible');
  }

  verifyPhoneFieldVisible() {
    cy.get('input[name="phone"]').should('be.visible');
  }

  verifyAddressFieldVisible() {
    cy.get('input[name="address"]').should('be.visible');
  }

  verifyCityFieldVisible() {
    cy.get('input[name="city"]').should('be.visible');
  }

  verifyErrorMessage(message) {
    cy.contains('.text-red-500', message).should('be.visible');
  }

  verifyNoErrorMessage() {
    cy.get('.text-red-500').should('not.exist');
  }

  verifyOrderConfirmed() {
    cy.contains('¡Orden Confirmada!').should('be.visible');
  }

  verifyOrderNumber() {
    cy.get('.text-2xl.font-bold.text-blue-600').should('be.visible');
  }

  verifyOrderNumberFormat() {
    cy.get('.text-2xl.font-bold.text-blue-600')
      .invoke('text')
      .should('match', /ORD-\d{4}-\d{6}/);
  }

  verifyTotalAmount(amount) {
    cy.get('.text-xl .font-bold.text-blue-600').should('contain', amount);
  }

  verifyConfirmButtonEnabled() {
    cy.contains('button', 'Confirmar Orden').should('not.be.disabled');
  }

  verifyConfirmButtonDisabled() {
    cy.contains('button', 'Confirmar Orden').should('be.disabled');
  }

  verifyPaymentMethodsVisible() {
    cy.contains('Tarjeta de Crédito').should('be.visible');
    cy.contains('Tarjeta de Débito').should('be.visible');
    cy.contains('Efectivo').should('be.visible');
  }

  getOrderNumber() {
    return cy.get('.text-2xl.font-bold.text-blue-600').invoke('text');
  }
}

export default new CheckoutPage();