import express from "express";

const router = express.Router();

import {
  getApps,
  createApp,
  updateApp,
  getApp,
  getAppFromApiKey,
} from "../controllers/app.controller";

router.post("/createApp", createApp);
router.get("/getAllApps", getApps);
router.get("/getApp", getApp);
router.put("/updateApp/:id", updateApp);
router.get("/getAppFromApiKey", getAppFromApiKey);

export default router;
