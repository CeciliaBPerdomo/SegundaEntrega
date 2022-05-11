import ContenedorMongoDB from '../../contenedores/contenedorMongoDB'

class ProductosDAOMongoDb extends ContenedorMongoDB {
    constructor(){
        super('productos', {
            
        })
    }
}

export default ProductosDAOMongoDb