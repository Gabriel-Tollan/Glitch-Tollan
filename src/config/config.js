import dotenv from "dotenv";
import path from "path";
import { Command } from "commander";

const program = new Command();

import __dirname from "../utils.js"

program.option("-mode <mode>", "Environment Mode", "dev").option("-persistence <persistence>", "Persistence Mode", "db");

program.parse(process.argv);

const environment = program.opts();

const pathEnvironment = environment.Mode === "prod" ? path.join(__dirname, "../.env.production") : path.join(__dirname, "../.env.development");

dotenv.config({path: pathEnvironment});

export const config = {
    server: {port: process.env.PORT},
    mongo: {url: process.env.MONGO},
    secret: {key: process.env.SECRET},
    email: {account: process.env.MAIL_ACCOUNT, password: process.env.MAIL_PASSWORD, key: process.env.MAIL_KEY},
    environment: {mode: environment.Mode},
    persistence: {type: environment.Persistence}
};