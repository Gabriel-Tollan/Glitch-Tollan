import userModel from "../models/user.models.js";
import { cartDao } from '../handler.js';
import { createHash } from '../../utils.js';
import { generateToken, generateEmailToken } from "../../utils/token.js";
import { UserDto } from "../../dto/user.dto.js";
import customLogger from '../../utils/logger.js';
import { loggerPrefix } from "../../utils/logger.js";
import { sendRecoveryPassword } from "../../utils/email.js";

const filename = 'user.mongo.js';

export class UserMongo{

    constructor(){
        this.model = userModel
    };

    async register(body){

        const { first_name, last_name, email, age, role, password } = body;
    
        const inUse = await this.model.findOne({email: email});
    
        if (inUse){

            customLogger.error(loggerPrefix(filename, 'The email is already in use'));

            return {
                code: 400,
                status: "Error",
                message: 'The email is already in use'
            };

        };
    
        const user = { first_name, last_name, email, age, role, password: createHash(password) };
    
        try {
    
            await this.model.create(user);

            customLogger.http(loggerPrefix(filename, 'User registered correctly'));
    
            return {
                code: 202,
                status: 'Success',
                message: 'User registered correctly'
            };
    
        } catch (error) {

            customLogger.error(loggerPrefix(filename, `${error.message}`));
    
            return{
                code: 400,
                status: "Error",
                message: error.message
            };

        };
    
    };
    
    async login (email){
    
        const user = await this.model.findOne({email: email});

        
        const response = await cartDao.createCart(user._id);
        
        user.cart = response.message._id;

        const userDto = new UserDto(user);

        const access_token = generateToken(user, '1d');

        customLogger.http(loggerPrefix(filename, `User ${user._id} successfully logged in`));
    
        return{
            status: "Success",
            message: "You have succesfully logged in",
            user: userDto,
            token: access_token,
        };
    
    };

    async forgotPassword(email){

        try {

            const resetToken = generateEmailToken(email, 180);

            await sendRecoveryPassword(email, resetToken);

            return{
                code: 202,
                status: "Success",
                message: "Password recovery email sent"
            };


        } catch (error) {

            customLogger.error(`Date: ${new Date().toLocaleDateString()} - File: ${filename} - Message: ${error.message}`);

            return{
                code: 400,
                status: "Error",
                message: error.message
            };

        };

    };

    async resetPassword(email, newPassword){

        try {

            const user = await this.model.findOne({email: email});

            const newUserData = {
                ...user._doc,
                password: createHash(newPassword)
            };

            await this.model.findOneAndUpdate({email: email}, newUserData);

            return{
                code: 202,
                status: "Success",
                message: "Password successfuly reset"
            };

        } catch (error) {

            customLogger.error(`Date: ${new Date().toLocaleDateString()} - File: ${filename} - Message: ${error.message}`);

            return{
                code: 400,
                status: "Error",
                message: error.message
            };

        };

    };

};