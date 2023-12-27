# URL Shortener API
Welcome to the URL Shortener backend API documentation. This API is built using Node.js, Express, and MongoDB. It provides functionalities for user signup, login, generating short URLs, and redirecting to the original URL.

# Getting Started
## Prerequisites
Make sure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)
- MongoDB
## Installation
1. Clone the repository:
- git clone https://github.com/KirtiYadav1681/url-shortener.git

2. Install dependencies:
- cd url-shortener
- npm install

## API Endpoints
### User Signup
#### Endpoint: POST http://localhost:8000/user/signup
- Description: Register a new user.
- Request Body: { "name": User's name, "email": User's email, "password": User's password, "confirmPassword": Confirm the password}
### User Login
##### Endpoint: POST http://localhost:8000/user/login
- Description: Log in an existing user.
- Request Body: {"email": User's email, "password": User's password}
### Generate Short URL
#### Endpoint: POST htt[://localhost:8000/shorten
- Description: Generate a short URL for a given long URL.
- Request Body: {"url": Long URL to be shortened}
- Headers:
- Authorization: Bearer token (obtained during user login)
### Redirect to Original URL
#### Endpoint: GET http://localhost:8000/:shortId
- Description: Redirect to the original URL associated with the provided short ID.
  
## Run the server
- Now you're all set to run the server and start using the URL Shortener API. Make sure MongoDB is running, and then start the server:
- npm start

## The API will be available at http://localhost:8000.

Feel free to explore and integrate this API into your applications!
