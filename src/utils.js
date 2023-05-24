import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';

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