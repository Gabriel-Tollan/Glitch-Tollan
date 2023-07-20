import winston from "winston";
import __dirname from "../utils.js";
import path from 'path';
import { config } from "../config/config.js";


const currentEnv = config.node_env;

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        verbose: 5,
        debug: 6,
        silly: 7
      },
      colors: {
        fatal: 'cyan',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'white',
        verbose: 'green',
        debug: 'magenta',
        silly: 'grey'
      }
}



const devLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({level: 'debug', format: winston.format.combine(
            winston.format.colorize({
                colors:customLevels.colors
            }),
            winston.format.simple()
        )}),
    ]
});

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'info', format: winston.format.combine(
            winston.format.colorize({
                colors:customLevels.colors
            }),
            winston.format.simple()
        )}),
        new winston.transports.File({filename: path.join(__dirname, './Dao/files/errors.log'), level:'warn'})

    ]
});

export const addLogger = (req, res, next) =>{
    if (currentEnv === 'dev' ) {
        req.logger = devLogger;
    } else {
        req.logger = prodLogger;
    }
    let date = new Date().toLocaleDateString();
    req.logger.http(`'${req.method}' en '${req.url}' - date: ${date}`);
    next()
};