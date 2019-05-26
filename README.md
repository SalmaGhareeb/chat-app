# Chat App

A Real Time Chat Application built using Node.js, Express, Mongoose, Socket.io, JWT Authentication, & Redis.

## Features

- Uses Express as the application Framework.
- Authenticates via username and password using JWT.
- Passwords are hashed using bcrypt-nodejs package.
- Real-time communication between a client and a server using Socket.io.
- Uses MongoDB and Mongoose for storing and querying data.
- Uses Redis as an Adapter for Socket.io.

## Prerequisites

- Install docker as per this [installation guide ](https://docs.docker.com/compose/install/).
- Install GIT as per this [installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- Git clone `git clone git@github.com:SalmaAbdelhady/chat-app.git`
- Create your `.env` file
- Run the app using `docker-compose up`  or  `make up`
- Hit `localhost:8000` to start chatting.

## Endpoints

- [Postman collection](https://documenter.getpostman.com/view/3286293/S1M3wRQD?version=latest)

## Done 
- [x] Registration page.
- [x] Login page.
- [x] Chat: A section that would allow you to create/initiate new chats for a group or with a single user
- [x] Messages: This feature would allow a user to send messages to other users in a chat.

## To Do

- [ ] User Status: This shows the online/offline status of the user.
- [ ] User Profile: A section where a user can view any other users profile and edit their own profile.
- [ ] Add Private chat to client implementation.
- [ ] Test coverage.