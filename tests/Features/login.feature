Feature: Login Feature

  @login
  Scenario Outline: Login with different credentials
    Given I am on the login page
    When I enter "<email>" and "<password>"
    And I click the login button
    Then "<result>" should be displayed

    

  Examples:
    | email                                | password   | result      |
    | admin@practicesoftwaretesting.com    | welcome01  | success     |
    | customer@practicesoftwaretesting.com | welcome01  | success     |
    | customer2@practicesoftwaretesting.com| welcome01  | success     |
    | customer3@practicesoftwaretesting.com| pass123    | success     |
    | wrong@test.com                       | wrong123   | error       |
    |                                      |            | validation  |


  Scenario: Verify user is logged in successfully
    Given I am logged in with valid credentials
    Then I should see the username on the dashboard


  Scenario: User can log out successfully
    Given I am logged in with valid credentials
    When I click the logout button
    Then I should be redirected to the login page