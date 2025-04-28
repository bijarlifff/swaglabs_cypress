Feature: Checkout

    Scenario: Filling checkout information with complete data and validating the flow until payment.
        Given I am logged in as a standard user
        When I add a products to the cart
        And I proceed to checkout
        And I fill in the checkout information with complete data
        And I should see the checkout overview page and click on finish
        Then I should see the checkout complete page

    Scenario: Testing the checkout flow without filling in mandatory data.
        Given I am logged in as a standard user
        When I add a products to the cart
        And I proceed to checkout
        And I fill "in the checkout information without mandatory data" and click on continue
        Then I should see an error message indicating that "first name" fields are required
        And I fill "only the first name" and click on continue
        Then I should see an error message indicating that "last name" fields are required
        And I fill "only the first name, last name" and click on continue
        Then I should see an error message indicating that "postal code" fields are required