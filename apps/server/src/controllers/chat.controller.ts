import { GoogleGenerativeAI } from "@google/generative-ai";
import { _prompt1, _prompt2 } from "../utils/prompt";
import prisma from "../db/db";

import type { Request, Response } from "express";

export async function sendMessage(req: Request, res: Response) {
  try {
    const { apiKey, message } = req.body;
    console.log({ apiKey, message });

    if (!apiKey) {
      res
        .status(403)
        .json({ message: "Invalid ApiKey", code: 403, data: null });
    }

    if (!message) {
      res
        .status(404)
        .json({ message: "Send some message", code: 404, data: null });
    }

    const app = await prisma.app.findFirst({
      where: {
        apiKey: apiKey,
      },
    });

    if (!app) {
      res
        .status(403)
        .json({ message: "Invalid ApiKey", code: 403, data: null });

      return;
    }

    const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
    const model = genAI.getGenerativeModel({
      model: `${process.env.GEMINI_MODEL}`,
    });

    const prompt = _prompt1 + app.context + _prompt2 + message;

    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.text();

    if (!geminiResponse) {
      res.json(400).json({
        message: "unable to generate response",
        code: 400,
        data: null,
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        text: message,
        appId: app.id,
        response: geminiResponse,
      },
    });

    res.status(200).json({
      message: "Generated response successfully",
      code: 200,
      data: geminiResponse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", code: 500, data: null });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllMessages(req: Request, res: Response) {
  try {
    const apiKey = req.query.apiKey as string;

    if (!apiKey) {
      res
        .status(403)
        .json({ message: "Invalid ApiKey", code: 403, data: null });

      return;
    }

    const app = await prisma.apiKey.findFirst({
      where: {
        key: apiKey,
      },
    });

    if (!app) {
      res
        .status(403)
        .json({ message: "Invalid ApiKey", code: 403, data: null });

      return;
    }

    const messages = await prisma.message.findMany({
      where: {
        appId: app.appId,
      },
    });

    res
      .status(200)
      .json({ message: "Fecthed all messages", code: 200, data: messages });
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}
