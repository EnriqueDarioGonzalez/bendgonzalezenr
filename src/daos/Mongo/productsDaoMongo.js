const { productModel } = require('./models/products.model');

class ProductDaoMongo {
  constructor() {
    this.Product = productModel;
  }

  async createProduct(productData) {
    try {
      const newProduct = new this.Product(productData);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      throw new Error(`Error creando el producto: ${error.message}`);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.Product.find();
      return products;
    } catch (error) {
      throw new Error(`Error obteniendo los productos: ${error.message}`);
    }
  }

  async getProductById(productId) {
    try {
      const product = await this.Product.findById(productId);
      return product;
    } catch (error) {
      throw new Error(`Error obteniendo el producto por ID: ${error.message}`);
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const updatedProduct = await this.Product.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error actualizando el producto: ${error.message}`);
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await this.Product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error borrando el producto: ${error.message}`);
    }
  }
}

module.exports = ProductDaoMongo;