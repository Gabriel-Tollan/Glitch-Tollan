import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import passport from 'passport';



import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';
import cartRouter from './routes/carts.router.js';
import sessionRouter from './routes/session.router.js'
import viewRouter from './routes/views.router.js';
import { config } from './config/config.js';
import { messageDao } from './dao/handler.js';
import  productRouter  from './routes/products.router.js';
import  { usersRouter }  from "./routes/user.router.js";
import customLogger from './utils/logger.js';
import { loggerPrefix } from './utils/logger.js'
import loggerRouter from './routes/logger.routes.js';

const PORT = config.server.port;

const app = express();

const filename = 'app.js'

customLogger.info(loggerPrefix(filename,`Application running in ${config.environment.mode} mode`));


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
app.use('/loggerTest', loggerRouter);


const server = app.listen(PORT, () => {

    customLogger.info(loggerPrefix(filename,`Servidor escuchando en el puerto ${PORT}`));

});

const io = new Server(server);

io.on('connection', (socket) => {

    customLogger.info(loggerPrefix(filename, `Socket Connected`));

    socket.on('newMessage', async (entry) => {

        await messageDao.saveMessage(entry.username, entry.message);
        
        const messageHistory = await messageDao.getMessages();

        io.emit('messageLog', messageHistory.message);

    });

    socket.on('authenticated', (data) => {

        socket.broadcast.emit('newUserConnected', data);

    });
    
});
