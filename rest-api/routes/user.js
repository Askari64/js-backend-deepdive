const express = require("express");
const {
  handleGetAllUsers,
  getUserByID,
  patchUserByID,
  deleteuserByID,
  createUser,
} = require("../controller/user");

const router = express.Router();

/*router.get("/users", async (req, res) => {
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
});*/

//REST API
router.route("/").get(handleGetAllUsers).post(createUser);

//Dynamic Routers Merged Actions
router
  .route("/:id")
  .get(getUserByID)
  .patch(patchUserByID)
  .delete(deleteuserByID);

module.exports = router;
