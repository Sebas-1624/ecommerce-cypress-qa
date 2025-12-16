Feature: Shopping Cart Management
  As a customer
  I want to manage my shopping cart
  So that I can purchase products

  Background:
    Given I am on the home page
    And the backend is running on port 3001

  @bug-1 @high
  Scenario: Cart total calculation is incorrect
    When I add a product with price "$ 2.500.000" to the cart
    Then the cart total should be "$ 2.500.000"
    But the cart total shows "$ 3.750.000"

  @bug-2 @high
  Scenario: Clear cart button does not work
    Given I have 2 products in my cart
    When I click the "Vaciar carrito" button
    Then the cart should be empty
    But the cart still contains 2 products

  @bug-3 @medium
  Scenario: Cart accepts negative quantities
    Given I have a product in my cart
    When I change the quantity to "-5"
    Then the quantity should not be accepted
    But the cart shows quantity "-5"

  @bug-4 @critical
  Scenario: Removing one product deletes entire cart
    Given I have 3 different products in my cart
    When I remove the second product
    Then only 2 products should remain in the cart
    But the entire cart is emptied

  @bug-5 @high
  Scenario: Cart badge always shows zero
    Given I have 0 products in my cart
    When I add 2 products to the cart
    Then the navbar badge should show "2"
    But the navbar badge shows "0"