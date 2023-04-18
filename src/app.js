import express from 'express'
import handlebars from 'express-handlebars';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import {Server, Socket} from 'socket.io';

const PORT = process.env.PORT || 8080;
const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

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


const users = [

    {
        name: "Mauricio",
        last_name:"Espinosa",
        age:26,
        phone:"5541231355",
        email: "correomau@correo.com"

    },

    {

        name:"Marisol",
        last_name:"Cadena",
        age:23,
        phone:"15431231355",
        email:"correomary@correo.com"
    },

    {
        name:"Jorge",
        last_name:"Velez",
        age:28,
        phone:"4331234155",
        email:"correojorge@correo.com"
    },

    {
        name:"Uriel",
        last_name:"Dueñas",
        age:18,
        phone:"1233315451",
        email:"correouriel@correo.com"
    },

    {
        name:"Verónica",
        last_name:"Duarte",
        age:45,
        phone:"66521233",
        email:"correoVero@correo.com"
    }
];

app.get('/', (req,res)=>{
    const randon = Math.floor(Math.random()*users.length);
    console.log(users[randon]);

    res.render('index',{user: users[randon]});
})

app.use('/api/cart', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);