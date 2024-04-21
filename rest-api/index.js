const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/rest-api-mongo-learning")
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error", err));

//Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.urlencoded({ extended: false }));

//SSR
app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `
    <ul>
    ${allDBUsers
      .map(
        (user) =>
          `<li>
        ${user.first_name} ${user.last_name} - ${user.email}
      </li>`
      )
      .join("")}
    </ul>`;
  res.send(html);
});

//REST API
app
  .route("/api/users/")
  .get(async (req, res) => {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
  })
  .post(async (req, res) => {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.job_title ||
      !body.gender
    ) {
      return res.status(400).json({ message: "Fill all fields" });
    }
    await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });
    return res.status(201).json({ message: "Created" });
  });

//Dynamic Routers Merged Actions
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      last_name: "Changed",
    });

    return res.json({ status: "Successfully patched" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "Success" });
  });

app.listen(PORT, () => console.log("🟢 Server Started"));
