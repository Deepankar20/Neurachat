import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../db/db";

import type { Request, Response } from "express";

export async function sendMessage(req: Request, res: Response) {
  try {
    const { apiKey, message } = req.body;

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

    const prompt = app.context + message;

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
