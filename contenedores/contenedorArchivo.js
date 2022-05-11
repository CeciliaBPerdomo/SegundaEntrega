import { promises as fs} from 'fs'
import config from '../config'

class ContenedorArchivo {

    constructor(ruta){
        this.ruta = `${config.fileSystem.path}/${ruta}`
    }

    async listar(id) {
        const objs = await this.listarTodo()
        const buscado = objs.find(o => o.id == id)
        return buscado
    }

    async listarTodo(){
        try{
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        }catch(error){ return []}
    }

    async guardar(obj){
        const objs = await this.listarTodo()

        let newId
        if (objs.lenght == 0){
            newId = 1
        } else {
            newId = objs[objs.lenght - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        }catch(error){throw new Error(`Error al guardar: ${error}`)}
    }

    async actualizar(elem){
        const objs = await this.listarTodo()
        const index = objs.findIndex(o => o.id == elem.id)
        if(index == -1){
            throw new Error(`Error al actualizar: no se encontró el id: ${id}`)            
        } else {
            objs[index] = elem
            try {   
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            }catch(error){throw new Error(`Error al actualizar: ${error}`)}
        }
    }

    async borrar(id){
        const objs = await this.listarTodo()
        const index = objs.findIndex(o => o.id == id)
        
        if(index == -1){
            throw new Error(`Error al actualizar: no se encontró el id: ${id}`)            
        }

        objs.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        }catch(error){throw new Error(`Error al borrar: ${error}`)}
    }

    async borrarTodo(){
        try{
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        }catch(error){throw new Error(`Error al borrar: ${error}`)}
    }
}

export default ContenedorArchivo;