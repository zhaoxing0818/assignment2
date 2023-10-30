/* 
   File Name: category.model.js
   Student's Name: Zhaoxing Chang
   Student ID: 301297266
   Date: October 29, 2023
*/
const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Category', CategorySchema, 'categories');
