const fs = require('fs');

class ProductManager {
    path
    constructor (path){
        this.path = path;
        this.id = 1
    } 

    async addProduct({title, description, price, thumbnail, code, stock}) {
        try {
            if(!title || !description || !price || !thumbnail || !code || !stock){
                throw new Error ("Faltan completar campos");
            }
            let products = await this.getProducts();
            let validarCode = products.some(element => element.code == code)
            if (!products == []){
                if (validarCode) {
                    throw new Error ("Ya existe el producto");
                } else { 
                    let newProduct = {
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                        id: this.id
                    }
                    products.push(newProduct) /*agregado de nuevo producto*/
                    await fs.promises.writeFile(this.path, JSON.stringify(products));
                    this.id++
                    return console.log("successfully added");
                }
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    async getProducts(){
        try {
            let products = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(products)
        } catch (error) {
            console.error(error);
        }  
    }
    async getProductById (id){
        try {
            let searchId = await this.getProducts();
            let productId = searchId.find (element => element.id === id)
            if (productId) {
                return productId; 
            } else {
                console.error(`Not found`);
            }
        } catch (error) {
            console.error(error);
        }
       
    }

    async updateProduct (id, { title, description, price, thumbnail, code, stock }) { //se pone entre llaves porque el metodo recibe como parametro un obj! 
        try {
            let products = await this.getProduct();
            let index = products.findIndex(product => product.id === id); //Busca el indice del array
            if (index === -1) {console.log("Not found")} 
            let existingProduct = products.some(product => product.code === code) //Chequea que el codigo exista
            if (existingProduct) {console.log(`El producto con el codigo ${code} ya fue agregado`)};
            let productToUpdate = {id, title, description, price, thumbnail, code, stock}
            products[index] = productToUpdate;
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return console.log("successfully updated");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct (id) {
        try {
            let products = await this.getProducts();
            let productId = products.find (element => element.id === id)
            if (productId){
                products.splice(productId,1)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return console.log("successfully deleted");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

let manager = new ProductManager("product.json")
// manager.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abc126",
//   25
// );

let product1 = {
    title : "Hamburguesa",
    description : "Vegana", 
    price : 2000,
    thumbnail : "image",
    code : 123,
    stock : 200
}
let product2 = {
    title : "Papas fritas",
    description : "al verdeo", 
    price : 850,
    thumbnail : "image2",
    code : 145,
    stock : 36
}

let product3 = {
    title : "Pizza",
    description : "Napolitana", 
    price : 1800,
    thumbnail : "image3",
    code : 36,
    stock : 89
}

// let actualizar = {
//     title : "Rabas",
//     description : "con papas", 
//     price : 950,
//     thumbnail : "image4",
//     code : 36,
//     stock : 89
// }
manager.addProduct(product1)
manager.addProduct(product2)
manager.addProduct(product3)
// console.log(manager.getProducts())
// console.log(manager.getProductById(2))
// manager.updateProduct(2,actualizar)
// manager.deleteProduct(3)

module.exports = ProductManager

