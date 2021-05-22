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
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var getDOM = function (html) { return __awaiter(_this, void 0, void 0, function () {
    var document, movieDataMeta, isNullValues, isNullValues2, parseData, obj_1;
    return __generator(this, function (_a) {
        document = new JSDOM(html).window.document;
        movieDataMeta = {
            title: document.querySelector("span[class=moviename-title-wrapper]"),
            originalTitle: document.querySelector(".alternativeHeadline"),
            rating: document.querySelector("span[class=rating_ball]"),
            filmId: document.querySelector("head > meta:nth-child(36)"),
            year: document.querySelector("#infoTable > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > a"),
            country: document.querySelector("table.info > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1)"),
            imgsrc: document.querySelector(".popupBigImage > img:nth-child(1)"),
            genre: document.querySelector("table.info > tbody:nth-child(1) > tr:nth-child(11) > td:nth-child(2) > span:nth-child(1)"),
            description: document.querySelector(".film-synopsys"),
            actor_1: document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)"),
            actor_2: document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)"),
            actor_3: document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)"),
            actor_3: document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)"),
            actor_3: document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1)"),
            director: document.querySelector("table.info > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > a:nth-child(1)")
        };
        isNullValues = function (obj) {
            var title = obj.title, rating = obj.rating, filmId = obj.filmId, year = obj.year, country = obj.country, imgsrc = obj.imgsrc;
            if (title !== null &&
                rating !== null &&
                filmId !== null &&
                year !== null &&
                country !== null &&
                imgsrc !== null) {
                return false;
            }
            else {
                return true;
            }
        };
        isNullValues2 = function (obj) {
            for (var key in obj) {
                if (obj[key] === null) {
                    return true;
                }
            }
            return false;
        };
        parseData = function () {
            console.log("Starting to parse data from HTML for " + document.querySelector("head > meta:nth-child(33)").content);
            var actor_1 = document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)").textContent;
            var actor_2 = document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)").textContent;
            var actor_3 = document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)").textContent;
            var actor_4 = document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)").textContent;
            var actor_5 = document.querySelector("#actorList > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1)").textContent;
            var mainActors = [];
            mainActors.push(actor_1, actor_2, actor_3, actor_4, actor_5);
            return {
                title: document.querySelector("span[class=moviename-title-wrapper]")
                    .innerHTML,
                originalTitle: document.querySelector(".alternativeHeadline").textContent,
                rating: document.querySelector("span[class=rating_ball]").innerHTML,
                filmId: document
                    .querySelector("head > meta:nth-child(36)")
                    .content.split("/")[4] === "player"
                    ? document
                        .querySelector("head > meta:nth-child(35)")
                        .content.split("/")[4]
                    : document
                        .querySelector("head > meta:nth-child(36)")
                        .content.split("/")[4],
                year: document.querySelector("#infoTable > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > a").innerHTML,
                country: document
                    .querySelector("table.info > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1)")
                    .textContent.replace("                     ", " ")
                    .replace("\n", "")
                    .replace("                ", ""),
                imgsrc: document.querySelector(".popupBigImage > img:nth-child(1)").src,
                genre: document.querySelector("table.info > tbody:nth-child(1) > tr:nth-child(11) > td:nth-child(2) > span:nth-child(1)").textContent,
                description: document.querySelector(".film-synopsys").textContent,
                mainActors: mainActors,
                director: document.querySelector("table.info > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > a:nth-child(1)").textContent
            };
        };
        if (!isNullValues2(movieDataMeta)) {
            obj_1 = parseData();
            return [2 /*return*/, obj_1];
        }
        else
            return [2 /*return*/, null];
        return [2 /*return*/];
    });
}); };
var getDOMtest = function (html) { return __awaiter(_this, void 0, void 0, function () {
    var document;
    return __generator(this, function (_a) {
        document = new JSDOM(html).window.document;
        if (document.querySelector("#content > h5") === null &&
            document.querySelector(".page_name")) {
            console.log(document.querySelector(".page_name").innerHTML +
                " " +
                document.querySelector("head > link:nth-child(30)").href);
        }
        else if (document.querySelector("#content > h5")) {
            console.log("Blocked: " + document.querySelector("head > link:nth-child(30)").href);
        }
        return [2 /*return*/];
    });
}); };
exports.getDOM = getDOM;
exports.getDOMtest = getDOMtest;
