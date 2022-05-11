import ContenedorMemoria from "../../contenedores/contenedorMemoria";

class CarritosDaoMem extends ContenedorMemoria{
    async guardar(carrito = {productos: []}) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoMem