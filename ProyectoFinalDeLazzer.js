class ProductManager {
    products;
    constructor (){
        this.products = [];
    } 
    getNewId(){
        return this.products.length + 1;
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.some(element => element.code === code)){
            /*Con el some podemos ver si alguno de los elementos del array
            tiene el mismo codigo que otro ya existente*/
            console.log(`El producto ya existe`);
        } else {
            let newProduct = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: this.getNewId()
            }
            this.products.push(newProduct) /*agregado de nuevo producto*/
        }
    }
    getProducts(){
        console.log(this.products);  
        /*Recordar poner console.log o relativos para que se muestre en consola*/
    }
    getProductById (id){
        let productId = this.products.find (element => element.id === id)
        if (productId) {
            console.log(productId); 
        } else {
            console.error(`Not found`);
        }
    }
}

const productos = new ProductManager(); 
productos.addProduct("hamburguesa", "hamburguesa de lentejas", 2000, "image", 12, 12);
productos.addProduct("ensalada", "ensalada Ceasar", 1800, "image", 13, 10);
productos.addProduct("pizza", "Pizza grande 8 porciones", 2300, "image", 14, 23);
productos.addProduct("papas fritas", "papas fritas caseras", 1000, "image", 15, 9);
productos.addProduct("papas fritas", "papas fritas paquete", 3000, "image", 15, 16);
productos.getProducts()
productos.getProductById(3);
