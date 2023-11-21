
const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const puerto = 8080;

const manager = new ProductManager();

app.use(express.json());

app.get('/products', async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

app.get('/productslimit', async (req, res) => {
    let limit = parseInt(req.query.limit, 3);
    if (isNaN(limit) || limit <= 0) {
      limit = undefined;
    }
    const products = await manager.getProducts(limit);
    res.json(products);
  });


app.get('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = await manager.getProductByID(productId);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });

app.listen(puerto, () => console.log(`Servidor escuchando en el ${puerto}`));