var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var puppeteer = require("puppeteer");
var getDOM = require("../dom-parsers/dom-parsers");
var loginToVk = require("./auth");
var urlFilmTransform = function (param) {
    return "https://www.kinopoisk.ru/film/" + param + "/";
};
var randomIdGen = function () {
    var randomId = Math.floor(Math.random() * 1200) + 1;
    return randomId;
};
var getWebScrapedData = function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, getFilmPageContent, rawdata, movieData;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                getFilmPageContent = function (id) { return __awaiter(_this, void 0, void 0, function () {
                    var rawFilmData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, page.goto(urlFilmTransform(id), { waitUntil: "networkidle2" })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, page.content()];
                            case 2:
                                rawFilmData = _a.sent();
                                return [2 /*return*/, rawFilmData];
                        }
                    });
                }); };
                return [4 /*yield*/, getFilmPageContent(316)];
            case 3:
                rawdata = _a.sent();
                return [4 /*yield*/, getDOM.getDOM(rawdata)];
            case 4:
                movieData = _a.sent();
                return [4 /*yield*/, browser.close()];
            case 5:
                _a.sent();
                return [2 /*return*/, movieData];
        }
    });
}); };
var getWebScrapedDataArray = function (startId, endId) { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, resultset, getFilmPageContent_2, rd, md;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                resultset = [];
                getFilmPageContent_2 = function (id) { return __awaiter(_this, void 0, void 0, function () {
                    var content;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, page.goto(urlFilmTransform(id), { waitUntil: "networkidle2" })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, page.content()];
                            case 2:
                                content = _a.sent();
                                return [2 /*return*/, content];
                        }
                    });
                }); };
                i = startId;
                _a.label = 3;
            case 3:
                if (!(i < endId)) return [3 /*break*/, 7];
                return [4 /*yield*/, getFilmPageContent_2(i)];
            case 4:
                rd = _a.sent();
                return [4 /*yield*/, getDOM.getDOM(rd)];
            case 5:
                md = _a.sent();
                resultset.push(md);
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, browser.close()];
            case 8:
                _a.sent();
                return [2 /*return*/, resultset];
        }
    });
}); };
var getWebScrapedDataArrayTest = function (startId, endId) { return __awaiter(_this, void 0, void 0, function () {
    var waitTimeout, browser, page;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                waitTimeout = function (ms) {
                    return new Promise(function (resolve) {
                        setTimeout(resolve, ms);
                    });
                };
                return [4 /*yield*/, puppeteer.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto("https://www.kinopoisk.ru/", { waitUntil: "networkidle2" })];
            case 3:
                _a.sent();
                return [4 /*yield*/, waitTimeout(5000)];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.goto(urlFilmTransform(startId), { waitUntil: "networkidle2" })];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getVkData = function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, getFilmPageContent, rawdata, movieData;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                getFilmPageContent = function (id) { return __awaiter(_this, void 0, void 0, function () {
                    var rawFilmData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, page.goto(urlFilmTransform(id), { waitUntil: "networkidle2" })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, page.content()];
                            case 2:
                                rawFilmData = _a.sent();
                                return [2 /*return*/, rawFilmData];
                        }
                    });
                }); };
                return [4 /*yield*/, getFilmPageContent(316)];
            case 3:
                rawdata = _a.sent();
                return [4 /*yield*/, getDOM.getDOM(rawdata)];
            case 4:
                movieData = _a.sent();
                return [4 /*yield*/, browser.close()];
            case 5:
                _a.sent();
                return [2 /*return*/, movieData];
        }
    });
}); };
module.exports.getWebScrapedData = getWebScrapedData;
module.exports.getWebScrapedDataArray = getWebScrapedDataArray;
module.exports.getWebScrapedDataArrayTest = getWebScrapedDataArrayTest;
