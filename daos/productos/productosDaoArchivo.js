import contenedorArchivo from '../../contenedores/contenedorArchivo.js'

class ProductoDaoArchivo extends contenedorArchivo{
    constructor(){
        super('productos.json')
    }
}

export default ProductoDaoArchivo; 