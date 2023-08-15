import Assert from "assert";
import  userModel from "../src/dao/models/user.models.js";
import { connectDB } from "../src/config/connection.config.js";
import { UserMongo } from "../src/dao/mongo/user.mongo.js";

const assert = Assert.strict;

const userDao = new UserMongo();

describe("UserMongo Test", async function () {
    
    before(async function () {

        this.timeout(10000);

        await connectDB();

    });

    it("User GET method must return an array", async function () {

        const result = await userDao.getUsers();

        assert.strictEqual(Array.isArray(result.message), true);

    });

});