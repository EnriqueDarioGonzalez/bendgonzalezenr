const express = require('express');
const router = express.Router();
const ProductDaoMongo = require('../daos/Mongo/productsDaoMongo');
const productModel = require('../daos/Mongo/models/products.model');
const productDaoMongo = new ProductDaoMongo(productModel);

router.get('/products', async (req, res) => {
    const userMock = {
        title: 'Carrito',
        name: 'Enrique',
        role: 'admin'
    };

    try {
        const products = await productDaoMongo.getAllProducts();

        res.render('products', {
            title: userMock.title,
            name: userMock.name,
            isAdmin: userMock.role === 'admin',
            products: products,
            style: 'products.css'
        });
    } catch (error) {
        console.error('Error rendering products view:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/chat', (req, res) => {
    const userMock = {
      title: 'Chat App',
      name: 'Usuario',
      role: 'user',
    };
  
    res.render('chat', {
      title: userMock.title,
      name: userMock.name,
      isAdmin: userMock.role === 'admin',
      style: 'chat.css',
    });
  });
  
  router.get('/chat', async (req, res) => {
    const userMock = {
      title: 'Chat App',
      name: 'Usuario',
      role: 'user',
    };
  
    try {
      const messages = await messageDaoMongo.getAllMessages();
  
      res.render('chat', {
        title: userMock.title,
        name: userMock.name,
        isAdmin: userMock.role === 'admin',
        messages: messages,
        style: 'chat.css',
      });
    } catch (error) {
      console.error('Error rendering chat view:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.post('/chat', async (req, res) => {
    const { user, message } = req.body;
  
    try {
      const savedMessage = await messageDaoMongo.saveMessage(user, message);
      res.status(201).json({
        status: 'success',
        message: 'Message saved successfully',
        payload: savedMessage,
      });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  });
  

module.exports = router;