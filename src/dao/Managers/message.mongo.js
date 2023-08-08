import messageModel from "../models/messages.model.js";
import timestamp from "time-stamp";


export class MessageMongo{

    constructor(){
        this.model = messageModel
    };

    async getMessages(){

        try {

            const messages = await this.model.find().lean();
    
            return {
                code: 202,
                status: "Success",
                message: messages
            };

        } catch (error) {

            return {
                code: 400,
                status: "Error",
                message: error.message
            };

        };

    };

    async saveMessage(username, message){

        try {

            const entry = {
                username: username,
                message: message,
                datetime: String(timestamp('YYYY:MM:DD:HH:mm:ss'))
            };

            await this.model.create(entry);

            return {
                code: 202,
                status: "Success",
                message: "Message sent"
            };

        } catch (error) {

            return {
                code: 400,
                status: "Error",
                message: error.message
            };

        };

    };

};