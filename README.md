# Chatty App

Chatty App allows users to communicate with each other without having to register accounts. It uses React for front-end development as well as Webpack and Babel, Express for server and websocket to transfer data. 

## Getting started

To get started, please find below:
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command (PORT:3000).
4. Start websocket server from ChattyApp/server/ChatServer.js (PORT:3001) `node ChatServer.js`
5. In your browser connect to <http://localhost:3000/>

Some basic commands are:
```
npm install
npm start
node ChatServer.js <- within /server folder>
```


## How to chat

1. Your username will be 'anonymous' when you first enter the chatroom.
2. Change username by inputting desired username on the bottom left text area and pressing enter key.
3. You will get a prompt that the username has been changed.
4. start chatting by typing in the bottom right text area and typing enter.
5. Your message will be visible on other users' computer.
6. Check how many are currently using the Chatty App! :bowtie:

## Screenshots

!["Chatty App"](https://raw.githubusercontent.com/kimjaehu/tweeter/master/docs/tweet-app.png)
!["Changing username"](https://raw.githubusercontent.com/kimjaehu/tweeter/master/docs/tweet-app.png)
!["Sending message"](https://raw.githubusercontent.com/kimjaehu/tweeter/master/docs/tweet-app.png)
!["Sending image"](https://raw.githubusercontent.com/kimjaehu/tweeter/master/docs/tweet-app.png)

## Acknowledgments

* Lighthouse Labs Mentors

### Dependencies

* node
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* react
* react-dom
* express
* ws
* uuid