/* 
   File Name: server.js
   Student's Name: Zhaoxing Chang
   Student ID: 301297266
   Date: October 29, 2023
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://zhaoxing0818:czx25964841@cluster0.0tbesdx.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("DB connected......")
})

const Product = require('./model/product.model');

const Category = require('./model/category.model');


app.get('/', (req, res) => {
  res.send('{“message”: "welcome to DressStore application."}');
});

// Handler to get all products
function getAllProducts(req, res) {
  Product.find()
      .then(products => res.status(200).json(products))
      .catch(err => res.status(400).json({ "error": err }));
}

// Handler to search products by name
function searchProductsByName(req, res) {
  const keyword = new RegExp(req.query.name, 'i'); // 'i' makes it case insensitive
  Product.find({ name: keyword })
      .then(products => res.status(200).json(products))
      .catch(err => res.status(400).json({ "error": err }));
}


// Product router
app.route('/api/products')
    .get((req, res) => {
        Product.find()
            .then(products => res.status(200).json(products))
            .catch(err => res.status(400).json({ "error": err }));
    })
    .post((req, res) => {
        let product = new Product(req.body);
        product.save()
            .then(product => res.status(200).json(product))
            .catch(err => res.status(400).json({ "error": err }));
    })
    .delete((req, res) => {
      Product.deleteMany({})
          .then(() => res.status(200).json({ "message": "All products deleted successfully!" }))
          .catch(err => res.status(400).json({ "error": err }));
    });

    app.route('/api/products')
    .get((req, res) => {
        if (req.query.name) {
            searchProductsByName(req, res);
        } else {
            getAllProducts(req, res);
        }
    });

app.route('/api/products/:id')
    .get((req, res) => {
        Product.findById(req.params.id)
            .then(product => res.status(200).json(product))
            .catch(err => res.status(400).json({ "error": err }));
    })
    .put((req, res) => {
        Product.findById(req.params.id)
            .then(product => {
                Object.assign(product, req.body);
                product.save()
                    .then(product => res.status(200).json(product))
                    .catch(err => res.status(400).json({ "error": err }));
            })
            .catch(err => res.status(400).json({ "error": err }));
    })
    .delete((req, res) => {
        Product.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({ "message": "Product deleted successfully!" }))
            .catch(err => res.status(400).json({ "error": err }));
    });

// Category router
app.route('/api/categories')
    .get((req, res) => {
        Category.find()
            .then(categories => res.status(200).json(categories))
            .catch(err => res.status(400).json({ "error": err }));
    })
    .post((req, res) => {
        let category = new Category(req.body);
        category.save()
            .then(category => res.status(200).json(category))
            .catch(err => res.status(400).json({ "error": err }));
    });



app.listen(8081,()=>{
    console.log("Server is running on 8081....");
});