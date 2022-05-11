import ContenedorArchivo from "../../contenedores/contenedorArchivo";

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('carritos.json')
    }
    async guardar(carrito = {}){
        return super.guardar(carrito)
    }
}

export default CarritosDaoArchivo

