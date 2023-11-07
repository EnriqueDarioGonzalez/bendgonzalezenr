class ProductManager {
    constructor() {
      this.products = [];
      this.nextID = 1;
    }
  
    addProduct(product) {
      const existingProduct = this.products.find((p) => p.Code === product.Code);
      if (existingProduct) {
        console.log("El producto ya existe. No se puede agregar.");
      } else {
        product.ID = this.nextID++;
        this.products.push(product);
        console.log("Producto agregado con éxito.");
      }
    }

    // Obtener todos los productos del array
    getProducts() {
      return this.products;
    }

    // Obtener un producto por su ID
    getProductByID(id) {
      const product = this.products.find((p) => p.ID === id);

      if (product) {
        return product;
      } else {
        console.log("Error: Producto no encontrado.");
      }
    }
  }
  
  module.exports = ProductManager;
  