const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

var app = new express();

app.set('view engine', 'ejs');
app.set("views", "views")

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var schema = mongoose.Schema;

var productSchema = new schema({
  productID: Number,
  productName: String,
  categoryId: Number
});

var product = mongoose.model('product', productSchema);

app.get("/", (req, res) => {
  res.render("home");
});

var options = {
url: "http://api.tcgplayer.com/catalog/products?offset=100&limit=200",
headers: {
'Authorization': 'bearer LsiJ5fgX9s8liUVS6XV9Twp0CaAEZYJowUvtoIADB-p1CHoVXWy-zjGXKALMTCEPcp1IdIMJo3JHZeEfW_qYYHfP98g9B4Ao8jS3BojIGRBMqUmqJzByaEC4fHy3kGfwWMqIPhJ_WY4ErmqW4eaBa6Lrz45utHr_r4gDc9D8pEQHMJf8Fxz0-B15X5_mUmiBnDNajVK3YX4ZBZC4VGdqgAPFyFOfVE50cmxuOz9ACXN5eRTFOqvpJEnpCfnL12R5i2thMh6XDnhhfJrQp6xFio7Pyv8RqtOGay23QfyA7ElsbKWQqk2SACBnAiNMTYRZIHOltw'
},
qs:
 { categoryId: '2' }
}


app.get("/products", (req, res) => {
  request(options, (error, response, body) => {

    var Body = (JSON.parse(body)).results;

    Body.forEach(results => {
      console.log(results.productName)
    })

    // console.log(body)
    // res.send(body)
    // res.render("products", {test: Body})
    // res.render("products", {test: Body})
    // var Products = new product({
    //   productID: body
    // })
  })
});

app.listen(3000, () => {
  console.log("The server has started!");
})
