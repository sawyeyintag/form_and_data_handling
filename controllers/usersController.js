const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("name")
    .isString()
    .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/)
    .withMessage(
      "Name must contain a first and last name, and each word should start with a capital letter."
    ),
  body("email").isEmail().withMessage("Email is not valid."),
  body("age").isInt({ min: 1 }).withMessage("Age must be a positive number."),
  body("bio")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Bio must be less than 100 characters."),
];

exports.usersListGet = (req, res) => {
  console.log(usersStorage.getUsers());
  res.render("index", {
    title: "Users List",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", { title: "Create User" });
};

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", { title: "Update User", user });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        errors: errors.array(),
      });
    }
    const { name, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, { name, email, age, bio });
    res.redirect("/");
  },
];

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { name, email, age, bio } = req.body;
    usersStorage.addUser({ name, email, age, bio });
    res.redirect("/");
  },
];
