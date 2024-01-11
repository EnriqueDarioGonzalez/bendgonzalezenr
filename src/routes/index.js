const app = require('./server');
const productsRouter = require('./src/routes/products.router.js');
const cartRouter = require('./src/routes/cart.router.js');
const viewsRouter = require('./src/routes/views.router.js');
const usersRouter = require('./users.router.js');

// Rutas API
app.use('/api/views', viewsRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/users', usersRouter);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error de servidor');
});

// Exportar app para pruebas o integración con otras aplicaciones
module.exports = app;