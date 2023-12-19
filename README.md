# Vending Machine Application

## Demo
[![Video Name](https://github.com/Dominent/Vending-Machine/assets/2464156/704e9104-0258-4533-b9e4-3b29fe15938f
)](https://drive.google.com/file/d/1CRdZTydz8j4Ns-jTPDW7z9ZUcfPljes-/view?usp=sharing "Watch the Video")

## Overview

This Vending Machine Application is a web-based application that simulates the operation of a real-world vending machine. It allows users to select products, insert coins, and receive change. The application is designed to be responsive and user-friendly.

## Features

- **Inventory Management**: Supports up to 15 units of each product type.
- **Responsive Web Design**: The interface adapts to various screen sizes.
- **Product Operations**:
  - Retrieve initial product list from a mocked API.
  - Perform CRUD operations on products within the application state.
  - Note: CRUD operations do not update data in the external resource.
- **Vending Operations**:
  - Insert coins.
  - Purchase products.
  - Reset process (return coins without purchase).
- **Change Return**: Automatically calculates and returns change.

## Accepted Coin Denominations

The machine accepts the following denominations:

- 0.01
- 0.05
- 0.25
- 0.50
- 1.00

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Running the Application

To get the Vending Machine Application up and running, follow these steps:

1. **Clone the Repository**: Clone the project from the GitHub repository or the provided link.
2. **Navigate to Project Directory**: Open a terminal and navigate to the project's root directory.
3. **Install Dependencies**: Run `npm install` to install all required dependencies.
4. **Start the Application**: You can start the application in two ways:
   - **Separately**: Run `npm run start` for the Angular app and `npm run json-server` for the JSON server in two different terminals.
   - **Concurrently**: Run `npm run start:concurrently` to start both the Angular app and JSON server concurrently.
5. **Access the Application**: Once started, the application will be available at `http://localhost:4200`.

## Additional Information

- **Mock API**: The initial products list is fetched from a mock API using JSON server.
- **Product Images**: Product images enhance the user interface, making product identification intuitive.
- **Responsive Design**: The layout adjusts to different screen sizes, ensuring usability on desktops, tablets, and smartphones.

## Technologies Used

- Angular
- NgRx (for state management)
- RxJS
- TypeScript
- JSON Server (for mock API)
- Jasmine and Karma (for testing)
- Concurrently (for running multiple npm scripts concurrently)

Unit Test
![image](https://github.com/Dominent/Vending-Machine/assets/2464156/8b25cf81-8bf5-4c0d-855e-028b1a404d6f)

Coverage
![image](https://github.com/Dominent/Vending-Machine/assets/2464156/6d79344b-5f9a-49ca-944c-860fa404068f)
