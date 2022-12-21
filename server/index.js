const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const leaveRoom = require('./utils/leave-room');

const corsOptions = {
    origin: [
        'http://localhost:4000',
        'http://localhost:4000/chat',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Add cors middleware

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4000',
        methods: ['GET', 'POST'],
    },
});

const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // We can write our socket event listeners in here...

    socket.on('join_room', (data) => {
        console.log(data, 'emit join room');
        const { name, room } = data; // Data sent from client when join_room event emitted
        console.log(room, 'room');
        socket.join(room); // Join the user to a socket room

        let __createdtime__ = Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined
        io.to(room).emit('receive_message', {
            message: `${name} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });

        // Send welcome msg to user that just joined chat only
        socket.emit('receive_message', {
            message: `Welcome ${name}`,
            username: CHAT_BOT,
            __createdtime__,
        });
        // Save the new user to the room
        // chatRoom = room;
        // allUsers.push({ id: socket.id, name, room });
        // chatRoomUsers = allUsers.filter((user) => user.room === room);
        // socket.to(room).emit('chatroom_users', chatRoomUsers);
        // socket.emit('chatroom_users', chatRoomUsers);

    });
    // send message
    socket.on('message', (data) => {
        console.log(data, 'message');
        socket.emit('messageResponse', data)
    });

    // leave room
    socket.on('leave_room', (data) => {
        const { name, room } = data;
        socket.leave(room);
        const __createdtime__ = Date.now();
        // Remove user from memory
        // allUsers = leaveRoom(socket.id, allUsers);
        // socket.to(room).emit('chatroom_users', allUsers);
        // socket.to(room).emit('receive_message', {
        //     username: CHAT_BOT,
        //     message: `${name} has left the chat`,
        //     __createdtime__,
        // });
        // console.log(`${name} has left the chat`);
    });
});

server.listen(5050, () => 'Server is running on port 5050');