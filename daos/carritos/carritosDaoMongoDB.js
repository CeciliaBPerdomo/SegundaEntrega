import ContenedorMongo from "../../contenedores/contenedorMongoDB.js";
//const model = mongoose.model('carrito', schema)
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
    async listarTodo() {
        return await super.listarTodo()
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