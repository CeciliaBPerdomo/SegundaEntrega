import ContenedorMongo from "../../contenedores/contenedorMongoDB";

class carritosDaoMongoDB extends ContenedorMongo {
    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }
    async guardar(carrito = { productos: []}) {
        return super.guardar(carrito)
    }
}

export default carritosDaoMongoDB