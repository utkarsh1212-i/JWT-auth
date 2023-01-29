const jwt = require("jwt");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from Header
      token = req.headers.authorization.split(" ")[1];

      //Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get USer from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized");
    }
}
if(!token){
    res.status(401);
    throw new Error("Not authorized , NO token");

  }
});

module.exports = { protext };
