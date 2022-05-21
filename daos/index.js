import 'dotenv/config'
import config from '../config.js'
import ProductosDaoMongoDB from './productos/ProductosDaoMongoDB.js'
import carritoDaoMongoDB from './carritos/carritosDaoMongoDB.js'
import mongoose from 'mongoose'


let productosDAO
let carritosDAO

console.log(process.env.PERSISTENCIA)
const db = async() => {
    await mongoose.connect(config.mongoDB.url, config.mongoDB.options)
}

switch (process.env.PERSISTENCIA){
    case 'json': 
        const { default: ProductosDaoArchivo } = await import('./productos/productosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/carritosDaoArchivo.js')

        productosDAO = new ProductosDaoArchivo()
        carritosDAO = new CarritosDaoArchivo()
        break
    case 'mongodb': 
        productosDAO = new ProductosDaoMongoDB(db)
        carritosDAO = new carritoDaoMongoDB()
        break
    default:
        const { default: ProductosDaoMem } = await import('./productos/productosDaoMem.js')
        const { default: CarritosDaoMem } = await import('./carritos/carritosDaoMemoria.js')

        productosDAO = new ProductosDaoMem()
        carritosDAO = new CarritosDaoMem()
        break
}    

export { productosDAO, carritosDAO}