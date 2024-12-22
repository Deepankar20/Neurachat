// import prisma from "../db/db";
// import z from "zod";

// export function getUserInfo() {}

// export async function createUser(req: Request, res: Response) {
//   const data = req.body;

//   if (!data) {
//     return;
//   }
//   try {
    
//     if (!data.data) {
//       return;
//     }
//     const email = data.data.email_addresses[0]?.email_address || null;
//     const username = data.data.username || null;
//     const firstName = data.data.first_name || null;
//     const lastName = data.data.last_name || null;
//     const id = data.data.id;

//     const newUser = prisma.user.create({
//       data: {
//         id,
//         last_name: lastName,
//         first_name: firstName,
//         username,
//         email,
//       },
//     });

//     res
//       .status(200)
//       .json({ message: "User saved successfully.", code: 200, data: null });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(500).send("Error saving user.");
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export function updateUser() {}

// export function deleteUser() {}
