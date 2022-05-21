/* 
npm init -y
npm i mongoose
npm i firebase-admin
npm i express
*/
import express from "express";
import dotenv from 'dotenv'
const { Router } = express
dotenv.config()

import {
    productosDAO as productoApi,
    carritosDAO as carritosApi,
} from './daos/index.js'

const app = express()

/*const esAdmin = true

function noEsAdmin(ruta, metodo){
    const error = {
        error: -1
    }
    if(ruta && metodo){
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function soloAdmin(req, res, next){
    if(!esAdmin){
        res.JSON(noEsAdmin())
    }else{
        next()
    }
}*/

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* Productos */
const productosRouter = new Router()
app.use('/api/producto', productosRouter)

productosRouter.get('/', async (req, res) => {
    const productos = await productoApi.listarTodos()
    res.json(productos)
})

productosRouter.get('/:id', async(req, res) => {
    res.json(await productoApi.listar(req.params.id))
})

productosRouter.post('/', async(req, res) => {
    res.json(await productoApi.guardar(req.body))
})

productosRouter.put('/:id', async(req, res) => {
    res.json(await productoApi.actualizar(req.body))
})

productosRouter.delete('/:id', async(req, res) => {
    res.json(await productoApi.borrar(req.params.id))  
})

productosRouter.delete('/', async(req, res) => {
    res.json(await productoApi.borrarTodos())
})


/* Carritos */
const carritoRouter = new Router()
app.use('/api/carrito', carritoRouter)

carritoRouter.get('/', async (req, res) => {
    const productos = await carritosApi.listarTodos()
    res.json(productos)
})

carritoRouter.get('/:id', async(req, res) => {
    res.json(await carritosApi.listar(req.params.id))
})

carritoRouter.post('/', async(req, res) => {
    res.json(await carritosApi.guardar(req.body))
})

carritoRouter.put('/:id', async(req, res) => {
    res.json(await carritosApi.actualizar(req.body))
})

carritoRouter.delete('/:id', async(req, res) => {
    res.json(await carritosApi.borrar(req.params.id))  
})

carritoRouter.delete('/', async(req, res) => {
    res.json(await carritosApi.borrarTodos())
})


const PORT = 8080
const srv = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${srv.address().port}`)
})
srv.on('error', error => console.log(`Error en el servidor ${error}`))