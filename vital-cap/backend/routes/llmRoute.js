const express = require('express');
const llmRouter = express.Router();
const llmController = require("../controllers/llmController")
const authMiddleware = require("../middlewares/authMiddleware")
const isAuth = authMiddleware.isAuth;

llmRouter.post("/extract-text", isAuth, llmController.extractText);

module.exports = llmRouter;