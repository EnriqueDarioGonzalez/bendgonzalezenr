const MessageModel = require('../Mongo/models/messages.model.js');  // Asegúrate de la ruta correcta

class MessageDaoMongo {
  constructor() {}

  async saveMessage(user, message) {
    try {
      const newMessage = new MessageModel({
        user,
        message,
      });
      const savedMessage = await newMessage.save();
      return savedMessage;
    } catch (error) {
      console.error('Error saving message to MongoDB:', error);
      throw error;
    }
  }

  async getAllMessages() {
    try {
      const messages = await MessageModel.find({}).sort({ timestamp: 1 });
      return messages;
    } catch (error) {
      console.error('Error getting messages from MongoDB:', error);
      throw error;
    }
  }
}

module.exports = MessageDaoMongo;