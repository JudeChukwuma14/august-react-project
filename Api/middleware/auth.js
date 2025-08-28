const jwt = require("jsonwebtoken")
const Seller = require("../models/sellerModel")
const User = require("../models/userModel")


const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.AUGUSTREACT || req.headers.authorizaton?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT)
        if (decoded.role === "seller") {
            const seller = await Seller.findById(decoded.id)
            if (!seller) {
                return res.status(401).json({ message: "Unauthorized: Seller not found" })
            }
            req.user = seller
            req.role = "seller"
        } else if (decoded.role === "user") {
            const user = await User.findById(decoded.id)
            if (!user) {
                return res.status(401).json({ message: "Unauthorized: User not found" })
            }
            req.user = user
            req.role = "user"
        } else {
            return res.status(401).json({ message: "Unauthorized: Invalid role" })
        }
        next()
    } catch (error) {
        res.status(401).json({ message: "Invaild token ", error: error.message })
    }
}

const restrictToSeller = (req, res, next) => {
    if (req.role !== "seller") {
        return res.status(403).json({ message: "Forbidden: Only sellers can perform this action" })
    }
    next()
}

module.exports = {authenticate, restrictToSeller}