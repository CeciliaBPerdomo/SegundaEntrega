import ContenedorMongo from "../../contenedores/contenedorMongoDB.js";
import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    id: { type: Number, required: true },
	timestamp: { type: Number},
	productos: { type: Array },
})

const model = mongoose.model('carrito', carritoSchema)
class carritosDaoMongoDB extends ContenedorMongo {
    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }

    /*Guardar en el carrito*/
    async guardar(carrito = { productos: []}) {
        return super.guardar(carrito)
    }

    /* Muestra el carrito completo */
    async listaTodo() {
        return await super.listaTodo()
    }

    /* Muestra el carrito por el id */ 
    async listar(id){
        return await super.listar(id)
    }

    /* Guardar un producto */ 
    async guardarProd(id, producto){
        return await super.guardarProd(id, producto)
    }

    /* Borra el carrito por id */
    async borrar(id){
        return await super.borrar(id)
    }

    /* Borra todos los carritos */
    async borrarTodos(){
        return await super.borrarTodos()
    }

}

export default carritosDaoMongoDB