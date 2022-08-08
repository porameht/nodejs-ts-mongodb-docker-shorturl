"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = exports.handleRedirect = exports.createShortUrl = void 0;
const shortUrl_model_1 = __importDefault(require("../models/shortUrl.model"));
const analytics_model_1 = __importDefault(require("../models/analytics.model"));
function createShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the destination from the request body
        const { destination } = req.body;
        // Create a shortUrl
        const newUrl = yield shortUrl_model_1.default.create({ destination });
        // Return the shortUrl
        return res.send(newUrl);
    });
}
exports.createShortUrl = createShortUrl;
function handleRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { shortId } = req.params;
        const short = yield shortUrl_model_1.default.findOne({ shortId }).lean();
        if (!short) {
            return res.sendStatus(404);
        }
        analytics_model_1.default.create({ shortUrl: short._id });
        return res.redirect(short.destination);
    });
}
exports.handleRedirect = handleRedirect;
function getAnalytics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield analytics_model_1.default.find({}).lean();
        return res.send(data);
    });
}
exports.getAnalytics = getAnalytics;
