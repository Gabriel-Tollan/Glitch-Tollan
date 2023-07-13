import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Server } from 'socket.io';



import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import sessionRouter from './routes/sessions.routes.js'
import viewRouter from './routes/views.routes.js';
import { config } from './config/config.js';
import { messageDao } from './dao/handler.js';
import { usersRouter } from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const PORT = config.server.port;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
initializePassport();


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/', viewRouter);
app.use("/api/users", usersRouter);
app.use(errorHandler);

const server = app.listen(PORT, () => {console.log(`El servidor está corriendo en el puerto ${PORT}`)});

const io = new Server(server);

io.on('connection', (socket) => {

    console.log(`Socket Connected`);

    socket.on('newMessage', async (entry) => {

        await messageDao.saveMessage(entry.username, entry.message);
        
        const messageHistory = await messageDao.getMessages();

        io.emit('messageLog', messageHistory.message);

    });

    socket.on('authenticated', (data) => {

        socket.broadcast.emit('newUserConnected', data);

    });
    
});
