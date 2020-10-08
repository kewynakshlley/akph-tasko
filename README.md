# tasko

tasko is an app to manage tasks. Basically an user can create an account, authenticate, create and manage tasks that will be seen only for him. I've created this project to improve my knowledge in nodejs and also to use managed databases in production.

BASE URL: https://akph-tasko.herokuapp.com/

CREATE USER: /users
LOG IN: /users/login
GET, Update or DELETE user: users/me
Upload profile photo: users/me/avatar

Once logged you can use http verbs on /tasks

Soon enough I pretend to create a frontend app using React to use this API.

## Built With

* [Nodejs](https://nodejs.org/en/) - Client-side framework used
* [npm](https://www.npmjs.com/) - Dependency Management
* [MongoDB](https://www.mongodb.com/) - Database used
* [Expressjs](https://expressjs.com/) - Nodejs web application framework
