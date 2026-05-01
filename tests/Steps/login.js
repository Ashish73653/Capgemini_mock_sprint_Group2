const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { expect } = require('@playwright/test');

let browser, context, page, login;

setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  login = new LoginPage(page);
});

AfterAll(async () => {
  await browser.close();
});



Given('I am on the login page', async () => {
  await login.openLoginPage();
});

When('I enter {string} and {string}', async (email, password) => {
  await login.enterCredentials(email, password);
});

When('I click the login button', async () => {
  await login.clickLogin();
});

Then('{string} should be displayed', async (result) => {

  if (result === 'success') {
    await expect(login.userMenu).toBeVisible();
  } 
   
  else if (result === 'validation') {
    await expect(login.errorMsg).toBeVisible();
  }

});



Given('I am logged in with valid credentials', async () => {
  await login.openLoginPage();
  await login.login('customer@practicesoftwaretesting.com', 'welcome01');
  await expect(login.userMenu).toBeVisible();
});

Then('I should see the username on the dashboard', async () => {
  await expect(login.userMenu).toBeVisible();
});




When('I click the logout button', async () => {
  await login.clickLogout();
});

Then('I should be redirected to the login page', async () => {
  await expect(page).toHaveURL(/login/);
});