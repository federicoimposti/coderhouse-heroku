const fs = require('fs');
const logger = require('../logs/logger');
const Item = require('../models/Products.js');

require('../db/connection.js'); 

// const fakerProducts = require('../utils/faker');
const error = { error: 'Producto no encontrado' };

module.exports = class Controller {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
    }

    static async save(product) {
        try {
            const newProduct = new Item(product); 
            const data = await newProduct.save();
            return data; 
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el producto.', err);
        }
    }

    static getById(id) {
        try {
            if (!products) {
                return error;
            }

            const product = products.find(product => product.id === id);
            return product ? product : error;
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocrrió un error obteniendo el producto.', err);
        }
    }

    static async getAll() {
        try {
            const productos = await Item.find();
            return productos;
        } catch(err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error obteniendo los productos.', err);
        }
    }

    // static getAllFaker() {
    //     return fakerProducts.fakerList();
    // }

    static deleteById(id) {
        try {
            if (!products) {
                return error;
            }

            const product = this.getById(id);
        
            if(product?.id){
                const productsFiltered = products.filter(product => product.id !== id);
                products = productsFiltered;
                return productsFiltered;
            } else {
                return error;
            }
            
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error eliminando el producto.', err);
        }
        
    }

    static async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2));
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error ('Ocurrió un error eliminando los productos.', err);
        }
        
    }

    static update(id, newData) {
        try {
            const { title, price, thumbnail } = newData;
            const productId = id;

            const product = this.getById(productId);
        
            if(product?.id){
                products.forEach(product => {
                    const id = product.id;
                    if(productId === id){
                        product.title = title;
                        product.price = price;
                        product.thumbnail = thumbnail;
                    }
                });

                return product;
            } else {
                return error;
            }
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error ('Ocurrió un error actualizando el producto.', err);
        }
      };
}
