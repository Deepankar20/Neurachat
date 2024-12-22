import express from "express";

const router = express.Router();

import {
  getApps,
  createApp,
  updateApp,
  getApp,
} from "../controllers/app.controller";

router.post("/createApp", createApp);
router.get("/getAllApps", getApps);
router.get("/getApp/:id", getApp);
router.put("/updateApp/:id", updateApp);

export default router;
