import ContenedorArchivo from "../../contenedores/contenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('carritos.json')
    }
    async guardar(carrito = {}){
        return super.guardar(carrito)
    }
}

export default CarritosDaoArchivo

