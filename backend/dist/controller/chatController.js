"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const config_1 = require("../config");
const pusher_1 = __importDefault(require("pusher"));
const pusher = new pusher_1.default({
    appId: config_1.appId,
    key: config_1.key,
    secret: config_1.secret,
    cluster: "eu",
    useTLS: true
});
const Chat = (req, res) => {
    pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
    });
    // Save messages
    res.status(201).json([]);
};
exports.Chat = Chat;
