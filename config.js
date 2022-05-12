import admin from "firebase-admin"
import serviceAccount from "./proyectoprueba-f1806-firebase-adminsdk-edn03-3704dc6bc2.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Base de datos Firebase conectada')
const db = admin.firestore()

const config = {
    mongoDB: {
        url: '',
        options: {
            useNewUrlPaser: true,
            useUnifiedTopology: true
        }
    }, 
    fileSystem: {
        dirProducts: './DB/productos.json',
        dirCarrito: './DB/carritos.json'
    }
}

export default config