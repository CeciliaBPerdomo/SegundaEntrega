import contenedorArchivo from '../../contenedores/contenedorArchivo'

class ProductoDaoArchivo extends contenedorArchivo{
    constructor(){
        super('productos.json')
    }
}

export default ProductoDaoArchivo; 