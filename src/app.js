import express from 'express'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import path from "path";
//import compression from "express-compression";

import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import __dirname from './utils.js';
import sessionRouter from './routes/session.router.js';
import viewRouter from './routes/views.router.js';
import initializePassport from './config/passport.config.js';
import { config } from "./config/config.js";
import { transporter } from "./config/gmail.js";
//import { options } from "./config/options.js";
import { twilioPhone } from './config/twilio.js';


const PORT = config.server.port
const app = express();
console.log("config", config)
const MONGO_URL = config.mongo.url ;
mongoose.connect(MONGO_URL);

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO_URL,
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

const emailTemplate = `<div>
<h1>Bienvenido!!</h1>
<img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
<p>Ya puedes empezar a usar nuestros servicios</p>
<img width="100px" src="cid:perrito"/
<a href="https://www.google.com/">Explorar</a>
</div>`;

app.post("/registro", async (req,res)=>{
    try {
        const contenido = await transporter.sendMail({
            from:"Ecommerce tienda La Nueva",
            to:"gabriel.tollan@gmail.com",
            subject:"Registro exitoso",
            html: emailTemplate,
            attachments:[
                {
                    filename:"descarga.jpg",
                    path: path.join(__dirname,"")
                },
                {
                    filename:"factura.pdf",
                    path: path.join(__dirname,"/images/descarga.pdf"),
                    cid:"perrito"
                },
            ]
        })
        console.log("contenido", contenido);
        res.json({status:"sucess", message: "Registo y envio de correo."})
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message: "Hubo un error al registrar al usuario."})
    }   
})

app.post("/compra", async (req,res)=>{
    try{
        const {nombre, producto} = req.query;

        const message = await twilioClient.messages.create({
            body:`Gracias ${nombre}, su producto ${producto} esta en camino.`,
            from: twilioPhone,
            to: "+54 116527 6196"
        })
        console.log("Message:", message);
        res.json({status:"success", message:"compra en camino"})
    } catch (error) {
        console.log(error.message);
        res.json
    }
})

app.use('/', viewRouter);
app.use('/api/sessions', sessionRouter)
app.use('/api/cart', cartsRouter);
app.use('/api/products', productsRouter);
