import { Router } from "express";
import userModel from "../dao/models/user.models.js";
import { validateRole } from "../../src/middlewares/validations.js";


const router = Router();

router.put('/premium/:uid', validateRole(['admin']), async (req, res) => {

    try {

        const uid = req.params.uid;

        const user = await userModel.findById(uid);

        const userRole = user.role;

        if (userRole === 'user') {

            user.role = 'premium';

        } else if (userRole === 'premium') {

            user.role = 'user';

        } else {

            return res.status(400).send({
                status: 'Error',
                message: 'Not authorized to make that change'
            });

        };

        await userModel.updateOne({_id: uid}, user);

        return res.status(200).send({
            status: 'Success',
            message: 'User status successfuly updated'
        });

    } catch (error) {

        return res.status(400).send({
            status: 'Error',
            message: error.message
        });

    };

});

export default router;
