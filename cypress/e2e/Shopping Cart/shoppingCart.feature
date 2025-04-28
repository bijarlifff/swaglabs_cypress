Feature: Shopping Cart

    Scenario: Add a product to cart
        Given I am logged in as a standard user
        When I add a products to the cart
        And The cart should contain the products
        Then I should see products in the cart

    Scenario: Remove a product from cart
        Given I am logged in as a standard user
        When I add a products to the cart
        And I remove the products from the cart
        Then I should see the cart is empty