const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = model('Message', messageSchema);

module.exports = MessageModel;