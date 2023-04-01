const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { fetchPerson } = require("../../middlewares");

//Models
const User = require("../../databases/models/User");
const SellOrder = require("../../databases/models/SellOrder");
const BuyOrder = require("../../databases/models/BuyOrder");
const RentalService = require("../../databases/models/RentalService");
const Community = require("../../databases/models/Community");

router.post("/register", async (req, res) => {
  const regisForm = req.body;

  try {
    const salt = await bcrypt.genSalt(3);
    regisForm.password = await bcrypt.hash(regisForm.password, salt);

    await User.create(regisForm);

    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ success: false, message: `Unable to register: ${err.message}` });
  }
});

router.post("/login", async (req, res) => {
  let userId = req.body.userId;
  let enteredPassword = req.body.password;

  try {
    // match creds
    const userDoc = await User.findOne({ userId: userId });

    if (!userDoc) {
      // wrong userId
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const hashedPassword = userDoc.password;

    const isPasswordMatched = await bcrypt.compare(
      enteredPassword,
      hashedPassword
    );

    if (!isPasswordMatched) {
      // wrong password
      return res
        .status(401)
        .json({ statusText: statusText.INVALID_CREDS, areCredsInvalid: true });
    }

    // generate token
    const data = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 122,
      person: {
        mongoId: userDoc._id,
      },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", token: token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/verify-token", fetchPerson, async (req, res) => {
  try {
    const userDoc = await User.findById(req.mongoId);

    return res
      .status(200)
      .json({ success: true, message: "User verified", userDoc: userDoc });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "User not verified" });
  }
});

router.post("/get-user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const userDoc = await User.findById(userId);
    res
      .status(200)
      .json({
        success: true,
        message: "User retrieved successfully",
        userDoc: userDoc,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "User not verified" });
  }
});

//Placing a sell order
router.post("/sell-order", fetchPerson, async (req, res) => {
  //must have auth-token in header

  try {
    const sellOrder = req.body;
    const seller_id = req.mongoId;

    const sellerDoc = await User.findById(seller_id);
    const location = sellerDoc.city;

    const newCommunity1 = await Community.findOne({
      city: sellOrder.location,
      residue_type: sellOrder.residue_type,
    });
    if (!newCommunity1) {
      const newCom = await Community.create({
        city: location,
        residue_type: sellOrder.residue_type,
        quantity: sellOrder.quantity,
      });
      await newCom.save();
    } else {
      let curr_quantity = newCommunity1.quantity;
      curr_quantity += sellOrder.quantity;
      const newCommunity = await Community.findOneAndUpdate(
        { city: sellOrder.location, residue_type: sellOrder.residue_type },
        { quantity: curr_quantity }
      );
    }

    const userDoc = await User.findById(seller_id);
    console.log(userDoc);
    sellOrder.seller_id = seller_id;
    sellOrder.seller_name = userDoc.name;
    const newOrder = new SellOrder(sellOrder);
    await newOrder.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Sell order placed successfully",
        sellOrder: newOrder,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/get-sell-order/:orderId", async (req, res) => {
  const sellOrderId = req.params.orderId;
  try {
    const sellOrderDoc = await SellOrder.findById(sellOrderId);
    if (!sellOrderDoc) {
      return res
        .status(501)
        .json({ success: false, message: "Invalid sell order id" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Sell order retrieved successfully",
        sellOrder: sellOrderDoc,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

//updated only the new fields
router.put("/update-sell-order/:orderId", fetchPerson, async (req, res) => {
  const sellOrderId = req.params.orderId;
  const updatedEntries = req.body;
  updatedEntries.seller_id = req.mongoId;
  try {
    const sellOrderDoc = await SellOrder.findById(sellOrderId);
    if (!sellOrderDoc) {
      return res
        .status(501)
        .json({ success: false, message: "Invalid sell order id" });
    }
    //update the order
    const updatedOrder = await SellOrder.findByIdAndUpdate(
      sellOrderId,
      updatedEntries,
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Sell order Updated successfully",
        sellOrderUpdated: updatedOrder,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

router.delete("/delete-sell-order/:orderId", async (req, res) => {
  const sellOrderId = req.params.orderId;
  try {
    const sellOrderDoc = await SellOrder.findById(sellOrderId);
    if (!sellOrderDoc) {
      return res
        .status(501)
        .json({ success: false, message: "Invalid sell order id" });
    }
    await SellOrder.findByIdAndDelete(sellOrderId);

    res
      .status(200)
      .json({ success: true, message: "Sell order deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

//////////////////////////////////SELL ORDER ROUTES COMPLETED///////////////////////////////////////////////////////////////

//Placing a Buy order
router.post("/buy-order", fetchPerson, async (req, res) => {
  //must have auth-token in header
  const buyOrder = req.body;
  const buyer_id = req.mongoId;

  try {
    const userDoc = await User.findById(buyer_id);
    // console.log(userDoc);
    buyOrder.buyer_name = userDoc.name;
    buyOrder.buyer_id = buyer_id;
    const newOrder = new BuyOrder(buyOrder);
    await newOrder.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Buy order placed successfully",
        buyOrder: newOrder,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/get-buy-order/:orderId", async (req, res) => {
  const buyOrderId = req.params.orderId;
  try {
    const buyOrderDoc = await BuyOrder.findById(buyOrderId);
    if (!buyOrderDoc) {
      return res
        .status(501)
        .json({ success: false, message: "Invalid buy order id" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Buy order retrieved successfully",
        buyOrder: buyOrderDoc,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

//updated only the new fields
router.put("/update-buy-order/:orderId", fetchPerson, async (req, res) => {
  const buyOrderId = req.params.orderId;
  const updatedEntries = req.body;
  updatedEntries.buyer_id = req.mongoId;
  try {
    const buyOrderDoc = await BuyOrder.findById(buyOrderId);
    if (!buyOrderDoc) {
      return res
        .status(501)
        .json({ success: false, message: "Invalid buy order id" });
    }
    //update the order
    const updatedOrder = await BuyOrder.findByIdAndUpdate(
      buyOrderId,
      updatedEntries,
      { new: true }
    );
    console.log(updatedOrder);
    res
      .status(200)
      .json({
        success: true,
        message: "Buy order Updated successfully",
        sellOrderUpdated: updatedOrder,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

router.delete("/delete-buy-order/:orderId", async (req, res) => {
  const buyOrderId = req.params.orderId;
  try {
    const buyOrderDoc = await BuyOrder.findById(buyOrderId);
    if (!buyOrderDoc) {
      return res
        .status(501)
        .json({ success: false, message: "Invalid buy order id" });
    }
    await SellOrder.findByIdAndDelete(buyOrderId);

    res
      .status(200)
      .json({ success: true, message: "Buy order deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/get-rental-services", async (req, res) => {
  try {
    const allServices = await RentalService.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Rental services fetched successfully",
        allServices: allServices,
      });
  } catch (error) {
    console.log(error.message, " ", "get-rental-service");
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/add-rental-service", fetchPerson, async (req, res) => {
  //name is added automatically from auth-token
  const data = req.body;
  const userId = req.mongoId;
  try {
    const userDoc = await User.findById(userId);
    data.owner = userDoc.name;
    const rentalService = await RentalService(data);
    await rentalService.save();
    res
      .status(200)
      .json({ success: true, message: "Rental service added successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/sell-orders", async (req, res) => {
  try {
    const allSellOrders = await SellOrder.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Retrieved all sell orders",
        sellOrders: allSellOrders,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/buy-orders", async (req, res) => {
  try {
    const allBuyOrders = await BuyOrder.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Retrieved all buy orders",
        buyOrders: allBuyOrders,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
