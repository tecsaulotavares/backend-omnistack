//Acessando o express para a aplicação
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


//Variavel da aplicação, guardando todas as informações da aplicação
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', sockets =>{
    sockets.on('connectRoom', box =>{
        sockets.join(box);
    })
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-wjhbn.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

//Middleware => Recebe uma função modifica e retorna uma resposta
app.use((req, res, next) =>{
    req.io = io;

    return next(); 
})
app.use(express.json());
app.use(express.urlencoded({extended: true})); //Permitir envio de arquivo
app.use('/files', express.static(path.resolve(__dirname,'..','tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);

