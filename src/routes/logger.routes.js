import { Router } from "express";

import customLogger from "../utils/logger.js";

const router = Router();

router.get('/', async(req, res) => {

    customLogger.debug(`This is a debug message. Visible only in development. Not logged in the file`);
    customLogger.http(`This is an http message. Visible only in development. Not logged in the file`);
    customLogger.info(`This is an info message. Visible only in development. Not logged in the file`);
    customLogger.warn(`This is a warning message. Visible also in production. Not logged in the file`);
    customLogger.error(`This is an error message. Visible also in production. Logged in the file only in production`);
    customLogger.fatal(`This is a fatal message. Visible also in production. Logged in the file only in production`);

    return res.status(202).send({status: "Success", message: ""})

});

export default router;