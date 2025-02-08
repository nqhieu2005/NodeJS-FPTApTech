const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/nodeapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connection success with MongoDB")).catch(err => console.log("Connection failed", err));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get('/products/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message: "Sản phẩm không tồn tại"});
    res.json(product);
});

app.post('/products', async(req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

app.put('/products/:id', async(req,res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updateProduct);
});

app.delete('/products/:id', async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: "Delete success"});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});