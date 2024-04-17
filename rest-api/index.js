const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));

//SSR
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users
      .map(
        (user) =>
          `<li>
        ${user.first_name} ${user.last_name}
      </li>`
      )
      .join("")}
    </ul>`;
  res.send(html);
});

//REST API
app
  .route("/api/users/")
  .get((req, res) => {
    res.setHeader("X-myName", "Askari");
    return res.json(users);
  })
  .post((req, res) => {
    const body = req.body;
    users.push({ id: users.length + 1, ...body });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "successful" });
    });
  });

//Dynamic Routers Merged Actions
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user){
      return res.status(404).json({error: "user not found"})
    }
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const updateUser = { ...users[index], ...req.body };
    users[index] = updateUser;
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(users, null, 2),
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error occoured - Failed to update" });
        }
      }
    );
    return res.json({ status: "Successfully patched" });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(users, null, 2),
        (err, data) => {
          return res.json({ status: "Successfully deleted" });
        }
      );
    } else return res.status(404).json({ message: "user not found" });
  });

app.listen(PORT, () => console.log("🟢 Server Started"));
