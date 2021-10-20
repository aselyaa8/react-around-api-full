
# Around the U.S

Author: Assel Kadyrkul

Around the U.S. is an Instagram-like web application that allows user to share their photo content.


## Live 

Link to deployed [website](https://assel.students.nomoreparties.site/)

## Description
Aim: to deploy full-stack application.
The API of "Around the U.S." with authorization and registration handled by the back-end server.
This repository contains the full API of "Around the U.S." project that features user authorization and user registration and handles cards and users.


Functionalities: 

- Allows users to register and login. Token check for subsequent visits.
- Allows users to update profile name, avatar and description
- Allows users to post/delete/like/dislike cards. Users can delete only created by them cards.
- Page is fully responsive. Smooth transitions and layouts are implemented.
- All actions/routes with user and cards are managed by [API](https://api.assel.students.nomoreparties.site/) using express.js
- MongoDB is used for storing user and cards data
- Helmet used to secure HTTP headers returned by Express app
- CORS protection allows access only from selected routes
- Rate-limiter used to prevent DDOS attacks.
- Celebrate & Joi used for validation in back-end to ensure that all of your inputs are correct before any handler function.
- Bcrypt used for password hashing.
- Winston is used to provide error and request logging for easier maintenance

## Tech
React, React router, NodeJS, Express.js, MongoDB, GCP

## Future improvements
 - Adding comments section
- Show who liked post
- Functionality of modifying posted card
- Use Typescript and refactor.
- Add form validation 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
