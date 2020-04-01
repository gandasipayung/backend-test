# BACKEND-TEST-API DOCUMENTATION

This API (server) using postgre as database and sequelize for ORM, so, make sure you have installing sequelize-cli and postgres to run this API


## API (server) setup
1. npm install
2. sequelize db:create
3. sequelize db:migrate
4. npm run dev

Oke, now we are ready to rock !
## Base Url
  ```
  http://localhost:3000
  ```

## User Register
----
  Returns json data about new User.

* **URL**
  ```
  /register
  ```

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  **Required**
    
    Headers:
    
    `Content-Type: application/x-www-form-urlencoded`

    Body :

    ```
    name: String
    email: String
    password: String
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    
    expample
    ```
      {
        "msg": "User Register Success",
        "name": "ganda",
        "email": "gandasipayung14@gmail.com"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request (duplicated Email) <br />
    **Content:**
    
    ```
    {
      "msg": "Register Failed, email already used,
              please use another email"
    }
    ```
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    
    ```
    {
      "msg": "Internal Server Error"
    }
    ```
    <br/>  

## User Login
----
  Sending unique code to email and proceed to auth.

* **URL**
  ```
  /login
  ```

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  **Required**
    
    Headers:
    
    `Content-Type: application/x-www-form-urlencoded`

    Body :

    ```
    email: String
    password: String
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
    expample
    ```
      {
        "msg": "We have sent an email to <user-email>@gmail.com,
        please check the code in your email"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:**
    
    ```
    {
      "msg": "Email/Password Wrong !"
    }
    ```
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    
    ```
    {
      "msg": "Internal Server Error"
    }
    ```
    <br/>
## User Authentication
----
  Return jwt token.

* **URL**
  ```
  /auth
  ```

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  **Required**
    
    Headers:
    
    `Content-Type: application/x-www-form-urlencoded`

    Body :

    ```
    email: String
    authKey: String (from email that your received)
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
    expample
    ```
      {
        "msg": "Login Success",
        "token": <jwt_token>
      }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:**
    
    ```
    {
      "msg" : "login Failed, please check the code and enter again"
    }
    ```
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    
    ```
    {
      "msg": "Internal Server Error"
    }
    ```
    <br/>

For Client i use vue and vuex, so if you want to test with client too, please follow the step below.

1. npm install
2. npm run serve

Thank you

by : Ganda Sipayung, 2020