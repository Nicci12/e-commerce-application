const express = require("express");
const PORT = "http://e-commerce-application-pi.vercel.app"
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes")
const mongoose = require("mongoose");
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://e-commerce-application-pi.vercel.app', credentials: true}));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


app.use("/users", userRoute);
app.use("/products", productRoute);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
  
  app.use((err, res,) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  
  