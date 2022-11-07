const logger = require("../logs/logger");
const Message = require('../models/Messages.js');

require('../db/connection.js'); 

module.exports = class Messages {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
    }

    async save(obj) {
        try {
            await this.knex(this.table)
                    .insert(obj)
                    .then(() => {
                        console.log("Message inserted");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
        } catch (err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    async getAll() {
        try {
            const messages = await Message.find();
            return messages;
        } catch(err) {
            logger.error(`Error: ${err}`);
            throw new Error('Ocurrió un error obteniendo los Mensajes.', err);
        }
    }
}
