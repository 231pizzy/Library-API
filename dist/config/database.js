"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        const connect = mongoose_1.default.connect(`mongodb+srv://taskAndLearning:onGod@atlascluster.verf2tx.mongodb.net/learning`);
        console.log('mongoDb connected successfully');
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDatabase = connectDatabase;
// export default connectDatabase;
