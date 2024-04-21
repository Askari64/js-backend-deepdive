const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function createUser(req, res) {
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
}

async function getUserByID(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  return res.json(user);
}

async function patchUserByID(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    last_name: "Changed",
  });

  return res.json({ status: "Successfully patched" });
}

async function deleteuserByID(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ message: "Success" });
}

module.exports = {
  handleGetAllUsers,
  createUser,
  getUserByID,
  patchUserByID,
  deleteuserByID,
};
