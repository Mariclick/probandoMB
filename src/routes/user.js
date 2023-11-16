import express, { request } from "express";   // llamo a expres 
const router = express.Router()  // crear un enrutador, retorna un objeto router constructor

import  miModelo from "../models/users.js";



// CREAR USUARIO 
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - personaje
 *          - motivo
 *          
 *        properties:
 *          name:
 *            type: string
 *          personaje:
 *            type: string
 *          motivo:
 *            type: string
 *            
 *        example:
 *          name: mariana
 *          peronaje: heroina
 *          motivo: brendan@email.com


//Users

/**
 * @swagger
 * /users:
 *   post:
 *    description: Creation API for users
 *    summary: create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schema/User'
 *    responses:
 *      201:
 *        description: new user created
 *      400:
 *        description: Bad request
 */





router.post('/users', (req, res) => { // funcion recibe el objeto de la peticion y obj de la resp 

  const user = miModelo(req.body);  //esto nos va a crear unusuario, con los datos q llegan del cuerpo de la peticion
  user
    .save() //guarda bd
    .then((data) => res.json(data)) //responde mostrando los datos
    .catch((error) => res.json({message:error})) // msj de error */
});

// OBTENER todos los USUARIOS

router.get('/users', (req, res) => {   
  miModelo
   .find() 
   .then((data) => res.json(data)) 
   .catch((error) => res.json({message:error})) 
 });


 /**
  *  @swagger 
 * /api/users:
 *   get:
 *     summary: retorna todos los  usuarios
 *     tags:[User]
 *     responses:
 *      201:
 *        description: new user created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref:'#/components/schemas/User'
 *      404:
 *        description: Bad request
 *             
  * 
  * 
  * 
  */


 // OBTENER UN  USUARIO

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  miModelo
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



 /* MODIFICAR UN  USUARIO

router.put('/users/:id', (req, res) => { 
  const {id}= req.params;
  miModelo   

});*/

 // ELIMINAR  UN  USUARIO
 router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await miModelo.remove({ _id: id });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

/**
 * @swagger 
* /api/users/{id}:
*   delete:
*     summary: eliminar  usuario
*     tags:[User]
      parameters:
        -in : path
          name: id
          schema:
            type: string
          required:true
          description: id usuarioun 
      responses:
 *      201:
 *        description: usuario eliminado
 *      404:
 *        description: no se encontro el usuario
*
 */

export { router as default }

