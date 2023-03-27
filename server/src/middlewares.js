const jwt = require("jsonwebtoken");

// My models
const User = require("./databases/models/User");

const fetchPerson = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Token is invalid"});
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.mongoId = data.person.mongoId;
    next();
  } catch (error) {
    res.status(401).send({success: false, message: "Invalid token"});
  }
};

module.exports = {
  fetchPerson
};
