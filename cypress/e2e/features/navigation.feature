Feature: Navigation and UI Elements
  As a customer
  I want to navigate through the website
  So that I can access different sections

  @bug-15 @high
  Scenario: Products link redirects to home
    Given I am on the home page
    When I click the "Productos" link in the navbar
    Then I should be on the products page at "/products"
    But I am redirected to home page "/"

  @bug-16 @medium
  Scenario: Back button does not work on product detail
    Given I am on a product detail page
    When I click the "← Volver" button
    Then I should return to the previous page
    But nothing happens and I stay on the same page

  @bug-17 @high
  Scenario: Product image fails to load
    Given I am on the products page
    When I view the product "HP Envy x360"
    Then the product image should load correctly
    But the image shows as broken

  @bug-18 @medium
  Scenario: Footer disappears on products page
    Given I am on the home page
    When I navigate to the products page
    Then the footer should be visible at the bottom
    But the footer is hidden on the products page

  @bug-19 @critical
  Scenario: Product prices show as $0
    Given I am on the products page
    When I view any product card
    Then the price should display the actual product price
    But all products show "$0"

  @smoke
  Scenario: Navbar is visible on all pages
    Given I am on the home page
    Then I should see the navbar with "TechStore" logo
    When I navigate to "/products"
    Then I should see the navbar
    When I navigate to "/cart"
    Then I should see the navbar
    When I navigate to "/login"
    Then I should see the navbar

  @smoke
  Scenario: Verify main navigation links
    Given I am on any page
    Then the navbar should contain link "Inicio"
    And the navbar should contain link "Productos"
    And the navbar should contain link "Carrito"
    And the navbar should contain link "Iniciar Sesión"