
const config = {
    mongoDB: {
        url: 'mongodb://localhost:27017',
        options: {
            useUnifiedTopology: true
        }
    }, 
    fileSystem: {
        dirProducts: './DB/productos.json',
        dirCarrito: './DB/carritos.json'
    }
}

export default config