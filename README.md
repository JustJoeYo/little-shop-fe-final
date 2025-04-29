# Hang in There  

<a href="https://github.com/JustJoeYo/little-shop-be-final">
  link to backend
</a>

### Contributors:

<a href="https://github.com/JustJoeYo">
  <img src="https://avatars.githubusercontent.com/u/53631725?v=4" alt="contrib.rocks image" width="128" height="128" />
</a>

Joe's [![Joe's LinkedIn][linkedin-shield]][linkedin-url]

### Abstract:
Little shop is an admin portal that has an interface for an ecommerce platorm for our merchants. They can add and edit items and gives them a realtime visualization of the database. It comes with a search functionality and sort functions to help organize the view. Our app is solving the problem of letting the merchants manage their items from this portal in an easy user friendly way.

### Installation Instructions:
1. Clone the repository:
`git clone https://github.com/JustJoeYo/little-shop-fe.git
cd little-shop-fe`

2. Install dependencies:
`npm install`

3. Start the development server:
`npm run dev`

4. Ensure the backend API is running at the expected endpoint

5. Access the application at http://localhost:5173

### Preview of App:
<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm0zOGQ5cW80ZjBqOTBkZHI1ejhweDdrcXNmeDIxbGtyM2Jsa2o4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UYCn3cJROy8r8bMD5P/giphy.gif" alt="image" height="612" width="960" />

### Context:
I worked on this project over a span of 6 days, during which we introduced a redesigned frontend that significantly improved upon the original and now uses react. The updated design added new features like a search bar and sorting options, and included refreshed styling to enhance readability and create a cleaner, more user-friendly interface, also added some filtering options for ease of use.

### Learning Goals:
* Write migrations to create tables and relationships between tables
* Implement CRUD functionality for a resource
* Use MVC to organize code effectively, limiting the amount of logic included in serializers and controllers
* Use built-in ActiveRecord methods to join tables of data, make calculations, and group data based on one or more attributes
* Write model tests that fully cover the data logic of the application
* Write request tests that fully cover the functionality of the application
* Display data for users in a frontend application by targeting DOM elements

### Wins + Challenges:
Wins: Getting the backend working with our postman tests and succesfully getting the backend and frontend working together as well as learning to use axios for api requests.
A challenge I faced was having the page refresh after each fetch/request made to the backend after submitting new items/merchants/coupons. I overcame this by preventing default/using some other logical changes that ensured the page didn't need to be refreshed.


[contributors-shield]: https://img.shields.io/github/contributors/JustJoeYo/futbol.svg?style=for-the-badge
[contributors-url]: https://github.com/JustJoeYo/futbol/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/joseph-samere-981a5b291/
