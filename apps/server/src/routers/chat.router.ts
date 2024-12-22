import express from "express";

const router = express.Router();

import { sendMessage } from "../controllers/chat.controller";

router.post("/sendMessage", sendMessage);

export default router;
