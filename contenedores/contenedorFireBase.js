const data = admin.firestore()

class FirebaseDB {
    constructor() {
        this.data = data
        this.query = data.collection('productos')
    }

    async guardar(carrito){
        try{
            const elem = await this.listarTodo()
            if(elem.length == 0){
                carrito.id = 1
            } else {
                carrito.id = elem[elem.length - 1].id + 1
            }
            carrito.timestamp = new Date().toLocaleString()
            let doc = this.query.doc()
            await doc.create(carrito)
            return doc.id
        }catch(error){throw new Error(`Error al guardar: ${error}`)}
    }

    async listarTodo(){
        try{
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs
            const response = docs.map((doc => (doc.data())))
            return response
        }catch(error){throw new Error(`Error al listar: ${error}`)}
    }

    async listar(id){
        try{
            const doc = this.query.doc(`${id}`)
            const item = await doc.get()
            return item.data()
        }catch(error){throw new Error(`Error al listar por id: ${error}`)}
    }

    async actualizar(elem, id){
        try{
            const prod = this.listar(id)
            const modif = this.query.doc(`${id}`)
            if (prod != undefined ){

                if(elem.nombre != undefined || ''){
                    await modif.update({ 
                        nombre: prod.nombre, 
                    })
                }

                if(elem.descripcion != undefined || ''){
                    await modif.update({ 
                        descripcion: prod.descripcion, 
                    })
                }

                if(elem.foto != undefined || ''){
                    await modif.update({ 
                        foto: prod.foto, 
                    })
                }

                if(elem.precio != undefined || ''){
                    await modif.update({ 
                        precio: prod.precio, 
                    })
                }
                return true
            } else {
                return false
            }
        }catch(error){throw new Error(`Error al actualizar: ${error}`)}
    }

    async borrar(){
        try{
            const snapshot = await this.query.listarTodo()
            const batchSize = snapshot.size
            const deleteCollection = async(batchSize) => {
                const orderCollections = this.query.orderBy('id').limit(batchSize)
                return new Promise((resolve, reject) =>{
                    deleteQueryBatch(resolve).catch(reject)
                })
            }
            const deleteQueryBatch = async(resolve) => {
                if(batch === 0){
                    resolve()
                    return
                }
                const batch = this.data.batch()
                snapshot.docs.forEach((doc) => {
                    batch.delete(doc.ref)
                })
                await batch.commit()
                process.nextTick(() => {
                    deleteQueryBatch(resolve)
                })
            } 
            deleteCollection(batchSize)
        }catch(error){throw new Error(`Error al borrar: ${error}`)}
    }

    async borrarId(id){
        try{
            const borrarProd = this.query.doc(`${id}`)
            if (borrarProd){
                await borrarProd.delete()
                return true
            } else { 
                return false 
            } 
        }catch(error){throw new Error(`Error al borrar por id: ${error}`)}
    }
}

export default FirebaseDB