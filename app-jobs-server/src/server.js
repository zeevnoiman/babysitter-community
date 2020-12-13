const express = require('express');
const routes = require('./routes');
const mongo = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const server =  require('http').Server(app);
const io = require('socket.io')(server);

//DB config
const db = require("./config/keys").mongoURI;

mongo.connect(db,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});
app.use((req, res, next) => {
    req.io = io;

    return next();
})

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname , '..', 'uploads')));
app.use(routes);

const PORT = 3333; 
server.listen(PORT);
console.log(`server listening on port ${PORT}`);
