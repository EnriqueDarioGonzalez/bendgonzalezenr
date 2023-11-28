const { Router } = require('express')
const ProductManager = require('../ProductManager')

const router = Router()
const productsService = new ProductManager()

router

//GET PRODUCTS ALL
    .get('/', async (req,res)=>{
        const products = await productsService.getProducts()
    res.send({
        status: 'success',
        payload: products
    })
    })

    //GET POR ID
    .get('/:pid', async (req,res)=>{
        const {pid} = req.params
        const product = await productsService.getProductByID(parseInt(pid))
        if (!product) {
            return res.status(400).send({
                status: 'error',
                message: "Product Not Found"
            })
        }
    res.send({
        status: 'success',
        payload: product
    })
    })
    // POST
    .post('/', async (req, res) => {
        try {
            const product = req.body;
            const savedProduct = await productsService.addProduct(product);
            res.status(201).send({
                status: 'success',
                message: 'Product created successfully',
                payload: savedProduct
            });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).send({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    })
// PUT por ID
.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = req.body;
        const result = await productsService.editProductByID(parseInt(pid), updatedProduct);

        if (result) {
            res.send({
                status: 'success',
                message: 'Product updated successfully',
                payload: result
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Product not found'
            });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
})
// DELETE por ID
.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await productsService.deleteProductByID(parseInt(pid));
        if (result) {
            res.send({
                status: 'success',
                message: 'Product deleted successfully'
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Product not found'
            });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
})

module.exports = router