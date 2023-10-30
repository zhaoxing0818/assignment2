/* 
   File Name: product.model.js
   Student's Name: Zhaoxing Chang
   Student ID: 301297266
   Date: October 29, 2023
*/
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model('Product', ProductSchema, 'product');
