var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var webscraper = require('./web-scrapers/web-scrapers');
var loginToVk = require('./web-scrapers/auth');
var cors = require('cors');
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var fetch = require('node-fetch');
var _a = require('./data-processors/data-processors'), waitTimeout = _a.waitTimeout, counterNotNull = _a.counterNotNull, processProfileDataFromSearch = _a.processProfileDataFromSearch;
var flatten = require('flat');
var port = 8333;
var DBmanager = require('./db-manager/db-manager').DBmanager;
var _b = require('./data-processors/helper'), profileMapper = _b.profileMapper, profileMapperTs = _b.profileMapperTs;
var _c = require('./access-data/token'), access_token_2 = _c.access_token_2, access_token_actual = _c.access_token_actual;
var db = new DBmanager();
var getMoviesData = function (x, y) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, webscraper.getWebScrapedDataArray(x, y)];
            case 1:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/, result];
        }
    });
}); };
app.use(cors());
app.use(express.json());
app.get('/getdefmov', function (req, res) {
    var currentDateStr = new Date()
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ' ');
    console.log(currentDateStr + '\n');
    console.log("GET getdefmov event");
    getMoviesData(407, 415).then(function (result) {
        res.send(result);
    });
    console.log("Server is listening on port " + port);
});
app.get('/getdefmov/:from/:to', function (req, res) {
    var _a = req.params, from = _a.from, to = _a.to;
    var currentDateStr = new Date()
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ' ');
    console.log(currentDateStr + '\n');
    console.log("GET getdefmov event with range from: " + from + ", to: " + to);
    getMoviesData(from, to).then(function (result) {
        res.send(result);
    });
    console.log("Server is listening on port " + port);
});
app.get('/vkget/:ida', function (req, res) {
    var ida = req.params.ida;
    var _apibase = "https://api.vk.com/method/";
    console.log("GET vkget event for id: " + ida);
    var getInfoByUserId = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(_apibase + "users.get?user_ids=" + id + "&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token=" + access_token_actual + "&v=5.103")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("Something was wrong");
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    data = flatten(data.response[0]);
                    console.log(data);
                    return [2 /*return*/, data];
            }
        });
    }); };
    getInfoByUserId(ida).then(function (data) {
        res.send(data);
    });
});
app.get('/vkget/matchprofiles/:from/:q', function (req, res) {
    var _a = req.params, from = _a.from, q = _a.q, hash = _a.hash;
    var processingFlag = true;
    var _apibase = "https://api.vk.com/method/";
    console.log(new Date().toISOString().replace('T', ' ').replace('Z', ' '));
    console.log("GET matchprofiles event for range ID: " + from + " with quantity " + q);
    var getInfoByUserId = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(_apibase + "users.get?user_ids=" + id + "&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token=" + access_token_actual + "&v=5.103")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("Something was wrong");
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    var getAsyncData = function (f, t) { return __awaiter(_this, void 0, void 0, function () {
        var resultarray, matcharray, currentCounter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resultarray = [];
                    matcharray = [];
                    currentCounter = 0;
                    i = f;
                    _a.label = 1;
                case 1:
                    if (!(i < t)) return [3 /*break*/, 4];
                    return [4 /*yield*/, waitTimeout(600)];
                case 2:
                    _a.sent();
                    getInfoByUserId(i).then(function (data) {
                        currentCounter++;
                        //process.stdout.write(`Processed ${currentCounter} account(s)...`);
                        // console.clear();
                        // console.log(`Collected ${currentCounter} account(s)...`)
                        console.log("Data collected for the profile " + i);
                        resultarray.push(data.response[0]);
                    });
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, waitTimeout(3000)];
                case 5:
                    _a.sent();
                    console.log("Starting to process data...");
                    return [4 /*yield*/, waitTimeout(3000)];
                case 6:
                    _a.sent();
                    matcharray = processProfileDataSimple(resultarray);
                    return [2 /*return*/, matcharray];
            }
        });
    }); };
    var endId = parseInt(from, 10) + parseInt(q, 10);
    getAsyncData(from, endId).then(function (data) {
        console.log("Data collected and processed. Matches (" + counterNotNull(data).length + "): " + counterNotNull(data));
        var matchesShort = counterNotNull(data);
        res.send(data);
    });
});
app.get('/dbmanager/batchprofilesenrichment', function (req, res) {
    console.log("Starting to batch loading to DB");
    var _apibase = "https://api.vk.com/method/";
    var getInfoByUserId = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(_apibase + "users.get?user_ids=" + id + "&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token=" + access_token_actual + "&v=5.103")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("Something was wrong");
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var profile, profiles, result, counter, i, e_1, i, e_2, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    profiles = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 16, , 17]);
                    return [4 /*yield*/, db.selectVkIdsProfilesRaw()];
                case 2:
                    result = _a.sent();
                    counter = 0;
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < result.length)) return [3 /*break*/, 9];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 7, , 8]);
                    console.log(i + " collecting data for profile " + result[i].vk_id);
                    return [4 /*yield*/, waitTimeout(350)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, getInfoByUserId(result[i].vk_id)];
                case 6:
                    profile = _a.sent();
                    console.log(profile.id);
                    console.log("Filling profiles from VK data");
                    profiles.push(profile);
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    throw e_1;
                case 8:
                    i++;
                    return [3 /*break*/, 3];
                case 9:
                    i = 0;
                    _a.label = 10;
                case 10:
                    if (!(i < profiles.length)) return [3 /*break*/, 15];
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 13, , 14]);
                    console.log("Preparing to fill db with collected data");
                    return [4 /*yield*/, db.insertUpdateProfile(profileMapperTs(flatten(profiles[i].response[0])))];
                case 12:
                    _a.sent();
                    console.log("Filling profiles to DB " + i);
                    return [3 /*break*/, 14];
                case 13:
                    e_2 = _a.sent();
                    throw e_2;
                case 14:
                    i++;
                    return [3 /*break*/, 10];
                case 15:
                    console.log("Process of filling db with profiles data has been done;");
                    res.send(JSON.stringify({ profilesLength: profiles.length }));
                    return [3 /*break*/, 17];
                case 16:
                    e_3 = _a.sent();
                    res.send(e_3);
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    }); })();
});
app.get('/matchfromsearch/:query/:qnt/:offset/:f/:t/:city/:year/:month/:day', function (req, res) {
    var _a = req.params, query = _a.query, qnt = _a.qnt, offset = _a.offset, f = _a.f, t = _a.t, city = _a.city, year = _a.year, month = _a.month, day = _a.day;
    var reqObj = {
        query: query,
        qnt: qnt,
        offset: offset,
        f: f,
        t: t,
        city: city,
        year: year,
        month: month,
        day: day
    };
    if (qnt === '0') {
        qnt = 15;
    }
    console.log("GET-request with params query:" + query + ", qnt: " + qnt + ". offset: " + offset + ", age from: " + f + ", age to: " + t + ", city: " + city + ", year: " + year + ", month: " + month + ", day: " + day);
    var url2 = "https://api.vk.com/method/users.search?sort=0&";
    var urlEnd = "access_token_2=" + access_token_actual + "&v=5.103";
    var url3 = '';
    var isQ = false;
    for (var key in reqObj) {
        if (!reqObj[key]) {
            if (key === 'query') {
                isQ = true;
                qurl = key + "=" + encodeURIComponent(reqObj[key]) + "&";
                url3 = url2 + qurl;
            }
            if (!isQ) {
                qurl = '';
                url3 = url2 + (key + "=" + reqObj[key] + "&");
                isQ = true;
            }
            else {
                url3 += key + "=" + reqObj[key] + "&";
            }
        }
    }
    url3 = url3 + urlEnd;
    console.log("GET matchfromsearch event with params " + query + "/" + qnt + "/" + offset + "/" + f + "/" + t + "/" + city);
    var searchWithQuery = function (q) { return __awaiter(_this, void 0, void 0, function () {
        var headers, url, body, request, resp, res_1, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };
                    url = '';
                    if (q === 'null' && city === 'null' && year === 'null') {
                        url = "https://api.vk.com/method/users.search?sort=0&offset=" + offset + "&sex=1&count=" + qnt + "&country=1&age_from=" + f + "&age_to=" + t + "&birth_month=" + month + "&birth_day=" + day + "&has_photo=1&access_token=" + access_token_actual + "&v=5.103";
                    }
                    if (q === 'null' && city !== 'null' && year === 'null') {
                        url = "https://api.vk.com/method/users.search?sort=0&offset=" + offset + "&sex=1&count=" + qnt + "&country=1&city=" + city + "&age_from=" + f + "&age_to=" + t + "&birth_month=" + month + "&birth_day=" + day + "&has_photo=1&access_token=" + access_token_actual + "&v=5.103";
                    }
                    if (q !== 'null' && city === 'null' && year === 'null') {
                        url = "https://api.vk.com/method/users.search?q=" + encodeURIComponent(q) + "&sort=0&offset=" + offset + "&sex=1&count=" + qnt + "&country=1&age_from=" + f + "&age_to=" + t + "&birth_month=" + month + "&birth_day=" + day + "&has_photo=1&access_token=" + access_token_actual + "&v=5.103";
                    }
                    if (q !== 'null' && city !== 'null' && year === 'null') {
                        url = "https://api.vk.com/method/users.search?q=" + encodeURIComponent(q) + "&sort=0&offset=" + offset + "&sex=1&count=" + qnt + "&country=1&city=" + city + "&age_from=" + f + "&age_to=" + t + "&birth_month=" + month + "&birth_day=" + day + "&has_photo=1&access_token=" + access_token_actual + "&v=5.103";
                    }
                    if (q !== 'null' && city !== 'null' && year !== 'null') {
                        url = "https://api.vk.com/method/users.search?q=" + encodeURIComponent(q) + "&sort=0&offset=" + offset + "&sex=1&count=" + qnt + "&country=1&city=" + city + "&age_from=" + f + "&birth_month=" + month + "&birth_day=" + day + "&birth_year=" + year + "&has_photo=1&access_token=" + access_token_actual + "&v=5.103";
                    }
                    if (q === 'null' && city !== 'null' && year !== 'null') {
                        url = "https://api.vk.com/method/users.search?sort=0&offset=" + offset + "&sex=1&count=" + qnt + "&country=1&city=" + city + "&birth_month=" + month + "&birth_day=" + day + "&birth_year=" + year + "&has_photo=1&access_token=" + access_token_actual + "&v=5.103";
                    }
                    if (q !== 'null' && city === 'null' && year !== 'null') {
                        url = "https://api.vk.com/method/users.search?q=" + encodeURIComponent(q) + "&sort=0&offset=" + offset + "&sex=1&count=" + qnt + "&country=1&birth_month=" + month + "&birth_day=" + day + "&birth_year=" + year + "&has_photo=1&access_token=" + access_token_actual + "&v=5.103";
                    }
                    if (q === 'null' && city === 'null' && year !== 'null') {
                        url = "https://api.vk.com/method/users.search?sort=0&offset=" + offset + "&sex=1&count=" + qnt + "&country=1&birth_month=" + month + "&birth_day=" + day + "&birth_year=" + year + "&has_photo=1&access_token=" + access_token_actual + "&v=5.103";
                    }
                    console.log("URL for request is : " + url);
                    body = {
                        method: 'users.search',
                        age_from: '18',
                        age_to: '32',
                        count: '5',
                        country: '1',
                        has_photo: '1',
                        offset: '0',
                        q: q,
                        sex: '1',
                        access_token_2: access_token_2,
                        v: '5.103'
                    };
                    request = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: body
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 3:
                    res_1 = _a.sent();
                    return [2 /*return*/, res_1];
                case 4:
                    e_4 = _a.sent();
                    throw e_4;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getInfoByUserId = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var _apibase, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _apibase = "https://api.vk.com/method/";
                    return [4 /*yield*/, fetch(_apibase + "users.get?user_ids=" + id + "&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token=" + access_token_actual + "&v=5.103")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("Something was wrong");
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    var getAsyncData = function (id, count) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, waitTimeout(350)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, getInfoByUserId(id).then(function (data) {
                            console.log("Data collected for the profile " + id + " (" + count + ")");
                            return data.response[0];
                        })];
            }
        });
    }); };
    var main = function (q) { return __awaiter(_this, void 0, void 0, function () {
        var getAsyncSearhProfilesData, result, resultArray, smArr;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getAsyncSearhProfilesData = function (arr) { return __awaiter(_this, void 0, void 0, function () {
                        var arrayForProcessMatches, currentCounter, i, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    arrayForProcessMatches = [];
                                    currentCounter = 1;
                                    i = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(i < arr.length)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, getAsyncData(arr[i].id, currentCounter)];
                                case 2:
                                    data = _a.sent();
                                    currentCounter++;
                                    arrayForProcessMatches.push(data);
                                    _a.label = 3;
                                case 3:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/, arrayForProcessMatches];
                            }
                        });
                    }); };
                    return [4 /*yield*/, searchWithQuery(q)];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, getAsyncSearhProfilesData(result.response.items)];
                case 2:
                    resultArray = _a.sent();
                    console.log('resultArray');
                    smArr = [];
                    smArr = processProfileDataFromSearch(resultArray);
                    return [2 /*return*/, smArr];
            }
        });
    }); };
    main(query).then(function (resp) {
        var currentDateStr = new Date()
            .toISOString()
            .replace('T', ' ')
            .replace('Z', ' ');
        console.log('\n' + currentDateStr);
        console.log("Result for GET-request with params query:" + query + ", qnt: " + qnt + ". offset: " + offset + ", age from: " + f + ", age to: " + t + ", city: " + city + ", year: " + year + ", month: " + month +
            '\n');
        console.log("Searched profiles has been processed!");
        console.log("Matches (" + counterNotNull(resp).length + "): " + counterNotNull(resp));
        res.send(resp);
    });
});
app.post('/insertpost', function (req, res) {
    var postData = req.body;
    console.log("Request for insert post:");
    console.log(postData);
    (function (postData) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.insertPost(postData)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    res.send(e_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(postData);
});
app.get('/insertcheck/:profileId/:firstName/:lastName/:pickedYear', function (req, res) {
    var _a = req.params, profileId = _a.profileId, firstName = _a.firstName, lastName = _a.lastName;
    var pickedYear = req.params.pickedYear;
    pickedYear === '0' ? (pickedYear = '') : (pickedYear = pickedYear);
    console.log("Request for insert check for profile id: " + profileId + ", first_name: " + firstName + ", last_name: " + lastName + ", picked_year: " + pickedYear);
    if (!profileId) {
        throw Error("Webscraper.Excepton: profileId is not valid!");
    }
    (function (profileId, firstName, lastName, pickedYear) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.insertUpdateProfileCheck(profileId, firstName, lastName, pickedYear)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    res.send(e_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileId, firstName, lastName, pickedYear);
});
app.get('/dbmanager/insertchecksingle/:profileId/:firstName/:lastName', function (req, res) {
    var _a = req.params, profileId = _a.profileId, firstName = _a.firstName, lastName = _a.lastName;
    console.log("Request for insert single check for profile id: " + profileId + ", first_name: " + firstName + ", last_name: " + lastName);
    if (!profileId) {
        throw Error("Webscraper.Excepton: profileId is not valid!");
    }
    (function (profileId, firstName, lastName) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.insertUpdateProfileCheckSingle(profileId, firstName, lastName)];
                case 1:
                    result = _a.sent();
                    res.send(JSON.stringify(result));
                    return [3 /*break*/, 3];
                case 2:
                    e_7 = _a.sent();
                    res.send(e_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileId, firstName, lastName);
});
app.get('/dbmanager/updestim/:estimation/:profileId', function (req, res) {
    var _a = req.params, estimation = _a.estimation, profileId = _a.profileId;
    console.log("Request for update estimation for profile id: " + profileId + ", estimation: " + estimation);
    if (!profileId || !estimation) {
        throw Error("Webscraper.Excepton: profileId or estimation is not valid!");
    }
    (function (profileId, estimation) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.updateEstimation(estimation, profileId)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_8 = _a.sent();
                    res.send(e_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileId, estimation);
});
app.get('/dbmanager/updfavor/:bool/:profileId', function (req, res) {
    var _a = req.params, bool = _a.bool, profileId = _a.profileId;
    console.log("Request for update favorite mark for profile id: " + profileId + ", bool: " + bool);
    if (!profileId || !bool) {
        throw Error("Webscraper.Excepton: profileId or bool is not valid!");
    }
    (function (profileId, bool) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.updateFavoriteMark(bool, profileId)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_9 = _a.sent();
                    res.send(e_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileId, bool);
});
app.get('/dbmanager/updrelated/:bool/:profileId', function (req, res) {
    var _a = req.params, bool = _a.bool, profileId = _a.profileId;
    console.log("Request for update related mark for profile id: " + profileId + ", bool: " + bool);
    if (!profileId || !bool) {
        throw Error("Webscraper.Excepton: profileId or bool is not valid!");
    }
    (function (profileId, bool) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.updateRelatedMark(bool, profileId)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_10 = _a.sent();
                    res.send(e_10);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileId, bool);
});
app.get('/dbmanager/updbirthyear/:year/:profileId', function (req, res) {
    var _a = req.params, year = _a.year, profileId = _a.profileId;
    console.log("Request for update birth year for profile id: " + profileId + ", bool: " + year);
    if (!profileId || !year) {
        throw Error("Webscraper.Excepton: profileId or year is not valid!");
    }
    (function (profileId, year) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.updateBirthYearProfile(year, profileId)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_11 = _a.sent();
                    res.send(e_11);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileId, year);
});
app.get('/dbmanager/updcorrelationest/:correst/:profileId', function (req, res) {
    var _a = req.params, correst = _a.correst, profileId = _a.profileId;
    console.log("Request for update estimation for profile id: " + profileId + ", correlation estimation: " + correst);
    if (!profileId || !correst) {
        throw Error("Webscraper.Excepton: profileId or estimation is not valid!");
    }
    (function (profileId, correst) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.updateCorrelationEst(correst, profileId)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_12 = _a.sent();
                    res.send(e_12);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileId, correst);
});
app.get('/dbmanager/upd/haschild/:bool/:profileId', function (req, res) {
    var _a = req.params, bool = _a.bool, profileId = _a.profileId;
    console.log("Request for update has_child for profile id: " + profileId + ", boolean: " + bool);
    if (!profileId || !bool) {
        throw Error("Webscraper.Excepton: profileId or bool is not valid!");
    }
    (function (profileId, bool) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.updateHasChild(profileId, bool)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_13 = _a.sent();
                    res.send(e_13);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileId, bool);
});
app.get('/dbmanager/upd/isinrelationship/:bool/:profileId', function (req, res) {
    var _a = req.params, bool = _a.bool, profileId = _a.profileId;
    console.log("Request for update is_in_relationship for profile id: " + profileId + ", boolean: " + bool);
    if (!profileId || !bool) {
        throw Error("Webscraper.Excepton: profileId or bool is not valid!");
    }
    (function (profileId, bool) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.updateIsInRelationship(profileId, bool)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_14 = _a.sent();
                    res.send(e_14);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileId, bool);
});
app.get('/dbmanager/searchcheckedprofiles', function (req, res) {
    console.log("Request for search check profiles");
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var result, e_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.selectProfielsCheck()];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_15 = _a.sent();
                    res.send(e_15);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })();
});
app.get('/dbmanager/searchcheckedprofile/:profileid', function (req, res) {
    var profileid = req.params.profileid;
    console.log("Request for insert check for profile id: " + profileid);
    if (!profileid) {
        throw Error("Webscraper.Excepton: profileId is not valid!");
    }
    console.log("Request for search check profile");
    (function (profileid) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.selectProfielSingleCheck(profileid)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_16 = _a.sent();
                    res.send(e_16);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileid);
});
app.post('/dbmanager/insertupdprofile', function (req, res) {
    var profile = req.body;
    console.log("Received POST request with data");
    console.log("" + JSON.stringify(req.headers));
    profile = profileMapper(profile);
    (function (profile) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Async function is invoking DB update for profile");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db.insertUpdateProfile(profile)];
                case 2:
                    result = _a.sent();
                    res.send(JSON.stringify(result));
                    return [3 /*break*/, 4];
                case 3:
                    e_17 = _a.sent();
                    res.send(e_17);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); })(profile);
});
app.get('/dbmanager/searchsingleprofiledb/:profileid', function (req, res) {
    var profileid = req.params.profileid;
    console.log("Request for search in db for profile id: " + profileid);
    if (!profileid) {
        throw Error("Webscraper.Excepton: profileId is not valid!");
    }
    (function (profileid) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.getProfileById(profileid)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_18 = _a.sent();
                    res.send(e_18);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileid);
});
app.get('/dbmanager/selectprofiledataextended/:profileid', function (req, res) {
    var profileid = req.params.profileid;
    console.log("Request for search in db for profile id: " + profileid + " extended data");
    if (!profileid) {
        throw Error("Webscraper.Excepton: profileId is not valid!");
    }
    (function (profileid) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.selectProfileDataExtended(profileid)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_19 = _a.sent();
                    res.send(e_19);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })(profileid);
});
app.get('/dbmanager/searchposts', function (req, res) {
    console.log("Request for searchposts has been received");
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var result, e_20;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.selectPosts()];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_20 = _a.sent();
                    res.send(e_20);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })();
});
app.get('/searchtest', function (req, res) {
    var _apibase = "https://api.vk.com/method/";
    console.log("GET searchtest event");
    var searhUsersTest = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(_apibase + "users.search?sort=1&offset=0&count=100&fields=sex,bdate,city,home_town,has_photo,counters,followers_count&city=1&sex=1&status=1&age_from=23&age_to=30&has_photo=1&can_access_closed=true&access_token=" + access_token_actual + "&v=5.103")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("Something was wrong");
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/, data];
            }
        });
    }); };
    searhUsersTest().then(function (result) {
        res.send(result);
    });
});
app.ws('/matchprofiles', function (ws, req) {
    ws.on('message', function (msg) {
        console.log('WS RAW request is ');
        console.log(msg);
        var request = JSON.parse(msg);
        var startId = request.startId, quantity = request.quantity, id = request.id;
        var _apibase = "https://api.vk.com/method/";
        console.log(new Date().toISOString().replace('T', ' ').replace('Z', ' '));
        console.log("WS matchprofiles request " + id + " for range ID: " + startId + " with quantity " + quantity);
        var getInfoByUserId = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(_apibase + "users.get?user_ids=" + id + "&fields=sex,bdate,sex,city,contacts,country,exports,followers_count,has_photo,photo_max,photo_max_orig,photo_100,online,exports,counters,relation,last_seen&access_token=" + access_token_actual + "&v=5.103")];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                            throw new Error("Something was wrong");
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); };
        var getAsyncData = function (f, t) { return __awaiter(_this, void 0, void 0, function () {
            var resultarray, matcharray, currentCounter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultarray = [];
                        matcharray = [];
                        currentCounter = 0;
                        i = f;
                        _a.label = 1;
                    case 1:
                        if (!(i < t)) return [3 /*break*/, 4];
                        return [4 /*yield*/, waitTimeout(600)];
                    case 2:
                        _a.sent();
                        getInfoByUserId(i)
                            .then(function (data) {
                            currentCounter++;
                            console.log("WS Data collected for the profile " + i);
                            resultarray.push(data.response[0]);
                        })["catch"](function (error) {
                            console.log(error);
                            throw error;
                        });
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, waitTimeout(3000)];
                    case 5:
                        _a.sent();
                        console.log("Starting to process data...");
                        return [4 /*yield*/, waitTimeout(3000)];
                    case 6:
                        _a.sent();
                        // console.log('resultarray for CHECK')
                        // console.log(resultarray)
                        matcharray = processProfileDataSimple(resultarray);
                        return [2 /*return*/, matcharray];
                }
            });
        }); };
        var endId = parseInt(startId, 10) + parseInt(quantity, 10);
        getAsyncData(startId, endId).then(function (data) {
            console.log("WS Data collected and processed. Matches (" + counterNotNull(data).length + "): " + counterNotNull(data));
            console.log(data);
            console.log(JSON.stringify(__assign({ id: id }, data)));
            //res.send(data)
            // console.log('matchesShort')
            //console.log(matchesShort)
            ws.send(JSON.stringify(__assign({ id: id }, data)));
        });
    });
});
app.ws('/test', function (ws, req) {
    var getUniqueId = function () {
        var s4 = function () {
            return Math.floor((1 + Math.random()) * 0x100000)
                .toString(16)
                .substring(1);
        };
        return s4() + s4() + '-' + s4();
    };
    var clientId = getUniqueId();
    console.log("WS: connection has been established " + clientId);
    var message = { clientId: clientId };
    ws.send(JSON.stringify(message));
    ws.on('message', function (msg) {
        console.log(msg);
        ws.send(JSON.stringify(__assign(__assign({}, message), { prop: 'another message' })));
    });
});
app.get('/loginvk', function (req, res) {
    console.log("GET loginvk event");
    loginToVk.loginToVkVisual();
});
app.listen(port, function () {
    console.log("Server is listening on port " + port);
});
