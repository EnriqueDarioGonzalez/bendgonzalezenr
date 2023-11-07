const ProductManager = require('./ProductManager');

const manager = new ProductManager();


manager.addProduct({ Name: 'Producto 1', Price: 10.99, Thumbnail: 'thumbnail1.jpg', Code: 'P1', Stock: 100 });
manager.addProduct({ Name: 'Producto 2', Price: 19.99, Thumbnail: 'thumbnail2.jpg', Code: 'P2', Stock: 50 });

const products = manager.getProducts();
console.log('Todos los productos:');
console.log(products);


const product = manager.getProductByID(2);
if (product) {
  console.log('Producto encontrado por ID:');
  console.log(product);
}


manager.getProductByID(3);