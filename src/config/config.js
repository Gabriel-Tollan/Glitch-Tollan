import dotenv from "dotenv";
import path from "path";
import { Command } from "commander";
import  __dirname  from "../utils.js";

const program = new Command();

program
.option("-mode <mode>", "Environment Mode", "dev")
program.parse();

const environment = program.opts();

console.log(environment);

const pathEnvironment = environment.Mode === "prod" ? path.join(__dirname, "../.env.production") : path.join(__dirname, "../.env.development");

dotenv.config({path: pathEnvironment});

const PORT = process.env.PORT;

const MONGO = process.env.MONGO;
console.log(process.env)

const SECRET = process.env.SECRET;

const MAIL_ACCOUNT = process.env.MAIL_ACCOUNT;

const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

export const config = {
    server: {port: PORT},
    secret: {key: SECRET},
    email: {account: MAIL_ACCOUNT, password: MAIL_PASSWORD},
    mongo: {url: MONGO}
};