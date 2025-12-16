Feature: Form Validation
  As a system
  I want to validate user input
  So that data integrity is maintained

  @bug-10 @critical
  Scenario: Login accepts email without @ symbol
    Given I am on the login page
    When I enter email "testuser" without @ symbol
    And I enter password "test123"
    And I click the login button
    Then I should see an error "Email inválido"
    But the form is submitted without validation

  @bug-14 @high
  Scenario: Login accepts password with only 2 characters
    Given I am on the login page
    When I enter email "user@test.com"
    And I enter password "12"
    And I click the login button
    Then I should see an error "La contraseña debe tener al menos 6 caracteres"
    But the form is submitted

  @bug-11 @critical
  Scenario: Checkout accepts empty required fields
    Given I have products in my cart
    And I am on the checkout page
    When I leave the name field empty
    And I leave the email field empty
    And I click "Confirmar Orden"
    Then I should see validation errors
    But the order is submitted with empty fields

  @bug-13 @medium
  Scenario: Phone field accepts letters
    Given I am on the checkout page
    When I enter "abc123xyz" in the phone field
    And I click "Confirmar Orden"
    Then I should see an error "Teléfono inválido"
    But the form is submitted with letters in phone

  @smoke
  Scenario: Login form has proper labels
    Given I am on the login page
    Then I should see a label "Email"
    And I should see a label "Contraseña"
    And I should see a button "Iniciar Sesión"

  @smoke
  Scenario: Checkout form has all required fields
    Given I have products in my cart
    And I am on the checkout page
    Then I should see field "Nombre Completo *"
    And I should see field "Email *"
    And I should see field "Teléfono *"
    And I should see field "Dirección *"
    And I should see field "Ciudad *"