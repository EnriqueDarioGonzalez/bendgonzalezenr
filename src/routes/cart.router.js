const { Router } = require('express')
const Carts = require ('../managers/cart')
const cartsServices = new Carts()

const router = Router()

// Ruta para obtener un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
    const cid = req.params.cid;
    const cart = await cartsServices.getCartById(parseInt(cid));
    if (!cart) {
        return res.status(400).send({
            status: 'error',
            message: "Cart Not Found"
        })
    }
res.send({
    status: 'success',
    payload: cart
})
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
})

  // Ruta para crear un nuevo carrito
    router.post('/', (req, res) => {
    try {
    const newCartId = cartsServices.createCart();
    res.json({ cartId: newCartId });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
})

  // Ruta para agregar un producto a un carrito
    router.post('/:cid/add', (req, res) => {
    try {
    const cid = req.params;
    const { productId, quantity } = req.body;
    const success = cartsServices.addProductToCart(parseInt(cid), productId, quantity);
    if (success) {
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Unable to add product to cart' });
    }
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
