Feature: Product flow

    end to end shopping
    @shopping
    Scenario: search and add product to cart and proceed

        Given navigate to "https://practicesoftwaretesting.com/auth/login"

        When enter email "customer3@practicesoftwaretesting.com"
        And enter password "pass123"
        And login

        And go to home
        When search "hammer"
        And sort "Price (Low - High)"
        And select first product
        And increase quantity "4"
        And add to cart
        And go back
        And select category "Power Tools"
        And set price range "70"
        And sort "Price (High - Low)"
        And select first product
        And add to cart
        And go to cart
        And remove first product

        Then checkout option





