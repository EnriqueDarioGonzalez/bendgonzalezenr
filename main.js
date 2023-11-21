// const ProductManager = require('./ProductManager');

// async function main() {
//   const manager = new ProductManager();

//   // Agregar productos
//   await manager.addProduct({ Name: 'Producto 1', Price: 10.99, Thumbnail: 'thumbnail1.jpg', Code: 'P1', Stock: 100 });
//   await manager.addProduct({ Name: 'Producto 2', Price: 19.99, Thumbnail: 'thumbnail2.jpg', Code: 'P2', Stock: 50 });
//   await manager.addProduct({ Name: 'Producto 3', Price: 19.99, Thumbnail: 'thumbnail2.jpg', Code: 'P3', Stock: 50 });
//   // Obtener todos los productos
//   const productsBeforeEdit = await manager.getProducts();
//   console.log('Todos los productos antes de la edición:');
//   console.log(productsBeforeEdit);

//   // Editar un producto por su ID
//   await manager.editProductByID(1, { Name: 'Producto 1 Editado', Price: 15.99, Thumbnail: 'thumbnail1_editado.jpg', Code: 'P1', Stock: 120 });

//   // Obtener todos los productos después de la edición
//   const productsAfterEdit = await manager.getProducts();
//   console.log('Todos los productos después de la edición:');
//   console.log(productsAfterEdit);

//   // Eliminar un producto por su ID
//   await manager.deleteProductByID(2);

//   // Obtener todos los productos después de la eliminación
//   const productsAfterDelete = await manager.getProducts();
//   console.log('Todos los productos después de la eliminación:');
//   console.log(productsAfterDelete);
// }

// export default main();