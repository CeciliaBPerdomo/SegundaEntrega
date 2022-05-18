import ContenedorMemoria from "../../contenedores/contenedorMemoria.js";

class CarritosDaoMem extends ContenedorMemoria{
    async guardar(carrito = {productos: []}) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoMem