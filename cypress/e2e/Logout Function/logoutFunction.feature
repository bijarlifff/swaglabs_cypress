Feature: Logout Function

    Scenario: Logout successfully
        Given I am logged in as a standard user
        When I click the menu button
        And I click the logout button
        Then I should be logged out successfully and i should see the login page