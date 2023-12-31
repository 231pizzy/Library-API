"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/create', userController_1.createUser);
router.post('/login', userController_1.loginUser);
router.get('/getall', userController_1.getAll);
router.put('/update', userController_1.updateUser);
router.delete('/delete', userController_1.deleteUser);
exports.default = router;
