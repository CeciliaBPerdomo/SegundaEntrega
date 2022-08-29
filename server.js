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

import { obj } from './daos/index.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* Productos */
const productosRouter = new Router()
app.use('/api/producto', productosRouter)

productosRouter.get('/', async (req, res) => {
    const productos = await obj.productosDAO.listarTodos()
    res.json(productos)
})

productosRouter.get('/:id', async(req, res) => {
    res.json(await obj.productosDAO.listar(req.params.id))
})

productosRouter.post('/', async(req, res) => {
    res.json(await obj.productosDAO.guardar(req.body))
})

productosRouter.put('/:id', async(req, res) => {
    res.json(await obj.productosDAO.actualizar(req.body, req.params.id))
})

productosRouter.delete('/:id', async(req, res) => {
    res.json(await obj.productosDAO.borrar(req.params.id))  
})

/* Carritos */
const carritoRouter = new Router()
app.use('/api/carrito', carritoRouter)

carritoRouter.get('/', async (req, res) => {
    const productos = await obj.carritosDAO.listarTodos()
    res.json(productos)
})

carritoRouter.get('/:id', async(req, res) => {
    const id = req.params.id
    res.json(await obj.carritosDAO.listar(id))
})

carritoRouter.post('/', async(req, res) => {
    res.json(await obj.carritosDAO.guardar(req.body))
})

carritoRouter.post('/guardar/:id/productos/:pid', async(req, res) => {
    const { id } = req.params
    const producto = req.body
    res.json(await obj.carritosDAO.guardarProd(id, producto))
})

carritoRouter.delete('/:id', async(req, res) => {
    res.json(await obj.carritosDAO.borrar(req.params.id))  
})

carritoRouter.delete('/', async(req, res) => {
    res.json(await obj.carritosDAO.borrarTodos())
})

/* Server connect */
const PORT = 8080
const srv = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${srv.address().port}`)
})
srv.on('error', error => console.log(`Error en el servidor ${error}`))