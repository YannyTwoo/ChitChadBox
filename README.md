# ChitChadBox

Implementation->


## Frontend->
1. Create a div with class 'chat-box-wrapper-all' on your HTML/EJS file anywhere.
2. Include the script.js adn styles.css into your HTML file.
3. Include ```<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.1/socket.io.js"></script>``` inside the ```<head>``` tag of your html file. This is so that we can run the socket client on the front end


## Backend->
1. Change the URL inside the quotes to that on which you'll be running the index.js file 
HERE: const socket = io('http://localhost:7896')
2. npm start to run the index.js file on a nodejs server

Your static website will have a functional dynamic group chat feature
