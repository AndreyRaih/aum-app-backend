"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const content_1 = require("../repositories/content");
const router = express.Router();
router.get('/tags', async (req, res, next) => {
    const repository = new content_1.ContentDataRepository();
    const result = await repository.getTags();
    res.status(200).send(result);
});
exports.default = router;
//# sourceMappingURL=content.js.map