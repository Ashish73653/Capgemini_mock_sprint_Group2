class RegisterPage{
    constructor(page){
        this.page=page;
        this.firstnameTF=page.locator('#first_name');
        this.lastnameTF=page.locator('#last_name');
        this.dobTF=page.locator('#dob');
        this.countryDropDown=page.locator('#country');
        this.postalCodeTF=page.locator('#postal_code');
        this.houseNumberTF=page.locator('#house_number');
        this.streetTF=page.locator('#street');
        this.cityTF=page.locator('#city');
        this.stateTF=page.locator('#state');
        this.phoneTF=page.locator('#phone'); 
        this.emailTF=page.locator('#email');
        this.passwordTF=page.locator('#password');
        this.submitBtn=page.locator('[class="btnSubmit mb-3"]');
    }
    async launchURL(url){
        await this.page.goto(url)
    }

    async enterFirstname(firstname) {
        await this.firstnameTF.fill(firstname);
    }

    async enterLastname(lastname) {
        await this.lastnameTF.fill(lastname);
    }

    async enterDOB(dob) {
    await this.dobTF.fill(dob);
    }

    async enterCountry(country) {
        await this.countryDropDown.selectOption(country);
    }

    async enterPostalCode(postalCode) {
        await this.postalCodeTF.fill(postalCode);
    }

    async enterHouseNumber(houseNumber) {
        await this.houseNumberTF.fill(houseNumber);
    }

    async enterStreet(street) {
        await this.streetTF.fill(street);
    }

    async enterCity(city) {
        await this.cityTF.fill(city);
    }

    async enterState(state) {
        await this.stateTF.fill(state);
    }

    async enterPhone(phone) {
        await this.phoneTF.fill(phone);
    }

    async enterEmail(email) {
        await this.emailTF.fill(email);
    }
    
    async enterPassword(password) {
        await this.passwordTF.fill(password);
    }

    async clickSubmit() {
        await this.submitBtn.click();
    }

    
    



}
module.exports={RegisterPage}