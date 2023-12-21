const express = require('express');
const ProductManager = require('./src/managers/ProductManager.js');
const productsRouter = require('./src/routes/products.router.js')
const cartRouter = require('./src/routes/cart.router.js');
const handlebars = require('express-handlebars')
const viewsRouter = require('./src/routes/views.router.js')
const userRouter = require('./src/routes/users.routers.js')
const { Server } = require('socket.io');
const { connectDb } = require('./src/config/index.js');
const bodyParser = require('body-parser');

const app = express();
const puerto = 8080;
app.use(express.json());
connectDb()
app.use(express.urlencoded({extended: true}))

app.use(bodyParser.json());

const manager = new ProductManager();

//cfg handlebars
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/src/views')

// Rutas API
app.use(express.static('public'));
app.use('/api/views', viewsRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
  app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})

const serverHttp = app.listen(puerto, () => console.log(`Servidor escuchando en el ${puerto}`));

const io = new Server(serverHttp)

let messagesArray = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('message', data => {
        messagesArray.push(data)
        io.emit('messageLogs', messagesArray)
    })
})