"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("./user");
const progress_1 = require("./progress");
const content_1 = require("./content");
const router = express.Router();
router.use('/user', user_1.default);
router.use('/progress', progress_1.default);
router.use('/content', content_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map