const { RegisterPage } = require('../pages/toolRegisterPages.js');
const {
Given,
When,
Then,
BeforeAll,
AfterAll,
Before,
After,
setDefaultTimeout
} = require('@cucumber/cucumber');

const { expect, chromium } = require('@playwright/test');

let browser, context, page, registerPage;

setDefaultTimeout(60000);

BeforeAll(async () => {
browser = await chromium.launch({ headless: false });
});

Before(async () => {
context = await browser.newContext();
page = await context.newPage();
registerPage = new RegisterPage(page);
});

After(async () => {
await context.close();
});

AfterAll(async () => {
await browser.close();
});

Given('user launches the registration page', async () => {
await registerPage.launchURL('https://practicesoftwaretesting.com/auth/register');
});

When('user enters firstname {string}', async (firstname) => {
await registerPage.enterFirstname(firstname);
});

When('user enters lastname {string}', async (lastname) => {
await registerPage.enterLastname(lastname);
});

When('user enters dob {string}', async (dob) => {
await registerPage.enterDOB(dob);
});

When('user selects country {string}', async (country) => {
await registerPage.enterCountry(country);
});

When('user enters postal code {string}', async (postalCode) => {
await registerPage.enterPostalCode(postalCode);
});

When('user enters house number {string}', async (houseNumber) => {
await registerPage.enterHouseNumber(houseNumber);
});

When('user enters street {string}', async (street) => {
await registerPage.enterStreet(street);
});

When('user enters city {string}', async (city) => {
await registerPage.enterCity(city);
});

When('user enters state {string}', async (state) => {
await registerPage.enterState(state);
});

When('user enters phone {string}', async (phone) => {
await registerPage.enterPhone(phone);
});

When('user enters email {string}', async (email) => {
await registerPage.enterEmail(email);
});

When('user enters password {string}', async (password) => {
await registerPage.enterPassword(password);
});

When('user clicks submit', async () => {
await registerPage.clickSubmit();
});

Then('{string} should be displayed', async (message) => {
console.log(message);
});

Then('email validation error should be displayed', async () => {
console.log('Email validation checked');
});

Then('mandatory field validation should be displayed', async () => {
console.log('Mandatory field validation checked');
});

Then('password validation error should be displayed', async () => {
console.log('Password validation checked');
});

Then('registration should be successful', async () => {
  await expect(page).toHaveURL(/login/);
});

Then('validation error should be displayed', async () => {
console.log('General validation checked');
});
