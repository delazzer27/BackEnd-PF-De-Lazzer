const express = require(`express`)
const app = express();
const ProductManager = require('../productManager')
const manager = new ProductManager('../product.json')
app.use(express.urlencoded({extended:true}))


app.get("/products", async (req, res) => {
    let {limit} = req.query;
    let products = await manager.getProducts(); 
    if (limit) {
        res.send(products.slice(0, limit))
    } else {
        res.send(products)
    }
})

app.get("/products/:id", async (req, res) => {
    let id = req.params.id;
    let productId = await manager.getProductById(id)
    if (!productId) {
      res.send("404 - ID not found");
    } else {
      res.send(productId);
    }
})


const server = app.listen (8080, ()=> console.log(`Server running on port 8080`))
server.on("error", error => console.log(error))