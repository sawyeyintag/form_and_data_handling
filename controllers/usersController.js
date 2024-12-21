const usersStorage = require("../storages/usersStorage");

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "Users List",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("create", { title: "Create User" });
};

exports.usersCreatePost = (req, res) => {
  const { name, email, age, bio } = req.body;
  usersStorage.addUser({ name, email, age, bio });
  res.redirect("/");
};
