Feature: Product Search and Filters
  As a customer
  I want to search and filter products
  So that I can find what I need quickly

  Background:
    Given I am on the products page

  @bug-6 @high
  Scenario: Search looks in wrong field
    When I search for "iPhone"
    Then I should see products with "iPhone" in the name
    But no products are found because search looks in brand field

  @bug-7 @critical
  Scenario: Laptops filter shows phones instead
    When I select the "Laptops" category filter
    Then I should see only laptop products
    But phone products are displayed instead

  @bug-8 @medium
  Scenario: Search is case-sensitive
    When I search for "iphone" in lowercase
    Then I should see iPhone products
    But no products are found due to case-sensitivity

  @bug-9 @high
  Scenario: All categories filter shows only 3 products
    Given there are 34 products in the database
    When I select "Todas las categorías" filter
    Then I should see all 34 products
    But only 3 products are displayed

  @smoke
  Scenario: Verify search field is present
    Then I should see the search input field
    And the search placeholder should say "Buscar productos..."

  @smoke  
  Scenario: Verify category filter is present
    Then I should see the category dropdown
    And it should have options for "Laptops", "Celulares", "Tablets"