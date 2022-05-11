import ContenedorMongoDB from '../../contenedores/contenedorMongoDB'

class ProductosDAOMongoDb extends ContenedorMongoDB {
    constructor(){
        super('productos', {
            nombre: { type: String, required: true, max: 100 }, 
            descripcion: { type: String, required: true, max: 100 },
            codigo: { type: String, required: true, max: 100 },
            foto: { type: String },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
            timestamp: { type: String }
        })
    }
}

export default ProductosDAOMongoDb