
# Donut Shopping Platform

## Team Amethyst Members:

- Yuman Gong
- Kalen Duhs
- Brody Gustin

## About the Project

The Donut Shopping Platform is an e-commerce solution designed to modernize traditional brick-and-mortar businesses. By establishing an online presence, the platform aims to streamline the shopping process, attract new customers, boost sales, and enhance revenue for the owner. It addresses the challenge of limited market reach and accessibility faced by traditional businesses.

## Project Overview

This repository contains a full-stack web application developed using React for the front end, Spring Boot for the back end, and MySQL for the database. The project is structured into two main folders:

### Frontend

The `frontend` folder includes all files related to the React front end, such as components, stylesheets, and configuration files. The front end is responsible for rendering the user interface and handling user interactions.

### Backend

The `backend` folder contains the Spring Boot backend code, including main Java files, resources, and test files. The backend handles business logic, data processing, interactions with the MySQL database using RESTful APIs.

The `frontend` and `backend` folders are designed to work together seamlessly. Changes made to one may require corresponding adjustments in the other to maintain compatibility and functionality.

## Installation

To run the project locally, follow these steps:

1. Clone this repository.
2. Install dependencies in the `frontend` and `backend` folders using `npm install` and `mvn install`, respectively.
3. Configure the database connection in the `application.properties` file.
4. Run the backend server using `mvn spring-boot:run`.
5. Run the frontend server using `npm start` in the `frontend` folder.

## Usage

1. Once the servers are running, you can access the application in your web browser at `http://localhost:5173`.

2. Use the application to browse and checkout donuts from the online store.

3. Before using the backstage management system, you need to add a default admin role user in your database. You can do this by executing the following SQL query:

   ```
   INSERT INTO users (username, email, password, role) VALUES ('admin', 'admin@example.com' 'adminhashpassword', 'ADMIN');
   ```

   Replace `'adminhashpassword'` with the hashed password for the admin user. You can generate a hashed password using a tool like [bcrypt-generator.com](https://bcrypt-generator.com/).

4. Once the default admin user is added, you can log in to the backstage management system using the credentials.

## Contributing

We welcome contributions to the Donut Shopping Platform! If you have suggestions for new features, bug fixes, or other improvements, please submit a pull request. 

## Credits

- React: <https://reactjs.org/>
- Spring Boot: <https://spring.io/projects/spring-boot>
- React Bootstrap: https://react-bootstrap.netlify.app/

## Troubleshooting

If you encounter any issues while running the application, try the following steps:

1. Check the console for error messages.
2. Ensure all dependencies are properly installed.
3. Restart the servers.

## Roadmap

Our future plans for the project include:

- Adding support for different payment methods.
- Adding Rating/Review System: Users can rate and review their favorite donuts.
- Enhancing the user interface and user experiences for a better shopping experience.

## Contact

For questions, feedback, or support, please contact us at [gongymsilvia@gmail.com]().

