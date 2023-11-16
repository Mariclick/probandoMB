import express from 'express';
import { port } from './config/index.js';
import dbConnection from './config/db.js';
import userRoutes from  './routes/user.js';
import swaggerUI from 'swagger-ui-express';
import { openApiSpecification } from './config/swagger.js'

//import {opEnai} from './index.js'

const app= express(); 
dbConnection()

//middleware 
app.use(express.json())
app.use('/api', userRoutes);

//swagger
app.use('/api-doc', swaggerUI.serve);
app.use('/api-doc', swaggerUI.setup(openApiSpecification));
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openApiSpecification));



app.get('/',(request, response, error)=> {
    response.send('status: ok, Esta todo biennn!!' )

} )

app.listen(port, (error)=>{
    if (error){
        console.log('sErVeR error: failed');
        process.exit(1)
    }

    console.log(`server litening in por ${port}`);
})
console.log("hola");






