const { Router } = require('express');
const ProductDaoMongo = require('../daos/Mongo/productsDaoMongo');

const router = Router();
const productDao = new ProductDaoMongo();

router
  // GET PRODUCTS ALL
  .get('/', async (req, res) => {
    try {
      const products = await productDao.getAllProducts();
      res.send({
        status: 'success',
        payload: products,
      });
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).send({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  })

  // GET POR ID
  .get('/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productDao.getProductById(pid);
      if (!product) {
        return res.status(400).send({
          status: 'error',
          message: 'Product Not Found',
        });
      }
      res.send({
        status: 'success',
        payload: product,
      });
    } catch (error) {
      console.error('Error getting product by ID:', error);
      res.status(500).send({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  })

  // POST
  .post('/', async (req, res) => {
    try {
      const product = req.body;
      const savedProduct = await productDao.createProduct(product);
      res.status(201).send({
        status: 'success',
        message: 'Product created successfully',
        payload: savedProduct,
      });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).send({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  })

  // PUT por ID
  .put('/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const updatedProduct = req.body;
      const result = await productDao.updateProduct(pid, updatedProduct);

      if (result) {
        res.send({
          status: 'success',
          message: 'Product updated successfully',
          payload: result,
        });
      } else {
        res.status(404).send({
          status: 'error',
          message: 'Product not found',
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  })

  // DELETE por ID
  .delete('/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const result = await productDao.deleteProduct(pid);
      if (result) {
        res.send({
          status: 'success',
          message: 'Product deleted successfully',
        });
      } else {
        res.status(404).send({
          status: 'error',
          message: 'Product not found',
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  });

module.exports = router;