const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();
const server =  require('http').Server(app);
const io = require('socket.io')(server);

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
