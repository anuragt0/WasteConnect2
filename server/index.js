require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json()); // to use req.body

// Mine
const connectToMongoDB = require("./src/databases/config");
connectToMongoDB();

//routes
app.get("/", (req,res)=>{
    res.send("Heyy I am working fine!");
})
app.use("/api/public", require("./src/api/routes/public"));
app.use("/api/user", require("./src/api/routes/user"));


app.listen(5000, ()=>{
    console.log(("Server is listening on port 5000"));
})