const fs = require('fs').promises; // Módulo fs con soporte para promesas

class ProductManager {
  constructor() {
    this.products = [];
    this.nextID = 1;
    this.loadProductsFromFile(); // Cargar productos al inicializar la instancia
  }

  async addProduct(product) {
    const existingProduct = this.products.find((p) => p.Code === product.Code);

    if (existingProduct) {
      console.log("El producto ya existe. No se puede agregar.");
    } else {
      product.ID = this.nextID++;
      this.products.push(product);
      await this.saveProductsToFile();
      console.log("Producto agregado con éxito.");
    }
  }

  
  async editProductByID(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.ID === id);

    if (index !== -1) {
      updatedProduct.ID = id;
      this.products[index] = updatedProduct;
      await this.saveProductsToFile();
      console.log("Producto editado con éxito.");
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  async deleteProductByID(id) {
    const index = this.products.findIndex((p) => p.ID === id);

    if (index !== -1) {
      this.products.splice(index, 1);
      await this.saveProductsToFile();
      console.log("Producto eliminado con éxito.");
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  async saveProductsToFile() {
    try {
      await fs.writeFile('products.json', JSON.stringify(this.products, null, 2));
      console.log('Datos guardados en products.json');
    } catch (error) {
      console.error('Error al guardar en el archivo products.json:', error);
    }
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.readFile('products.json', 'utf8');
      this.products = JSON.parse(data);
      console.log('Datos cargados desde products.json');
    } catch (error) {
      console.error('Error al cargar desde el archivo products.json:', error);
    }
  }

  async getProducts() {
    await this.loadProductsFromFile(); // Cargar productos antes de devolverlos
    return this.products;
  }

  async getProductByID(id) {
    const product = this.products.find((p) => p.ID === id);

    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }
}

module.exports = ProductManager;