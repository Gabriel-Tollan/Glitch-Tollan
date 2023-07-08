import nodemailer from "nodemailer";
import { options } from "./options.js";

const adminEmail = options.gmail.adminAccount;
const adminPass = options.gmail.adminPaass;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
    auth:{
        usser:adminEmail,
        pass: adminPass
    },
    sercure: false,
    tls:{
        rejectUnauthorized: false
    }
})

export { transporter }