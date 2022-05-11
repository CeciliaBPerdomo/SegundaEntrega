import 'dotenv/config'

let productosDAO
let carritosDAO

console.log(process.env.PERSISTENCIA)

switch (process.env.PERSISTENCIA){
    case 'json': 
        const { default: ProductosDaoArchivo } = await import('./productos/productosDaoArchivo')
        const { default: CarritosDaoArchivo } = await import('./carritos/carritosDaoArchivo')

        productosDAO = new ProductosDaoArchivo()
        carritosDAO = new CarritosDaoArchivo()
        break
    case 'mongodb': 
        const { default: ProductosDaoMongoDB } = await import('./productos/ProductosDaoMongoDB')
        const { default: CarritosDaoMongoDB } = await import('./carritos/carritosDaoMongoDB')

        productosDAO = new ProductosDaoMongoDB()
        carritosDAO = new CarritosDaoMongoDB()
        break
    default:
        const { default: ProductosDaoMem } = await import('./productos/productosDaoMem')
        const { default: CarritosDaoMem } = await import('./carritos/carritosDaoMemoria')

        productosDAO = new ProductosDaoMem()
        carritosDAO = new CarritosDaoMem()
        break
}    

export { productosDAO, carritosDAO}