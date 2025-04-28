Feature: Login Function

    Scenario: Login with valid credentials
        Given I visit the Sauce Demo login page
        When I enter a valid username and password
        And I click the login button
        Then I should be redirected to the products page

    Scenario: Login with invalid credentials
        Given I visit the Sauce Demo login page
        When I enter an invalid username or password
        And I click the login button
        Then I should see an error message

    Scenario: Login with empty username
        Given I visit the Sauce Demo login page
        When I click the login button
        Then I should see an error message

    Scenario: Login with empty password
        Given I visit the Sauce Demo login page
        When I only enter a username
        And I click the login button
        Then I should see an error message