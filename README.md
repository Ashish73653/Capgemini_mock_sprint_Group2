# Capgemini_mock_sprint

# Day 1 Tasks

## 🧪 Test Scenario Distribution (4 Members)

### 👤 Adarsh → Register

1. Open website
2. Click on "Sign In"
3. Click on "Register"
4. Enter valid details:
   - First Name
   - Last Name
   - Email
   - Password
5. Click on "Register" button
6. Verify:
   - User is successfully registered
   - Redirected to login page or dashboard
7. Validate error messages for:
   - Invalid email
   - Weak password
   - Empty fields

### 👤 Harsh → Login

1. Open website
2. Click on "Sign In"
3. Enter valid credentials
4. Click on "Login"
5. Verify:
   - User is logged in successfully
   - User name is visible
6. Negative scenarios:
   - Invalid email/password
   - Empty fields
   - Verify error messages
7. Logout and verify session ends

### 👤 Aadi → Product Flow (End-to-End Shopping 🔥)

Register → Login → Home Page → Categories → Hand Tools

1. Login with valid user
2. Navigate to "Categories"
3. Select "Hand Tools"
4. Apply Sort:
   - Price: High to Low
5. Verify sorting is correct
6. Select first product
7. Verify product details:
   - Name
   - Price
   - Description
8. Click "Add to Cart"
9. Verify product is added to cart
10. Go to Cart page
11. Verify:
    - Correct product
    - Correct price
    - Quantity

### 👤 Ashish → Cart + Checkout Flow 💥

1. Login with valid user
2. Add any product to cart
3. Go to Cart
4. Update quantity of product
5. Remove product and verify removal
6. Add product again
7. Click "Proceed to Checkout"
8. Enter shipping details
9. Select payment method
10. Place order
11. Verify:
    - Order confirmation message
    - Order ID generated
12. Logout and verify session ends
