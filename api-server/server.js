const express = require("express");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const usersRoute = require("./routes/usersRoute");
const dbConnection = require("./knex/knex");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());

app.use("/users", usersRoute);

dbConnection.migrate.latest().then((migration) => {
  if (migration) {
    console.log(migration, "Connected to DB");
    app.listen(PORT, () => {
      console.log("Listening on port " + PORT);
    });
  }
});
