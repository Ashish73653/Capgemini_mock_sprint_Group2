const { Given, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const { CartPage } = require("../Pages/checkout.page");

let browser, page, cart;
setDefaultTimeout(60000);

Given("user navigates to {string}", async function (url) {
  browser = await chromium.launch({ headless: false, slowMo: 300 });
  page = await browser.newPage();

  // attach to cucumber world (important)
  this.browser = browser;
  this.page = page;

  cart = new CartPage(page);
  await cart.goto(url);
});

Given("user clicks on sign in", async function () {
  await cart.clickSignIn();
});

Given(
  "user logs in with email {string} and password {string}",
  async function (email, password) {
    await cart.login(email, password);
  },
);

Given("user navigates to home page", async function () {
  await cart.goHome();
});

Given("user selects first product", async function () {
  await cart.selectProduct();
});

Given("user adds product to cart", async function () {
  await cart.addCart();
});

Given("user opens cart", async function () {
  await cart.openCart();
});

Given("user updates quantity to {string}", async function (qty) {
  await cart.updateQty(qty);
});

Given("user proceeds to checkout", async function () {
  await cart.proceedCheckout();
});

Given(
  "user handles login if required with {string} and {string}",
  async function (email, password) {
    await cart.loginIfVisible(email, password);
  },
);

Given("user fills address details", async function (table) {
  const data = table.hashes()[0];
  await cart.fillAddress(data);
});

Given("user clicks on proceed to checkout if visible", async function () {
  await cart.proceedCheckoutIfVisible();
});

Given("user selects payment method {string}", async function (method) {
  await cart.selectPayment(method);
});

Given("user confirms the order", async function () {
  await cart.confirmOrder();
});

Then("order should be placed successfully", async function () {
  await expect(page.locator(cart.success)).toBeVisible({
    timeout: 15000,
  });

  await browser.close();
});
