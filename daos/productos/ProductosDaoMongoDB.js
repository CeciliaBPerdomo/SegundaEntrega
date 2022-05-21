//import ContenedorMongoDB from '../../contenedores/contenedorMongoDB.js'
import mongoDB from '../../DB/dbMongo.js'
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 100 }, 
    descripcion: { type: String, required: true, max: 100 },
    codigo: { type: String, required: true, max: 100 },
    foto: { type: String },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    timestamp: { type: String }
})

const model = mongoose.model('productos', schema)
export default class Productos extends mongoDB {
    constructor(connection) {
        super(connection)
    }


    listarTodo = async () => {await model.find({})}

    listar = async (id) => {
        const result = await model.find({ ':id': id}, {__v: 0})
        return result[0]
    }

    guardar = async (newProd) => {
        console.log(newProd)
        const nuevoProd = new model(newProd)
        await nuevoProd.save()
    }

    borrar = async ({ id }) => {
        await model.deleteOne( { _id: id})
    }

    actualizar = async (producto) => {
        const { id, nombre, descripcion, codigo, foto, precio, stock } = producto
        await model.updateOne({ _id: id }, {
            $set: {
                nombre: nombre,
                descripcion: descripcion,
                codigo: codigo,
                foto: foto,
                precio: precio,
                stock: stock
            }
        }) 
    }
}