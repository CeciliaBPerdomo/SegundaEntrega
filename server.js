/* 
npm init -y
npm i mongoose
npm i firebase-admin
npm i express
*/
import express from "express";
const { Router } = express

import {
    productosDAO as productoApi,
    carritosDAO as carritosApi,
} from './daos/index'

const app = express()

const esAdmin = true

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
}

/* Productos */
const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    const productos = await productoApi.listarTodos()
    res.JSON(productos)
})

productosRouter.get('/:id', async(req, res) => {
    res.JSON(await productoApi.listar(req.params.id))
})

productosRouter.post('/', async(req, res) => {
    res.JSON(await productoApi.guardar(req.body))
})

productosRouter.put('/:id', async(req, res) => {
    res.JSON(await productoApi.actualizar(req.body))
})

productosRouter.delete('/:id', async(req, res) => {
    res.JSON(await productoApi.borrar(req.params.id))  
})

productosRouter.delete('/', async(req, res) => {
    res.JSON(await productoApi.borrarTodos())
})


/* Carritos */
const carritoRouter = new Router()

carritoRouter.get('/', async (req, res) => {
    const productos = await carritosApi.listarTodos()
    res.JSON(productos)
})

carritoRouter.get('/:id', async(req, res) => {
    res.JSON(await carritosApi.listar(req.params.id))
})

carritoRouter.post('/', async(req, res) => {
    res.JSON(await carritosApi.guardar(req.body))
})

carritoRouter.put('/:id', async(req, res) => {
    res.JSON(await carritosApi.actualizar(req.body))
})

carritoRouter.delete('/:id', async(req, res) => {
    res.JSON(await carritosApi.borrar(req.params.id))  
})

carritoRouter.delete('/', async(req, res) => {
    res.JSON(await carritosApi.borrarTodos())
})