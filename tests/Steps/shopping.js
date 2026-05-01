const {test} = require('../fixtures.js')
const {expect, chromium, firefox} = require('@playwright/test')

const {Given, When, Then, BeforeAll, AfterAll, Before, After} = require('@cucumber/cucumber')
const {Shopping} = require('../pages/shoppingpage.js')
const { setDefaultTimeout } = require('@cucumber/cucumber')

setDefaultTimeout(60000)

let shoppingpg
let page, browser, context

BeforeAll(async()=>{
    browser = await chromium.launch({headless : false})
    context = await browser.newContext()
    page = await context.newPage()
})

// AfterAll(async()=>{
//     await page.close()
// })

Given("navigate to {string}", async(url)=>{
    shoppingpg = new Shopping(page, expect)
    await shoppingpg.launch(url)
})

When("enter email {string}", async (email) => {
    await shoppingpg.enteremail(email)
})

When("enter password {string}", async (password) => {
    await shoppingpg.enterpassword(password)
})

When("login", async () => {
    await shoppingpg.clicklogin()
})

When("go to home", async () => {
    await shoppingpg.goToHome()
})

When("search {string}", async (product) => {
    await shoppingpg.searchProduct(product)
})

When("sort {string}", async (option) => {
    await shoppingpg.sortProducts(option)
})

When("select first product", async () => {
    await shoppingpg.selectFirstProduct()
})

When("increase quantity {string}", async (qty) => {
    await shoppingpg.setQuantity(qty)
})

When("add to cart", async () => {
    await shoppingpg.addToCart();
});

When("go back", async () => {
    await page.goBack()
})

When("select category {string}", async (category) => {
    await shoppingpg.filterByCategory()
})

When("set price range {string}", async(price) =>{
    await shoppingpg.adjustPriceRange(price);
})

When("go to cart", async () => {
    await shoppingpg.goToCart()
})

When("remove first product", async () => {
    await shoppingpg.removeProduct()
})

Then('checkout option', async() =>{
    console.log("done")
})