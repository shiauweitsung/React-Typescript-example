const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });
const { dockStart } = require('@nlpjs/basic');
const leaveRoom = require('./utils/leave-room');

const corsOptions = {
    origin: [
        'http://localhost:4000',
        'http://localhost:4000/chat',
        'https://shiauweitsung.github.io/',
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

async function trainChatBotIA() {
    return new Promise(async (resolve, reject) => {
        // Adds the utterances and intents for the NLP
        // // Train also the NLG
        // Adds the utterances and intents for the NLP
        manager.addDocument('en', 'goodbye for now', 'greetings.bye');
        manager.addDocument('en', 'bye bye take care', 'greetings.bye');
        manager.addDocument('en', 'okay see you later', 'greetings.bye');
        manager.addDocument('en', 'bye for now', 'greetings.bye');
        manager.addDocument('en', 'i must go', 'greetings.bye');
        manager.addDocument('en', 'hello', 'greetings.hello');
        manager.addDocument('en', 'hi', 'greetings.hello');
        manager.addDocument('en', 'howdy', 'greetings.hello');
        // Train also the NLG
        manager.addAnswer('en', 'greetings.bye', 'Till next time');
        manager.addAnswer('en', 'greetings.bye', 'see you soon!');
        manager.addAnswer('en', 'greetings.hello', 'Hey there!');
        manager.addAnswer('en', 'greetings.hello', 'Greetings!');
        await manager.train();
        manager.save();
        console.log("AI has been trainded")
        resolve(true);
    })
}
// trainChatBotIA();

async function generateResponseAI(qsm) {
    // Train and save the mode
    return new Promise(async (resolve, reject) => {
        response = await manager.process('en', qsm);
        resolve(response);
    })
}

// Listen for when the client connects via socket.io-client
io.on('connection', async (socket) => {
    console.log(`User connected ${socket.id}`);
    let __createdtime__ = Date.now(); // Current timestamp
    // We can write our socket event listeners in here...

    // get robot ai text
    const dock = await dockStart({ use: ['Basic'] });
    const nlp = dock.get('nlp');
    await nlp.train();

    socket.on('join_room', (data) => {
        console.log(data, 'emit join room');
        const { name, room } = data; // Data sent from client when join_room event emitted
        console.log(room, 'room');
        socket.join(room); // Join the user to a socket room


        // Send message to all users currently in the room, apart from the user that just joined
        io.to(room).emit('receive_message', {
            message: `${name} has joined the chat room`,
            name: CHAT_BOT,
            __createdtime__,
        });

        // Send welcome msg to user that just joined chat only
        socket.emit('receive_message', {
            message: `Welcome ${name}`,
            name: CHAT_BOT,
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
    socket.on('message', async (data) => {
        console.log(data, 'message');
        socket.emit('messageResponse', data);
        // let response = await generateResponseAI(data.message);
        const response = await nlp.process('en', data.message);

        console.log(response, 'response');
        socket.emit('receive_message', response.answer !== undefined ? {
            message: response.answer,
            name: CHAT_BOT,
            __createdtime__,
        } : {
            message: `I don't understand`,
            name: CHAT_BOT,
            __createdtime__,
        })
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