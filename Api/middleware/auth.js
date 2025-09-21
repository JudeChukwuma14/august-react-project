// const jwt = require("jsonwebtoken")
// const Seller = require("../models/sellerModel")
// const User = require("../models/userModel")

// const authenticate = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.AUGUSTREACT ||
//       req.headers.authorization?.split(" ")[1]; // fixed spelling + safe access

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT);

//     if (decoded.role === "seller") {
//       const seller = await Seller.findById(decoded.id);
//       if (!seller) {
//         return res.status(401).json({ message: "Unauthorized: Seller not found" });
//       }
//       req.user = seller;
//       req.role = "seller";
//     } else if (decoded.role === "user") {
//       const user = await User.findById(decoded.id);
//       if (!user) {
//         return res.status(401).json({ message: "Unauthorized: User not found" });
//       }
//       req.user = user;
//       req.role = "user";
//     } else {
//       return res.status(401).json({ message: "Unauthorized: Invalid role" });
//     }

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token", error: error.message });
//   }
// };

// const restrictToSeller = (req, res, next) => {
//     if (req.role !== "seller") {
//         return res.status(403).json({ message: "Forbidden: Only sellers can perform this action" })
//     }
//     next()
// }

// module.exports = {authenticate, restrictToSeller}


const jwt = require("jsonwebtoken")
const Seller = require("../models/sellerModel")
const User = require("../models/userModel")

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies?.AUGUSTREACT ||
      req.headers.authorization?.split(" ")[1];

    // If no token, proceed as guest (don't block the request)
    if (!token) {
      req.user = null;
      req.role = "guest";
      return next(); // Continue without authentication
    }

    const decoded = jwt.verify(token, process.env.JWT);

    if (decoded.role === "seller") {
      const seller = await Seller.findById(decoded.id);
      if (!seller) {
        return res.status(401).json({ message: "Unauthorized: Seller not found" });
      }
      req.user = seller;
      req.role = "seller";
    } else if (decoded.role === "user") {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
      req.user = user;
      req.role = "user";
    } else {
      return res.status(401).json({ message: "Unauthorized: Invalid role" });
    }

    next();
  } catch (error) {
    // For JWT errors, proceed as guest instead of failing completely
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      req.user = null;
      req.role = "guest";
      return next();
    }
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

const requireAuth = (req, res, next) => {
  if (!req.user || req.role === "guest") {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

const restrictToSeller = (req, res, next) => {
  if (req.role !== "seller") {
    return res.status(403).json({ message: "Forbidden: Only sellers can perform this action" })
  }
  next();
}

// Optional: Middleware to require either authenticated user or valid session
const requireUserOrGuestWithSession = (req, res, next) => {
  if (!req.user && !req.body.sessionId) {
    return res.status(400).json({ message: "Session ID required for guest users" });
  }
  next();
};

module.exports = {
  authenticate,
  requireAuth,
  restrictToSeller,
  requireUserOrGuestWithSession
};