@register
Feature: Register Module Testing

As a visitor
I want to register an account
So that I can create an account successfully

Background:
Given user launches the registration page

Scenario Outline: Successful registration with valid data
When user enters firstname "<firstname>"
And user enters lastname "<lastname>"
And user enters dob "<dob>"
And user selects country "<country>"
And user enters postal code "<postalCode>"
And user enters house number "<houseNumber>"
And user enters street "<street>"
And user enters city "<city>"
And user enters state "<state>"
And user enters phone "<phone>"
And user enters email "<email>"
And user enters password "<password>"
And user clicks submit
Then registration should be successful


Examples:
  | firstname | lastname | dob        | country | postalCode | houseNumber | street      | city       | state  | phone      | email              | password  |
  | Adarsh    | Tiwari   | 2000-05-12 | India   | 140001     | 22          | Main Street | Chandigarh | Punjab | 9876543210 | adarsh100@test.com | Test@1234ts |


Scenario Outline: Registration with age boundary values
When user enters firstname "<firstname>"
And user enters lastname "<lastname>"
And user enters dob "<dob>"
And user selects country "<country>"
And user enters postal code "<postalCode>"
And user enters house number "<houseNumber>"
And user enters street "<street>"
And user enters city "<city>"
And user enters state "<state>"
And user enters phone "<phone>"
And user enters email "<email>"
And user enters password "<password>"
And user clicks submit
Then "<result>" should be displayed


Examples:
  | firstname | lastname | dob        | country | postalCode | houseNumber | street | city  | state | phone      | email          | password  | result               |
  | Ravi      | Kumar    | 2009-01-01 | India   | 140001     | 10          | Road1  | Delhi | Delhi | 9876543210 | age17@test.com | Test@1234ts | Age validation error |
  | Ravi      | Kumar    | 2008-01-01 | India   | 140001     | 10          | Road1  | Delhi | Delhi | 9876543210 | age18@test.com | Test@1234ts | Success              |
  | Ravi      | Kumar    | 1951-01-01 | India   | 140001     | 10          | Road1  | Delhi | Delhi | 9876543210 | age75@test.com | Test@1234ts | Success              |
  | Ravi      | Kumar    | 1950-01-01 | India   | 140001     | 10          | Road1  | Delhi | Delhi | 9876543210 | age76@test.com | Test@1234ts | Age validation error |


Scenario Outline: Registration with invalid email formats
When user enters firstname "Adarsh"
And user enters lastname "Tiwari"
And user enters dob "2000-05-12"
And user selects country "India"
And user enters postal code "140001"
And user enters house number "22"
And user enters street "Main Street"
And user enters city "Chandigarh"
And user enters state "Punjab"
And user enters phone "9876543210"
And user enters email "<email>"
And user enters password "Test@1234ts"
And user clicks submit
Then email validation error should be displayed


Examples:
  | email        |
  | adarsh.com   |
  | @gmail.com   |
  | adarsh@      |
  | adarsh@gmail |


Scenario Outline: Registration with missing mandatory fields
When user enters firstname "<firstname>"
And user enters lastname "<lastname>"
And user enters dob "2000-05-12"
And user selects country "India"
And user enters postal code "140001"
And user enters house number "22"
And user enters street "Main Street"
And user enters city "Chandigarh"
And user enters state "Punjab"
And user enters phone "9876543210"
And user enters email "<email>"
And user enters password "<password>"
And user clicks submit
Then mandatory field validation should be displayed


Examples:
  | firstname | lastname | email          | password  |
  |           | Tiwari   | user1@test.com | Test@1234ts |
  | Adarsh    |          | user2@test.com | Test@1234ts |
  | Adarsh    | Tiwari   |                | Test@1234ts |
  | Adarsh    | Tiwari   | user4@test.com |           |


Scenario Outline: Registration with weak passwords
When user enters firstname "Adarsh"
And user enters lastname "Tiwari"
And user enters dob "2000-05-12"
And user selects country "India"
And user enters postal code "140001"
And user enters house number "22"
And user enters street "Main Street"
And user enters city "Chandigarh"
And user enters state "Punjab"
And user enters phone "9876543210"
And user enters email "weakpass@test.com"
And user enters password "<password>"
And user clicks submit
Then password validation error should be displayed


Examples:
  | password |
  | test123  |
  | TEST1234 |
  | TestTest |
  | Test1234 |
  | T@1      |


Scenario Outline: Registration with unusual invalid inputs
When user enters firstname "<firstname>"
And user enters lastname "Tiwari"
And user enters dob "2000-05-12"
And user selects country "India"
And user enters postal code "140001"
And user enters house number "22"
And user enters street "Main Street"
And user enters city "Chandigarh"
And user enters state "Punjab"
And user enters phone "9876543210"
And user enters email "errorguess@test.com"
And user enters password "Test@1234ts"
And user clicks submit
Then validation error should be displayed


Examples:
  | firstname            |
  | ' OR 1=1 --          |
  | 😀😀😀😀              |
  | veryveryverylongname |

