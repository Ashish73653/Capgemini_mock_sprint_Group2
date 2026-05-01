Feature: Product purchase flow

  @checkout
  Scenario Outline: User buys a product and places order successfully
    Given user navigates to "<url>"
    And user clicks on sign in
    And user logs in with email "<email>" and password "<password>"
    And user navigates to home page
    And user selects first product
    And user adds product to cart
    And user opens cart
    And user updates quantity to "<quantity>"
    And user proceeds to checkout
    And user handles login if required with "<email>" and "<password>"
    And user fills address details
      | country   | postal_code   | house_number   | city   | street   | state   |
      | <country> | <postal_code> | <house_number> | <city> | <street> | <state> |
    And user clicks on proceed to checkout if visible
    And user selects payment method "<payment>"
    And user confirms the order
    Then order should be placed successfully


    Examples:
      | TC   | url                                  | email                             | password  | quantity | country | postal_code | house_number | city   | street       | state       | payment          |
      | TC01 | https://practicesoftwaretesting.com/ | admin@practicesoftwaretesting.com | welcome01 | 2        | India   | 123456      | 42           | Mumbai | Marine Drive | Maharashtra | cash-on-delivery |