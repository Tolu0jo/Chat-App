"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const chatRoute_1 = __importDefault(require("./routes/chatRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ['http://127.0.0.1:5173'] }));
app.use((0, morgan_1.default)('dev'));
app.use('/api', chatRoute_1.default);
const port = 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
