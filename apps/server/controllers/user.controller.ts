import prisma from "../db/db";
import z from "zod";

export function getUserInfo() {}

export async function createUser(req: Request, res: Response) {
  try {
    const body = req.body;

  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}

export function updateUser() {}

export function deleteUser() {}
