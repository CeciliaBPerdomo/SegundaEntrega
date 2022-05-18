import mongoose, { mongo } from "mongoose";
import config from '../config';
import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'

await mongoose.connect(config.mongoDB.url, config.mongoDB.options)

class ContenedorMongo{

    constructor(nombreColeccion, esquema){
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id){
        try{
            return await this.coleccion.find({ ':id': id}, {__v: 0})
        }catch(error){throw new Error(`Error al listar por id: ${error}`)}
    }

    async listarTodo(){
        try{
            let docs = await this.coleccion.find()
            return docs
        }catch(error){throw new Error(`Error al listar: ${error}`)}
    }

    async guardar(nuevoElem){
        try{
            const nuevo = new this.coleccion(nuevoElem)
            const doc = await nuevo.save()
            return doc
        }catch(error){throw new Error(`Error al guardar: ${error}`)}
    }

    async actualizar(id, nuevoElem){
        try{
            const resultado = await this.coleccion.findByIdAndUpdate({ _id: id }, nuevoElem)
            return resultado
        }catch(error){throw new Error(`Error al actualizar: ${error}`)}
    }

    async borrar(id){
        try{
            const resultado = await this.coleccion.findByIdAndDelete({ _id: id })
            return result
        }catch(error){throw new Error(`Error al borrar: ${error}`)}
    }

    async borrarTodos(){
        try{
            const resultado = await this.coleccion.deleteMany({})
            return resultado
        }catch(error){throw new Error(`Error al borrar: ${error}`)}
    }
}

export default ContenedorMongo