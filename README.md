# tasko

tasko is an app to manage tasks. Basically an user can create an account, authenticate, create and manage tasks that will be seen only for him. I've created this project to improve my knowledge in nodejs and also to use managed databases in production.

BASE URL: https://akph-tasko.herokuapp.com/

- /users
    * method: POST
    * data: {"name": "Kewyn", "email":"kewyn@kewyn.com", "password":"123456"}
- /users/login
    * method: POST
    * data: {"email":"kewyn@kewyn.com, "password":"123456"}

- /users/me (authenticated)
    * methods: GET, DELETE, PATCH
- /users/logout (authenticated)
    * POST
- /users/logoutAll (authenticated)
    * POST (logout from all devices)
- /users/me/avatar (authenticated)
    * POST, DELETE
- /tasks (authenticated)
    * methods: GET, POST, DELETE, PATCH
    * data: {"name": "Kewyn", "email":"kewyn@kewyn.com", "password":"123456"}
- /tasks/ID (authenticated)
    * method: GET


Soon enough I pretend to create a frontend app using React to use this API.

## Built With

* [Nodejs](https://nodejs.org/en/) - Client-side framework used
* [npm](https://www.npmjs.com/) - Dependency Management
* [MongoDB](https://www.mongodb.com/) - Database used
* [Expressjs](https://expressjs.com/) - Nodejs web application framework


