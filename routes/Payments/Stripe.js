const Stripe = require("stripe");
const router = require("express").Router();
const STRIPE_PUBLIC = process.env.STRIPE_PUBLIC_KEY;
const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

router.post("/create-payment-intent", async (req, res) => {
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

module.exports = router;
