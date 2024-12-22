import express from "express";
import cors from "cors";
import appRouter from "./routers/app.router";
import chatRouter from "./routers/chat.router";
import prisma from "./db/db";

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/user", async (req, res) => {
  // const { id, email, firstName, lastName } = req.body;
  const data = req.body;

  try {
    const email = data.data.email_addresses[0]?.email_address || null;
    const username = data.data.username || null;
    const firstName = data.data.first_name || null;
    const lastName = data.data.last_name || null;
    const id = data.data.id;

    const newUser = await prisma.user.create({
      data: {
        id,
        last_name: lastName,
        first_name: firstName,
        username,
        email,
      },
    });

    console.log(newUser);

    res
      .status(200)
      .json({ message: "User saved successfully.", code: 200, data: null });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user.");
  }
});

app.use("/api/v1/app", appRouter);
app.use("/api/v1/chat", chatRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
