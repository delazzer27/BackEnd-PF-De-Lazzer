const fs = require('fs');

class ProductManager {
    path
    constructor (path){
        this.path = path;
        this.id = 1
    } 

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            // if(!title || !description || !price || !thumbnail || !code || !stock){
            //     console.log("Faltan completar campos");
            //     return;
            // }
            let products = await this.getProducts();
            let validarCode = products.some(element => element.code == code)
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
                return newProduct;
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
        let searchId = await this.getProducts();
        let productId = await searchId.find (element => element.id === id)
        if (productId) {
            return productId; 
        } else {
            console.error(`Not found`);
        }
    }

    async updateProduct (id) {
        try {
            let products = await this.getProduct()
            let index = products.findIndex(product => product.id === id) //Busca el indice del array
            if (index === -1) {console.log("Not found")} 
            let existingProduct = products.some(product => product.code === code) //Chequea que el codigo exista
            if (existingProduct) {console.log(`El producto con el codigo ${code} ya fue agregado`)};
            let productToUpdate = {title, description, price, thumbnail, code, stock}
            products[index] = productToUpdate;
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return productToUpdate
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct (id) {
        try {
            let products = await this.getProducts();
            let productId = await products.find (element => element.id === id)
            if (productId){
                let newArray = products.splice(productId,1)
                await fs.promises.writeFile(this.path, JSON.stringify(newArray))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const manager = new ProductManager("product.json")

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
    descripction : "al verdeo", 
    price : 850,
    thumbnail : "image2",
    code : 145,
    stock : 36
}

let product3 = {
    title : "Pizza",
    descripction : "Napolitana", 
    price : 1800,
    thumbnail : "image3",
    code : 36,
    stock : 89
}

let actualizar = {
    title : "Rabas",
    descripction : "con papas", 
    price : 950,
    thumbnail : "image4",
    code : 36,
    stock : 89
}
// manager.addProduct(product1)
manager.addProduct(product2)
// manager.addProduct(product3)
// console.log(manager.getProducts())
// console.log(manager.getProductById(2))
// manager.updateProduct(2,actualizar)
// manager.deleteProduct(3)



