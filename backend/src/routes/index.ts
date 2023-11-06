import express from "express";
import auth from "./auth";
import users from "./users";
import todo from "./todo";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    users(router);
    todo(router);
    return router;
};