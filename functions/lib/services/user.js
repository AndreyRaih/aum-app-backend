"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../repositories/user");
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
    const model = createUserModel(id);
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
    const id = req.params.id;
    const model = createUserModel(id);
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
const createUserModel = (id) => {
    return {
        id,
        name: null,
        levels: {
            standing: 1,
            sitting: 1,
            balances: 1,
            lying_forward: 1,
            lying_back: 1
        },
        onboardingComplete: {
            concept: false,
            player: false
        },
        recentResults: [],
        sessions: []
    };
};
exports.default = router;
//# sourceMappingURL=user.js.map