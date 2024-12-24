import prisma from "../db/db";

import type { Request, Response } from "express";
type bodyType = {
  name: string;
  userid: string;
  context: string;
};

export async function createApp(req: Request, res: Response) {
  try {
    const body = req.body as bodyType;
    console.log(body);

    if (!body) {
      res
        .status(404)
        .json({ message: "Error creating app", code: 404, data: null });
    }

    const random = Math.random().toString(36).substr(2, 10);

    const apiKey = body.userid + "-" + random;

    const app = await prisma.app.create({
      data: {
        name: body.name,
        context: body.context,
        apiKey: apiKey,
        userId: body.userid,
      },
    });
    if (!app) {
      res
        .status(404)
        .json({ message: "Error creating app", code: 404, data: null });
    }

    console.log("App created successfully:", app);

    res
      .status(200)
      .json({ message: "App created successfully", code: 200, data: app });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", code: 500, data: null });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getApps(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      res
        .status(400)
        .json({ message: "Invalid user ID", code: 400, data: null });
    }
    const apps = await prisma.app.findMany({
      where: { userId: userId },
    });

    if (!apps) {
      res.status(404).json({ message: "No apps found", code: 404, data: null });
    }

    console.log("Apps fetched successfully:", apps);

    res
      .status(200)
      .json({ message: "Apps fetched successfully", code: 200, data: apps });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", code: 500, data: null });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getApp(req: Request, res: Response) {
  try {
    const appId = (req.query.appId as string) || "";

    if (!appId) {
      res
        .status(400)
        .json({ message: "Invalid App ID", code: 400, data: null });
    }

    const app = await prisma.app.findFirst({
      where: {
        apiKey: appId,
      },
    });

    if (!app) {
      res.status(404).json({ message: "No app found", code: 404, data: null });
    }

    res
      .status(200)
      .json({ message: "Fetched app successfully", code: 200, data: app });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", code: 500, data: null });
  } finally {
    await prisma.$disconnect();
  }
}

export function updateApp() {}
