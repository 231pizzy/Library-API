This project is a Node.js-based REST application that serves as a data source for a library web application. The application exposes a single REST resource, the "Book Resource," which handles CRUD endpoints for managing a list of books. All endpoints are designed to be accessed by authenticated users. The data is persisted to a MongoDB database.

Requirements
The application should fulfill the following requirements:

Add a New Book: The application should allow authenticated users to add a new book to the library.

Browse All Books: Authenticated users should be able to browse through all the books available in the library.

Edit a Book: Authenticated users should have the ability to edit the details of a specific book.

Delete a Book: Authenticated users should be able to delete a book from the library.

View Book Details: Authenticated users should be able to view the details of each book.

Implementation
To achieve the project's requirements, the application should be able to perform the following operations:

GET Request: This endpoint returns all the data of books available in the database.

POST Request: This endpoint adds new book data to the database. If the database does not exist, it will be created dynamically.

PUT Request: This endpoint updates the fields of a particular book using its unique identifier (ID) in the database.

DELETE Request: This endpoint removes a specific book from the database using its unique identifier (ID).

Test Coverage
The application should be thoroughly tested using the supertest library to ensure its correctness and robustness. The test coverage should include the following scenarios:

Test for the GET Request: Verify that the endpoint returns the correct data from the database.

Test for the POST Request: Ensure that adding new book data works as expected, and the database is dynamically created if necessary.

Test for the PUT Request: Verify that updating a book's details using its ID functions correctly.

Test for the DELETE Request: Ensure that removing a book from the database using its ID works as expected.

Installation and Setup
To run the application and perform tests, follow these steps:

Install Node.js and MongoDB if you haven't already.

Clone the project repository to your local machine.

Navigate to the project directory and install the dependencies by running:
