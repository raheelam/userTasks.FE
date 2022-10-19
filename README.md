# userTasks.FE

## Hosted Application

https://ut-system.netlify.app/

## Technologies Used

- React
- Babel
- Webpack
- Axios
- project is created using CRA

## Installation

1.  Git clone this repository `https://github.com/raheelam/userTasks.FE.git`
2.  Change your directory `cd userTasks.FE`
3.  Install all dependencies `npm install`
4.  Create .env file which will be used to load environment variables see sample in `.env.example` file in the project
5.  Start the app `npm start` for development
6.  Navigate to `localhost:3000` in your browser (or the available port)

## Features

- Admin can login using the below credential:
  Email: admin@example.com
  Password: qwerty
- Admin can see the list of users.
- Admin can update user details.
- Admin can delete users.
- Admin can add tasks for users.
- Admin can update user tasks.
- User can sign up with their email and password. Every user is given a basic role by default.
  you can signup as a basic user or login as a basic user with:
  Email: raheelamoha@example.com
  Password: qwerty
- Users can view and update the status of their tasks.
- Ensure User can't access login when they are already loggedin
- Ensure User can't access authenticated pages e.g users, tasks.
- Using endpoints from https://bunny-user-tasks.herokuapp.com/

## Author

- Rahila Ilegbodu
