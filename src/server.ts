import  express, {Request, Response, NextFunction} from "express";
import 'express-async-errors';
import { router } from "./routes";
import cors from 'cors';
import path from 'path'
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    limits:{fileSize: 50 * 1024 * 1024} // no maximo 50mb
}))

app.use(router);

app.use( // rota static para acessar as imagens dos productsW

    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req:Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        //se for uma instancia do tipo error

        return res.status(400).json({
            error: err.message
        })


    }
        return res.status(500).json({
            error: 'error',
            message: "internal server error."
        })
})

app.listen(process.env.PORT, () => console.log('servidor online!!')); // AULA 126 DEPLOY