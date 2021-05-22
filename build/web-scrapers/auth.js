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
var isLoggedInVK = function () { return __awaiter(_this, void 0, void 0, function () {
    var urlVk, browser, page, flag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlVk = "https://vk.com/";
                return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(urlVk, { waitUntil: "networkidle2" })];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        if (document.querySelector("#index_email") !== null) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    })];
            case 4:
                flag = _a.sent();
                return [4 /*yield*/, browser.close()];
            case 5:
                _a.sent();
                return [2 /*return*/, flag];
        }
    });
}); };
var loginToVkVisual = function () { return __awaiter(_this, void 0, void 0, function () {
    var urlVk, br, browser, _a, _b, page, isLoggedIn, content, i, content;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                urlVk = "https://vk.com/";
                return [4 /*yield*/, puppeteer.launch({ headless: false })];
            case 1:
                br = _d.sent();
                _b = (_a = puppeteer).connect;
                _c = {};
                return [4 /*yield*/, br.wsEndpoint()];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_c.browserWSEndpoint = _d.sent(),
                        _c.ignoreHTTPSErrors = true,
                        _c)])];
            case 3:
                browser = _d.sent();
                return [4 /*yield*/, browser.newPage()];
            case 4:
                page = _d.sent();
                return [4 /*yield*/, page.setViewport({ width: 1200, height: 720 })];
            case 5:
                _d.sent();
                //переходим на заданный урл и ждем пока загрузится
                return [4 /*yield*/, page.goto(urlVk, { waitUntil: "networkidle2" })];
            case 6:
                //переходим на заданный урл и ждем пока загрузится
                _d.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        if (document.querySelector("#index_email") !== null) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    })];
            case 7:
                isLoggedIn = _d.sent();
                if (!!isLoggedIn) return [3 /*break*/, 17];
                //если не залогинен вводим данные для аутентификации
                return [4 /*yield*/, page.type("#index_email", "bieterchi@yandex.ru")];
            case 8:
                //если не залогинен вводим данные для аутентификации
                _d.sent();
                return [4 /*yield*/, page.type("#index_pass", "Trqgv500")];
            case 9:
                _d.sent();
                return [4 /*yield*/, page.click("#index_login_button")];
            case 10:
                _d.sent();
                //ждем перенаправления
                return [4 /*yield*/, page.waitForNavigation({ waitUntil: "networkidle2" })];
            case 11:
                //ждем перенаправления
                _d.sent();
                content = "html";
                i = 200;
                _d.label = 12;
            case 12:
                if (!(i < 220)) return [3 /*break*/, 16];
                return [4 /*yield*/, page.goto("https://vk.com/id191105" + i, {
                        waitUntil: "networkidle2"
                    })];
            case 13:
                _d.sent();
                return [4 /*yield*/, page.content()];
            case 14:
                //загружаем html контент и передаем в DOM парсер
                content = _d.sent();
                getDOM.getDOMtest(content);
                _d.label = 15;
            case 15:
                i++;
                return [3 /*break*/, 12];
            case 16: return [3 /*break*/, 20];
            case 17: return [4 /*yield*/, page.goto("https://vk.com/id191105119", {
                    waitUntil: "networkidle2"
                })];
            case 18:
                _d.sent();
                return [4 /*yield*/, page.content()];
            case 19:
                content = _d.sent();
                getDOM.getDOMtest(content);
                _d.label = 20;
            case 20: return [2 /*return*/];
        }
    });
}); };
exports.loginToVkVisual = loginToVkVisual;
