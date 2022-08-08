"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const port = config_1.default.get("port");
const app = (0, express_1.default)();
// parse application/json
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log(`Application in running at http://localhost:${port}`);
    (0, db_1.default)();
    (0, routes_1.default)(app);
});
