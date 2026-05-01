class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginBtn = page.locator('//input[@value="Login"]');
    this.errorMsg = page.locator('#email-error');

    this.userMenu = page.locator('//button[@id="menu"]');
    this.logoutBtn = page.getByText('Sign out');
  }

  async openLoginPage() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
  }

  async enterCredentials(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginBtn.click();
  }

  async login(email, password) {
    await this.enterCredentials(email, password);
    await this.clickLogin();
  }

  async clickLogout() {
    await this.userMenu.click();
    await this.logoutBtn.click();
  }
}

module.exports = { LoginPage };