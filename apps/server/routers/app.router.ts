import express from "express";

const router = express.Router();

import { getApps, createApp, updateApp } from "../controllers/app.controller";

router.post("/api/app/", createApp);
router.get("/api/apps", getApps);
router.put("/api/app/:id", updateApp);
