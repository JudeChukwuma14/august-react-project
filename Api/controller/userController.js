const User = require("../models/userModel");
const Seller = require("../models/sellerModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const userData = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User created successfully",
            userData,
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        const isMacth = await bcrypt.compareSync(password, user.password);
        if (!isMacth) {
            return res.status(400).json({ message: "Invaild credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res
            .cookie("AUGUSTREACT", token, { expiresIn: "1hr" })
            .status(200)
            .json({ data: req.body, token: token, message: "Login successfull" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};

const signupSeller = async (req, res) => {
    try {
        const { storeName, email, phoneNumber, address, categories, password } =
            req.body;
        if (!storeName || !email || !phoneNumber || !categories || !password || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await Seller.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Seller already exists" });
        }
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const userData = await Seller.create({
            storeName,
            email,
            password: hashedPassword,
            phoneNumber,
            categories,
            address

        });
        return res.status(201).json({
            message: "Seller created successfully",
            userData,
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};

const loginSeller = async (req, res) => {
    const { email, password } = req.body;
    try {
        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(400).json({ message: "seller not found" });
        }

        const isMacth = await bcrypt.compareSync(password, seller.password);
        if (!isMacth) {
            return res.status(400).json({ message: "Invaild credentials" });
        }

        const token = jwt.sign({ id: seller._id }, process.env.JWT);
        res
            .cookie("AUGUSTREACT", token, { expiresIn: "1hr" })
            .status(200)
            .json({ data: req.body, token: token, message: `Welcome ${seller.storeName}`});
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
module.exports = {
    signUp,
    login,
    signupSeller,
    loginSeller

};
