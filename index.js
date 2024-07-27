
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    massage: "success ",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  // console.log("Payment Request: ", total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    console.log(paymentIntent);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      massage: "total is not valid",
    });
  }
});


app.listen(5000,(err)=> {
    if(err) throw err;

    console.log("server is running,https://localhost:5000")
  });
 
  






   





