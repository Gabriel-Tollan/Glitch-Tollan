import express from 'express'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import __dirname from './utils.js';
import chatRouter from './routes/chat.router.js';
import sessionRouter from './routes/session.router.js';
import viewRouter from './routes/views.router.js';
import initializePassport from './config/passport.config.js';
import UserRouter from './routes/users.router.js';

const PORT = process.env.PORT || 8080;
const app = express();
const DB = 'ecommerce';//nombre de mi base de datos en mongo
const MONGO = 'mongodb+srv://gabrieltollan:<Gabriel1987>@cluster0.m6bxmyo.mongodb.net/?retryWrites=true&w=majority'+ DB

mongoose.connect(MONGO);

const userRouter = new UserRouter

//const messageManager = new MessageManager();
app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:4000
    }),
    secret: "coderSecret",
    resave:false,
    saveUninitialized:false,
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res)=>{
    req.session.user = 'Active Session';
    res.send('Session Set');
});
app.get('/test', (req,res)=>{
    res.send(req.session.user);
})

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());
app.use(session({
    secret:'SecretCode',
    resave:true,
    saveUninitialized:true
}));

let contador = 1;

app.get('/',(req,res)=>{
    const nombre = req.query.nombre;

    if(!req.session.user){
        req.session.user = { nombre };
        return res.send(`Bienvenido, ${req.session.user.nombre}`);
    }
    else{
        return res.send(`Hola, ${req.session.user.nombre}. Has visitado esta ruta ${++contador} veces`)
    }
})

const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT);
})

mongoose.connection.close();


const io = new Server(server);
const messages = [];

io.on('connection', Socket =>{
    console.log('Socket connected')

    Socket.on('message', data =>{
        messages.push(data);
        io.emit('messageLogs', messages)
    })
    Socket.on('authenticated', data =>{
        Socket.broadcast.emit('newUserConnected', data)
    })
})

app.get('/',(req,res)=>{
    res.render('cookies');
})

app.post('/cookie',(req,res)=>{
    const data = req.body;
    res.cookie('CoderCookie',data,{maxAge:10000}).send({status:"success", message:"cookie set"})
})

app.get('/', (req,res)=>{
    const randon = Math.floor(Math.random()*users.length);
    console.log(users[randon]);

    res.render('index',{user: users[randon]});
})

app.get('/current', passport.authenticate('jwt', {session:false}), (req,res)=>{
    res.send(req.user);
})

app.use('/', viewRouter);
app.use('/api/sessions', sessionRouter)
app.use('/api/cart', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/chat', chatRouter);