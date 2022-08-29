import 'dotenv/config'
import config from '../config.js'
import ProductosDaoMongoDB from './productos/ProductosDaoMongoDB.js'
import carritoDaoMongoDB from './carritos/carritosDaoMongoDB.js'
import mongoose from 'mongoose'

let obj = {}

console.log(process.env.PERSISTENCIA)

const db = async() => {
    return await mongoose.connect(config.mongoDB.url, config.mongoDB.options)
}

switch (process.env.PERSISTENCIA){
    case 'json': 
        const { default: ProductosDaoArchivo } = await import('./productos/productosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/carritosDaoArchivo.js')

        productosDAO = new ProductosDaoArchivo()
        carritosDAO = new CarritosDaoArchivo()
        break
    case 'mongodb': 
        let productosDAO = new ProductosDaoMongoDB(db)
        let carritosDAO = new carritoDaoMongoDB(db)

        obj.productosDAO = productosDAO
        obj.carritosDAO = carritosDAO
        break
    default:
        const { default: ProductosDaoMem } = await import('./productos/productosDaoMem.js')
        const { default: CarritosDaoMem } = await import('./carritos/carritosDaoMemoria.js')

        productosDAO = new ProductosDaoMem()
        carritosDAO = new CarritosDaoMem()
        break
}    

export { obj }