import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/user", async (req, res) => {
  // const { id, email, firstName, lastName } = req.body;
  console.log(req.body);
  

  try {
    // console.log({ id, email, firstName, lastName });

    res.status(200).send("User saved successfully.");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user.");
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
