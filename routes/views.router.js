const { Router } = require('express')

const router = Router()


router.get('/api/prod', (req, res) => {
    
    const userMock = {
        title: 'Mercadito Fede',
        name: 'Fede el mejor',
        role:  'admin'
    }

    res.render('products', {
        title: userMock.title,
        name: userMock.name,
        isAdmin: userMock.role === 'admin',
        products: productMock,
        style: 'products.css'
    })
})

module.exports = router
