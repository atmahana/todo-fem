import express from "express";
import todo from "./v1/todo";

const router = express.Router();

export default (): express.Router => {
    todo(router);
    return router;
};