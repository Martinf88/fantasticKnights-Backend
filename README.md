# Webshop API Documentation

This is the backend API for a webshop built with Node.js, Express, and MongoDB Atlas. The API provides functionality for products, users, and cart management. Below is the detailed information on how to interact with the API.

## Base URL
http://localhost:9876


## Endpoints

### Products

1. **Get All Products**
   - **URL**: `/products`
   - **Method**: `GET`
   - **Description**: Fetch all products.
   - **Response**:
     ```json
     [
       {
         "_id": "product_id",
         "name": "Product Name",
         "price": 99.99,
         "image": "url",
         "amountInStock": 100
       }
     ]
     ```

2. **Add a New Product**
   - **URL**: `/products`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "name": "Product Name",
       "price": 99.99,
       "image": "url"
       "amountInStock": 100,
     }
     ```
   - **Description**: Add a new product to the database.

3. **Update a Product**
   - **URL**: `/products/:id`
   - **Method**: `PUT`
   - **Body**: Same as POST.
   - **Description**: Update an existing product by its ID.

4. **Delete a Product**
   - **URL**: `/products/:id`
   - **Method**: `DELETE`
   - **Description**: Delete a product by its ID.

5. **Search Products by Name**
   - **URL**: `/products/search`
   - **Method**: `GET`
   - **Query Parameter**: `name`
     ```
     /products/search?name={query}
     ```
   - **Description**: Search for products by name.

### Cart

1. **Get All Cart Items**
   - **URL**: `/cart`
   - **Method**: `GET`
   - **Description**: Fetch all items in the cart.

2. **Add an Item to Cart**
   - **URL**: `/cart`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "userId": "user_id",
       "productId": "product_id",
       "quantity": 1
     }
     ```
   - **Description**: Add a product to the cart.

3. **Update Cart Item**
   - **URL**: `/cart/:id`
   - **Method**: `PUT`
   - **Description**: Update the quantity of a cart item by its ID.

4. **Delete a Cart Item**
   - **URL**: `/cart/:id`
   - **Method**: `DELETE`
   - **Body**: Same as POST.
   - **Description**: Remove an item from the cart by its ID.

### Users

1. **Get All Users**
   - **URL**: `/users`
   - **Method**: `GET`
   - **Description**: Fetch all users.

2. **Get a User by ID**
   - **URL**: `/users/:id`
   - **Method**: `GET`
   - **Description**: Fetch a single user by ID.

3. **Add a New User**
   - **URL**: `/users`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "name": "User Name",
       "email": "user@example.com",
       "password": "Password123"
     }
     ```
   - **Description**: Add a new user.

4. **Update a User**
   - **URL**: `/users/:id`
   - **Method**: `PUT`
   - **Body**: Same as POST.
   - **Description**: Update user details.

5. **Delete a User**
   - **URL**: `/users/:id`
   - **Method**: `DELETE`
   - **Description**: Delete a user by their ID.

6. **Search Users by Name**
   - **URL**: `/users/search`
   - **Method**: `GET`
   - **Query Parameter**: `name`
     ```
     /users/search?name={query}
     ```
   - **Description**: Search for users by name.

## Validation

All incoming requests are validated using Joi to ensure the correct data structure.

## Frontend Integration

For frontend developers, use fetch or any other HTTP client to interact with these endpoints. Ensure that your requests include the appropriate headers and body (for POST/PUT requests).