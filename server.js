const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const dotenv = require("dotenv");
const Stripe = require("stripe");

const app = express();
require("dotenv").config();
const PUBLISHABLE_KEY =
  "pk_test_51Ho62uJixMHAqmvGjSDHopdtU5QxjjB2sjXLCCrxyitYCiWth16kZBskruK9gNOdZAo7tZxkAdSFWE5KxQr6WqJw00IR1No2PY";
const SECRET_KEY =
  "sk_test_51Ho62uJixMHAqmvGxoc5jdNsJJWWDZk0sXHldeA6jGHV84rPlemuBinak6I6IKUycnf48rOKHGkf6k1JxPu2dF2600I8YkHRJT";

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connetction succesfull");
});

//stripe
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });
app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

const usersRouter = require("./routes/users.js");
app.use("/user", usersRouter);

const tourPlanRoutes = require("./routes/touristRoutes/tourPlanRoute/tourDetails.js");
app.use("/tourplan", tourPlanRoutes);

//then we run this port
const hotelPackageRouter = require("./routes/hotelPackages.js");
app.use("/hotelPackage", hotelPackageRouter);

//then we run this port
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});

////////////////////
//https://www.section.io/engineering-education/creating-a-real-time-chat-app-with-react-socket-io-with-e2e-encryption/
