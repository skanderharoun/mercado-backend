const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    photo: String,
    price: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
