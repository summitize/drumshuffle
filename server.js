require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const AWS = require("aws-sdk");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "RAZORPAY_KEY_ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "RAZORPAY_KEY_SECRET",
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY || "AWS_ACCESS_KEY",
  secretAccessKey: process.env.AWS_SECRET_KEY || "AWS_SECRET_KEY",
  region: "ap-south-1"
});

app.post("/api/create-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 1000,
      currency: "INR",
      receipt: \eceipt_\\,
      payment_capture: 1 
    });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: "Order failed" });
  }
});

app.post("/api/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "RAZORPAY_KEY_SECRET")
                                    .update(body.toString()).digest("hex");
    if (expectedSignature === razorpay_signature) {
      const signedUrl = s3.getSignedUrl('getObject', {
          Bucket: process.env.AWS_BUCKET_NAME || "drumshuffle-premium-notes",
          Key: 'premium-drum-notes.pdf',
          Expires: 600
      });
      res.json({ success: true, downloadUrl: signedUrl });
    } else {
      res.status(400).json({ success: false, error: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Verification failed" });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Drumshuffle Backend Running"));
