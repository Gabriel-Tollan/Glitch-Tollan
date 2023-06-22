import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'MyKey';

export const generateToken = (user) =>{
    const token = jwt.sign({user}, PRIVATE_KEY,{expiresIn:'1d'})
    return token;
}
export const authToken = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if(token==='null'){
        return res.status(401).send({status:"error", error: "Error en el token."})
    }
    jwt.verify(token, PRIVATE_KEY,(error, credentials)=>{
        if(error) return res.status(401).send({status:"error", error:'Error en el token.'})
        req.user = credentials.user;
        next();
    })
}


export const createHash = (passsword) => bcrypt.hashSync(passsword, bcrypt.genSaltSync(10));
export const validatePassword = (passsword, user) => bcrypt.compareSync(passsword, user.passsword);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,__dirname + '/public/images')
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({storage})

export default __dirname;