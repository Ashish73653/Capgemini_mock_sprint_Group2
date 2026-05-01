class Shopping{
    constructor(page, expect){
        this.page = page
        this.expect = expect;
        this.emailTF = page.getByPlaceholder('Your email')
        this.passwordTF = page.getByPlaceholder('Your password')
        this.loginBtn = page.locator('//input[@data-test="login-submit"]')
        this.homeBtn = page.locator('//a[@data-test="nav-home"]')
        this.searchTF = page.getByPlaceholder('Search')
        this.sortSF = page.locator('//select[@data-test="sort"]')
        this.firstproduct = page.locator('(//div[@class="container"])[4]/a[1]//h5')
        this.quantityTF = page.locator('//input[@data-test="quantity"]')

        this.addToCartBtn = page.locator('//button[@id="btn-add-to-cart"]')
        this.categoryCB = page.locator('//div[@id="filters"]/fieldset[1]/div[2]/label')
        this.rangeSlider = page.locator('//span[@role="slider"][2]')
        this.goToCartBtn = page.locator('//a[@data-test="nav-cart"]')
        this.removeProductBtn = page.locator('(//a[@class="btn btn-danger"])[1]')
        this.checkOutBtn = page.locator('(//button[@class="btn btn-success"])[1]');

    }

    async launch(url){
        this.page.goto(url)
    }

    async enteremail(email){
        await this.emailTF.waitFor({ state: 'visible' })
        await this.emailTF.fill(email)
    }

    async enterpassword(password){
        await this.passwordTF.waitFor({ state: 'visible' })
        await this.passwordTF.fill(password)
    }

    async clicklogin(){
        await this.page.waitForTimeout(5000)
        await this.loginBtn.waitFor({ state: 'visible' })
        await this.loginBtn.click()
        await this.page.waitForTimeout(5000)
    }

    async goToHome(){
        await this.homeBtn.click()
    }

    async searchProduct(productName){
        await this.searchTF.fill(productName)
        await this.searchTF.press('Enter')
        await this.page.waitForTimeout(2000)
    }

    async sortProducts(optionValue){
        await this.sortSF.selectOption(optionValue)
    }

    async selectFirstProduct(){
        await this.page.waitForTimeout(5000)
        await this.firstproduct.click()
    }

    async setQuantity(quantity){
        await this.quantityTF.fill(quantity)
    }

    async addToCart(){
        await this.addToCartBtn.waitFor({state : 'visible', timeout : 60000})
        await this.addToCartBtn.click()
    }

    async filterByCategory(){
        await this.categoryCB.click()
    }

    async adjustPriceRange(steps = 10) {
         this.rangeSlider.focus();

        for (let i = 0; i < steps/2; i++) {
            await this.page.keyboard.press('ArrowLeft');
        }
    }

    async goToCart(){
        await this.goToCartBtn.waitFor({state : 'visible', timeout : 60000})
        await this.goToCartBtn.click()
    }

    async removeProduct(){
        await this.removeProductBtn.click()
    }

    async confirmCheckoutOption(){
        await this.expect(this.checkOutBtn).toHaveText('Proceed to checkout')
        await this.expect(this.checkOutBtn).toBeEnabled()
        await this.expect(this.checkOutBtn).toBeVisible()
    }
}

module.exports = {Shopping}