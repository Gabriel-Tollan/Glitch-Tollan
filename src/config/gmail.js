import nodemailer from "nodemailer";
import { config } from "./config.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: config.email.account,
        pass: config.email.password
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

export const sendRecoveryPass = async(userEmail,token)=>{
    const link = `http://localhost:8080/reset-password?token=${token}`;
    await transporter.sendMail({
        from:options.gmail.emailAdmin,
        to:userEmail,
        subject:"Restablecer contraseña",
        html: `
        <div>
        <h2>Has solicitado un cambio de contraseña.</h2>
        <p>Da clic en el siguiente enlace para restableces la contraseña</p>
        <a href="${link}">
        <button> Restablecer contraseña </button>
        </a>        
        </div>
        `
    })
};