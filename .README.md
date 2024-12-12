# HR Information System - React + .NET Core

This project is a simple HR Information Management system that allows for the creation of Employees and the generation of Reports. An employee can be an "Admin" or "Employee", with Employee having limited restrictions.

This document provides a minimal setup to get both the React and .NET projects.


## Setup In Development (Locally)
- Clone project into your folder locally. The structure will include both frontend and backend project folders.

### Frontend - React

- Open the terminal and navigate to where the frontend project is.
- Type and run `npm install`, to load modules into your local project
- Type and run `npm run build`.
- After a successful build, type and run `npm run dev`

### Backend - .NET Core

- Open the terminal and navigate to where the frontend project is.
- Type and run `dotnet restore`.
- Type and run `dotnet build`
- Type and run `dotnet ef database update`. This is apply migrations to your local database.
- Type and run `dotnet tool install --global dotnet-ef`
- Type and run `dotnet run` or `dotnet watch`.


## API Endpoint

There are two three controllers populated with endpoints, `Authentication`, `Employee` and `Report`.
Below lists the endpoints associated with each and a description.


### Authentication

- `api/auth/login`
    - Endpoint that handles logging in a user.
    - Method: POST
    - Parameters : email, password,
    - Returns: JWT Token 

- `api/auth/validToken`
    - Endpoint that handles whether a token is valid or not.
    - Method: POST
    - Parameters : token

### Employee

**NB: All Endpoints need a valid token to access**

- `api/employees`
    - Endpoint that handles getting all employees (Admin and Employee).
    - Method: GET
    - Returns: List of all employees

- `api/employees/:id`
    - Endpoint that handles getting an with a specific id.
    - Method: GET
    - Returns: Employee with particular id  

- `api/employees`
    - Endpoint that handles creating an employee.
    - Method: POST
    - Parameters : Employee object
    - Returns: The created employee
    - Access: Can only be accessed by an admin

- `api/employees/:id`
    - Endpoint that handles updating an employee.
    - Method: PUT
    - Parameters: Employee object and id
    - Access: Can only be accessed by an admin

- `api/employees/:id`
    - Endpoint that handles deleting an employee.
    - Method: DELETE
    - Access: Can only be accessed by an admin

### Reports

- `api/reports/count`
    - Endpoint that handles retrieving count of employees.
    - Method: GET
    - Query : role (optional)
    - Returns: The count as an integer

- `api/reports/hires`
    - Endpoint that handles retrieving the number of hires in the last "n" number of days.
    - Method: GET
    - Query : days
    - Returns: The count as an integer
