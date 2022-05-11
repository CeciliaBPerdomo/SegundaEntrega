/* 
npm init -y
npm i mongoose
npm i firebase-admin
npm i express
*/
import express  from "express";
const { Router } = express

import {
    productosDAO as productoApi,
    carritosDAO as carritosApi,
} from './daos/index'

const app = express()

const esAdmin = true