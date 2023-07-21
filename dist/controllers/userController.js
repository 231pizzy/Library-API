"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAll = exports.loginUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const utility_1 = require("../utilities/utility");
const notification_1 = require("../utilities/notification");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email } = req.body;
        const findUser = await userModel_1.default.findOne({ email });
        if (findUser) {
            return res.status(400).json({
                message: `User already exists`
            });
        }
        ;
        const salt = await (0, utility_1.SaltGenerator)();
        const password = await (0, utility_1.passwordGenerator)(lastName);
        const hashedPassword = await (0, utility_1.hashPassword)(password, salt);
        if (!findUser) {
            let newUser = await userModel_1.default.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: 'Autor',
                books: []
            });
            const mainUser = await userModel_1.default.findOne({ email });
            if (mainUser) {
                const html = (0, notification_1.emailHtml)(email, password);
                await (0, notification_1.sendmail)(`${process.env.GMAIL_USER}`, email, "Welcome", html);
                return res.status(200).json({
                    message: `Account created successfully`,
                    role: mainUser.role
                });
            }
            return res.status(401).json({
                message: `unable to create user`
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: `internal server error`,
            Error: `users/createUser`
        });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: `User does not exists, Kindly sign up`
            });
        }
        if (user) {
            const validate = await bcryptjs_1.default.compare(password, user.password);
            if (!validate) {
                return res.status(400).json({
                    message: `Invalid Password`
                });
            }
            if (validate) {
                const token = await (0, utility_1.tokenGenerator)(`${user._id}`);
                res.cookie(`token`, token);
                return res.status(200).json({
                    message: `login successful`,
                    email: user.email
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            message: `internal server error`,
            Error: `users/loginUser`
        });
    }
};
exports.loginUser = loginUser;
const getAll = async (req, res, next) => {
    try {
        const allUsers = await userModel_1.default.find({});
        if (!allUsers) {
            return res.status(404).json({
                message: `Users not fetched`
            });
        }
        return res.status(200).json({
            message: `All users fetched successfully`,
            allUsers
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `internal server error`,
            Error: `users/getAll`
        });
    }
};
exports.getAll = getAll;
const updateUser = async (req, res, next) => {
    try {
        const { email, firstName, lastName } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: `User does not exist `
            });
        }
        const updatedUser = await userModel_1.default.findOneAndUpdate({ email }, { firstName, lastName });
        if (updatedUser) {
            return res.status(200).json({
                message: `User updated successfully`,
                updatedUser
            });
        }
        return res.status(401).json({
            message: `user update failed`
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `internal server error`,
            Error: `users/updateUser`
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userToDelete = await userModel_1.default.findOneAndDelete({ email });
        if (!userToDelete) {
            return res.status(500).json({
                message: `User not deleted`
            });
        }
        const users = await userModel_1.default.find({});
        return res.status(200).json({
            message: `Deleted successfully`,
            users
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `internal server error`,
            Error: `users/updateUser`
        });
    }
};
exports.deleteUser = deleteUser;
