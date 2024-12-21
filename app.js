const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter");

require("dotenv").config(); // Corrected this line

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
