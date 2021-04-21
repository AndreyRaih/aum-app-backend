"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../repositories/user");
const utils_1 = require("../utils");
const router = express.Router();
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const repository = new user_1.UserDataRepository();
    try {
        const user = await repository.getUserModel(id);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
    next();
});
router.post('/create', async (req, res, next) => {
    const id = req.body.id;
    const model = utils_1.createUserModel(id);
    const repository = new user_1.UserDataRepository();
    try {
        await repository.setUserModel(id, model);
        res.status(200).send();
    }
    catch (error) {
        res.status(400).send(error);
    }
    next();
});
router.post('/update', async (req, res, next) => {
    const { id, updates } = req.body;
    const repository = new user_1.UserDataRepository();
    try {
        await repository.updateUserModel(id, updates);
        res.status(200).send();
    }
    catch (error) {
        res.status(400).send(error);
    }
    next();
});
exports.default = router;
//# sourceMappingURL=user.js.map