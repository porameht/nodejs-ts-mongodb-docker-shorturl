"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortUrl_controller_1 = require("../controller/shortUrl.controller");
const validateResourse_1 = __importDefault(require("../middleware/validateResourse"));
const createShortUrl_schema_1 = __importDefault(require("../schemas/createShortUrl.schema"));
function routes(app) {
    app.get("/healthcheck", (req, res) => {
        return res.send("App is healthy");
    });
    app.post("/api/url", (0, validateResourse_1.default)(createShortUrl_schema_1.default), shortUrl_controller_1.createShortUrl);
    app.get("/:shortId", shortUrl_controller_1.handleRedirect);
    app.get("/api/analytics", shortUrl_controller_1.getAnalytics);
}
exports.default = routes;
