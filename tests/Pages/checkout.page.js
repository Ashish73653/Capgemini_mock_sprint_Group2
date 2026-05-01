class CartPage {
  constructor(page) {
    this.page = page;

    this.signIn = '//a[.="Sign in"]';
    this.email = "#email";
    this.password = "#password";
    this.loginBtn = '(//input[@type="submit"])[1]';

    this.home = '//a[.="Home"]';
    this.product = '(//div[@class="card-img-wrapper position-relative"])[1]';
    this.addToCart = "#btn-add-to-cart";

    this.cart = '//a[@aria-label="cart"]';
    this.quantity = '//input[contains(@class,"quantity")]';

    this.checkoutBtn =
      '//button[contains(normalize-space(.),"Proceed to checkout")]';

    this.country = "#country";
    this.postal = "#postal_code";
    this.house = "#house_number";
    this.city = "#city";
    this.street = "#street";
    this.state = "#state";

    this.payment = "#payment-method";
    this.confirm = '//button[contains(. ,"Confirm")]';
    this.loggedInMessage =
      "text=Hello John Doe, you are already logged in. You can proceed to checkout.";

    this.success = "text=Thanks for your order!";
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async clickSignIn() {
    await this.page.locator(this.signIn).click();
  }

  async login(email, password) {
    await this.page.locator(this.email).waitFor();
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.password).fill(password);
    await this.page.locator(this.loginBtn).click();

    // important wait
    await this.page.waitForLoadState("networkidle");
  }

  async goHome() {
    await this.page.locator(this.home).waitFor();
    await this.page.locator(this.home).click();
  }

  async selectProduct() {
    await this.page.locator(this.product).waitFor();
    await this.page.locator(this.product).click();
  }

  async addCart() {
    await this.page.locator(this.addToCart).waitFor();
    await this.page.locator(this.addToCart).click();
  }

  async openCart() {
    await this.page.locator(this.cart).waitFor();
    await this.page.locator(this.cart).click();
  }

  async updateQty(qty) {
    await this.page.locator(this.quantity).waitFor();
    await this.page.locator(this.quantity).fill(qty);
  }

  async proceedCheckout() {
    await this.clickVisibleProceedCheckout();
  }

  async loginIfVisible(email, password) {
    const emailField = this.page.locator(this.email);

    if (await emailField.isVisible()) {
      await emailField.fill(email);
      await this.page.locator(this.password).fill(password);
      await this.page.locator(this.loginBtn).click();
      await this.page.waitForLoadState("networkidle");
    } else {
      await this.clickVisibleProceedCheckout();
    }
  }

  async fillAddress(data) {
    const countryLocator = this.page.locator(this.country);

    try {
      // Try normal visible interaction first
      await countryLocator.waitFor({ state: "visible", timeout: 5000 });
      await countryLocator.scrollIntoViewIfNeeded();
      // Try selecting by label/value
      await countryLocator
        .selectOption({ label: data.country })
        .catch(() => countryLocator.selectOption(data.country));

      await this.page.locator(this.postal).fill(data.postal_code);
      await this.page.locator(this.house).fill(data.house_number);
      await this.page.locator(this.city).fill(data.city);
      await this.page.locator(this.street).fill(data.street);
      await this.page.locator(this.state).fill(data.state);
    } catch (err) {
      // Fallback: some sites render a hidden select or use custom widgets.
      // Set values directly in the page DOM and dispatch events so frameworks pick up changes.
      await this.page.evaluate((d) => {
        const setValue = (selector, value) => {
          const el = document.querySelector(selector);
          if (!el) return;
          if (el.tagName === "SELECT") {
            // try match by value, label or text
            for (const opt of Array.from(el.options)) {
              if (
                opt.value === value ||
                opt.label === value ||
                opt.text === value
              ) {
                el.value = opt.value;
                break;
              }
            }
            el.dispatchEvent(new Event("change", { bubbles: true }));
          } else {
            el.value = value;
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
          }
        };

        setValue("#country", d.country);
        setValue("#postal_code", d.postal_code);
        setValue("#house_number", d.house_number);
        setValue("#city", d.city);
        setValue("#street", d.street);
        setValue("#state", d.state);
      }, data);
    }
  }

  async proceedCheckoutIfVisible() {
    const loggedInMessage = this.page.locator(this.loggedInMessage);

    if (await loggedInMessage.isVisible()) {
      await this.clickVisibleProceedCheckout();
      return;
    }

    await this.clickVisibleProceedCheckout();
  }

  async clickVisibleProceedCheckout() {
    const buttons = this.page.locator("button", {
      hasText: "Proceed to checkout",
    });
    const total = await buttons.count();

    for (let index = 0; index < total; index += 1) {
      const button = buttons.nth(index);

      if ((await button.isVisible()) && (await button.isEnabled())) {
        await button.click();
        return;
      }
    }

    throw new Error("No visible enabled Proceed to checkout button found");
  }

  async selectPayment(method) {
    await this.page.locator(this.payment).waitFor();
    await this.page.locator(this.payment).selectOption(method);
  }

  async confirmOrder() {
    const buttons = this.page.locator(this.confirm);

    // Wait until at least one Confirm button is visible
    await buttons.first().waitFor({ state: "visible", timeout: 15000 });

    // Try up to two clicks because the Confirm button can appear twice
    for (let attempt = 0; attempt < 2; attempt++) {
      const total = await buttons.count();
      let clicked = false;

      for (let i = 0; i < total; i++) {
        const btn = buttons.nth(i);
        if ((await btn.isVisible()) && (await btn.isEnabled())) {
          await btn.scrollIntoViewIfNeeded();
          await btn.click();
          clicked = true;
          // allow UI to update / next button to appear
          await this.page.waitForTimeout(500);
          break;
        }
      }

      if (!clicked) break; // nothing to click, stop attempts

      if (await this.page.locator(this.success).isVisible()) break;
    }

    // Wait for success confirmation
    await this.page
      .locator(this.success)
      .waitFor({ state: "visible", timeout: 30000 });
  }
}

module.exports = { CartPage };
