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
var Pool = require("pg").Pool;
var pcon = require("../db-manager/poolconf");
var sql = require("../db-manager/sql-scripts");
var _a = require("../data-processors/helper"), insertFields = _a.insertFields, profileMapper = _a.profileMapper;
var DBmanager = /** @class */ (function () {
    function DBmanager() {
        var _this = this;
        this._poolW = new Pool(pcon.configPostgres);
        this.getStrResultset = function (arr) {
            return arr.map(function (el) {
                return JSON.stringify(el);
            });
        };
        this.insertPost = function (postData) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql.sqlins.values[0] = postData.title;
                        sql.sqlins.values[1] = postData.text;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._poolW.query(sql.sqlins)];
                    case 2:
                        res = _a.sent();
                        console.log("Post insert has been successfully processed");
                        // console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1.stack);
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.insertUpdateProfileCheck = function (vkId, firstName, lastName, pickedYear) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[0] = vkId;
                        sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[1] = firstName;
                        sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[2] = lastName;
                        sql.SQL_INSERT_UPDATE_PROFILES.values[0] = vkId;
                        sql.SQL_INSERT_UPDATE_PROFILES.values[1] = firstName;
                        sql.SQL_INSERT_UPDATE_PROFILES.values[2] = lastName;
                        sql.SQL_INSERT_UPDATE_PROFILES.values[3] = pickedYear;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILES)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILES_CHECK)];
                    case 3:
                        res = _a.sent();
                        console.log("Check flag for vk profile has been successfully processed for profile: " + vkId + ", first name: " + firstName + ", last name: " + lastName);
                        // console.log(res);
                        return [2 /*return*/, res];
                    case 4:
                        e_2 = _a.sent();
                        console.error(e_2.stack);
                        throw e_2;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.insertUpdateProfileCheckSingle = function (vkId, firstName, lastName) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[0] = vkId;
                        sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[1] = firstName;
                        sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[2] = lastName;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILES_CHECK)];
                    case 2:
                        res = _a.sent();
                        if (res.rowCount > 0) {
                            console.log("Check flag for vk profile has been successfully processed for profile: " + vkId + ", first name: " + firstName + ", last name: " + lastName);
                            return [2 /*return*/, { returnCode: "SUCCESS" }];
                        }
                        else {
                            return [2 /*return*/, { returnCode: "NOT_UPDATED" }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3.stack);
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.insertUpdateProfile = function (profile) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_4, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("insertUpdateProfile enter");
                        if (!profile.deactivated) return [3 /*break*/, 4];
                        console.log("Profile " + profile.vk_id + " is deactivated");
                        sql.SQL_UPDATE_PROFILE_DEACTIVATED.values[0] = profile.deactivated;
                        sql.SQL_UPDATE_PROFILE_DEACTIVATED.values[1] = profile.vk_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._poolW.query(sql.SQL_UPDATE_PROFILE_DEACTIVATED)];
                    case 2:
                        res = _a.sent();
                        if (res.rowCount > 0) {
                            console.log("Deactivated profile " + profile.vk_id + " has been successfully updated in DB");
                            return [2 /*return*/, { returnCode: "SUCCESS" }];
                        }
                        console.log("Deactivated profile " + profile.vk_id + " has NOT been updated in DB");
                        return [2 /*return*/, { returnCode: "NOT_UPDATED" }];
                    case 3:
                        e_4 = _a.sent();
                        console.error(e_4.stack);
                        throw e_4;
                    case 4:
                        //console.log(profile);
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[0] = profile.sex;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[1] = profile.vk_id;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[2] = profile.first_name;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[3] = profile.last_name;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[4] = profile.counters_followers;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[5] = profile.counters_friends;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[6] = profile.counters_photos;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[7] = profile.last_seen;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[8] = profile.city;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[9] = profile.birth_date;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[10] = profile.is_closed;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA.values[11] = profile.deactivated;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILE_DATA)];
                    case 6:
                        res = _a.sent();
                        if (res.rowCount > 0) {
                            console.log("Profile " + profile.vk_id + " has been successfully updated in DB");
                            return [2 /*return*/, { returnCode: "SUCCESS" }];
                        }
                        console.log("Profile " + profile.vk_id + " has NOT been updated in DB");
                        return [2 /*return*/, { returnCode: "NOT_UPDATED" }];
                    case 7:
                        e_5 = _a.sent();
                        console.error(e_5.stack);
                        throw e_5;
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.insertUpdateProfileTest = function (profile) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("insertUpdateProfileTest enter");
                        //console.log(profile);
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[0] = profile.sex;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[1] = profile.vk_id;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[2] = profile.first_name;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[3] = profile.last_name;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[4] =
                            profile.counters_followers;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[5] =
                            profile.counters_friends;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[6] = profile.counters_photos;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[7] = profile.last_seen;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[8] = profile.city;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[9] = profile.is_closed;
                        sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST.values[10] = profile.birth_date;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST)];
                    case 2:
                        res = _a.sent();
                        if (res.rowCount > 0) {
                            console.log("Profile " + profile.vk_id + " has been successfully updated in DB");
                            return [2 /*return*/, { returnCode: "SUCCESS" }];
                        }
                        console.log("Profile " + profile.vk_id + " has NOT been updated in DB");
                        return [2 /*return*/, { returnCode: "NOT_UPDATED" }];
                    case 3:
                        e_6 = _a.sent();
                        console.error(e_6.stack);
                        throw e_6;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.selectProfielsCheck = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: selectProfielsCheck enter");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_SELECT_PROFILES_CHECK)];
                    case 2:
                        res = _a.sent();
                        // console.log('Raw data: '+'\n');
                        // console.log(res);
                        res = this.getStrResultset(res.rows);
                        // console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_7 = _a.sent();
                        console.error(e_7.stack);
                        throw e_7;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.selectVkIdsProfiles = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: selectVkIdsProfiles enter");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_SELECT_VK_ID_PROFILES_ALL)];
                    case 2:
                        res = _a.sent();
                        // console.log('Raw data: '+'\n');
                        // console.log(res);
                        res = this.getStrResultset(res.rows);
                        // console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_8 = _a.sent();
                        console.error(e_8.stack);
                        throw e_8;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.selectVkIdsProfilesRaw = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: selectVkIdsProfiles enter");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_SELECT_VK_ID_PROFILES_BATCH)];
                    case 2:
                        res = _a.sent();
                        // console.log('Raw data: '+'\n');
                        // console.log(res);
                        //res = this.getStrResultset(res.rows);
                        // console.log(res);
                        return [2 /*return*/, res.rows];
                    case 3:
                        e_9 = _a.sent();
                        console.error(e_9.stack);
                        throw e_9;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.selectProfielSingleCheck = function (profileId) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: selectProfielSingleCheck enter");
                        sql.SQL_SELECT_PROFILE_SINGLE_CHECK.values[0] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_SELECT_PROFILE_SINGLE_CHECK)];
                    case 2:
                        res = _a.sent();
                        //console.log('Raw data: '+'\n');
                        //console.log(res);
                        res = this.getStrResultset(res.rows);
                        // console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_10 = _a.sent();
                        console.error(e_10.stack);
                        throw e_10;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.selectProfileDataExtended = function (profileId) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: selectProfileDataExtended enter");
                        res = [];
                        sql.SQL_SELECT_MULTIPLE_PROFILE_DATA_EXTENDED.values[0] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._poolW.query(sql.SQL_SELECT_MULTIPLE_PROFILE_DATA_EXTENDED)];
                    case 2:
                        res = _a.sent();
                        //console.log('Raw data: '+'\n');
                        //console.log(res);
                        res = this.getStrResultset(res.rows);
                        // console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_11 = _a.sent();
                        console.error(e_11.stack);
                        throw e_11;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getProfileById = function (profileId) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: getProfileById enter");
                        sql.SQL_SELECT_PROFILES_BY_ID.values[0] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_SELECT_PROFILES_BY_ID)];
                    case 2:
                        res = _a.sent();
                        //console.log('Raw data: '+'\n');
                        //console.log(res);
                        res = this.getStrResultset(res.rows);
                        // console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_12 = _a.sent();
                        console.error(e_12.stack);
                        throw e_12;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateFavoriteMark = function (bool, profileId) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: updateFavoriteMark enter");
                        sql.SQL_UPDATE_PROFILE_IS_FAVORITE.values[0] = bool;
                        sql.SQL_UPDATE_PROFILE_IS_FAVORITE.values[1] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_UPDATE_PROFILE_IS_FAVORITE)];
                    case 2:
                        res = _a.sent();
                        console.log("Profile " + profileId + " has been marked, is_favorite value: " + bool);
                        if (res.rowCount > 0) {
                            console.log("Profile " + profileId + " has been successfully updated in DB");
                            return [2 /*return*/, { returnCode: "SUCCESS" }];
                        }
                        console.log("Profile " + profileId + " has NOT been updated in DB");
                        return [2 /*return*/, { returnCode: "NOT_UPDATED" }];
                    case 3:
                        e_13 = _a.sent();
                        // console.error(e.stack);
                        throw e_13;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateRelatedMark = function (bool, profileId) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: updateRelatedMark enter");
                        sql.SQL_UPDATE_PROFILE_IS_RELATED.values[0] = bool;
                        sql.SQL_UPDATE_PROFILE_IS_RELATED.values[1] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_UPDATE_PROFILE_IS_RELATED)];
                    case 2:
                        res = _a.sent();
                        console.log("Profile " + profileId + " has been marked, is_related value: " + bool);
                        if (res.rowCount > 0) {
                            console.log("Profile " + profileId + " has been successfully updated in DB");
                            return [2 /*return*/, { returnCode: "SUCCESS" }];
                        }
                        console.log("Profile " + profileId + " has NOT been updated in DB");
                        return [2 /*return*/, { returnCode: "NOT_UPDATED" }];
                    case 3:
                        e_14 = _a.sent();
                        // console.error(e.stack);
                        throw e_14;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateBirthYearProfile = function (year, profileId) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: updateBirthYearProfile enter");
                        sql.SQL_UPDATE_PROFILE_BIRTH_YEAR.values[0] = year;
                        sql.SQL_UPDATE_PROFILE_BIRTH_YEAR.values[1] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_UPDATE_PROFILE_BIRTH_YEAR)];
                    case 2:
                        res = _a.sent();
                        console.log("Profile " + profileId + " has been updated, birth year: " + year);
                        if (res.rowCount > 0) {
                            console.log("Profile " + profileId + " has been successfully updated in DB");
                            return [2 /*return*/, { returnCode: "SUCCESS" }];
                        }
                        console.log("Profile " + profileId + " has NOT been updated in DB");
                        return [2 /*return*/, { returnCode: "NOT_UPDATED" }];
                    case 3:
                        e_15 = _a.sent();
                        // console.error(e.stack);
                        throw e_15;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateEstimation = function (estimation, profileId) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: selectProfielSingleCheck enter");
                        sql.SQL_UPDATE_PROFILE_CHECK_ESTIMATION.values[0] = estimation;
                        sql.SQL_UPDATE_PROFILE_CHECK_ESTIMATION.values[1] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_UPDATE_PROFILE_CHECK_ESTIMATION)];
                    case 2:
                        res = _a.sent();
                        console.log("Profile " + profileId + " has been estimated, estimation value: " + estimation);
                        //console.log(res);
                        //res = this.getStrResultset(res);
                        // console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_16 = _a.sent();
                        // console.error(e.stack);
                        throw e_16;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateCorrelationEst = function (correlationEst, profileId) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: selectProfielSingleCheck enter");
                        sql.SQL_UPDATE_PROFILE_CHECK_CORRELATION_EST.values[0] = correlationEst;
                        sql.SQL_UPDATE_PROFILE_CHECK_CORRELATION_EST.values[1] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_UPDATE_PROFILE_CHECK_CORRELATION_EST)];
                    case 2:
                        res = _a.sent();
                        //console.log('Raw data: '+'\n');
                        //console.log(res);
                        //res = this.getStrResultset(res);
                        //console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_17 = _a.sent();
                        console.error(e_17.stack);
                        throw e_17;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateHasChild = function (profileId, bool) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: updateHasChild enter");
                        sql.SQL_UPDATE_PROFILE_CHECK_HAS_CHILD.values[0] = bool;
                        sql.SQL_UPDATE_PROFILE_CHECK_HAS_CHILD.values[1] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_UPDATE_PROFILE_CHECK_HAS_CHILD)];
                    case 2:
                        res = _a.sent();
                        console.log("Has child property of profile " + profileId + " has been changed to " + bool);
                        //console.log(res);
                        //res = this.getStrResultset(res);
                        //console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_18 = _a.sent();
                        console.error(e_18.stack);
                        throw e_18;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateIsInRelationship = function (profileId, bool) { return __awaiter(_this, void 0, void 0, function () {
            var res, e_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: updateHasChild enter");
                        sql.SQL_UPDATE_PROFILE_CHECK_IS_IN_RELATIONSHIP.values[0] = bool;
                        sql.SQL_UPDATE_PROFILE_CHECK_IS_IN_RELATIONSHIP.values[1] = profileId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.SQL_UPDATE_PROFILE_CHECK_IS_IN_RELATIONSHIP)];
                    case 2:
                        res = _a.sent();
                        console.log("Is in relationship property of profile " + profileId + " has been changed to " + bool);
                        //console.log(res);
                        //res = this.getStrResultset(res);
                        //console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_19 = _a.sent();
                        console.error(e_19.stack);
                        throw e_19;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.selectPosts = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, e_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DBmanager: selectPosts enter");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        res = [];
                        return [4 /*yield*/, this._poolW.query(sql.sqlSelectActualPosts)];
                    case 2:
                        res = _a.sent();
                        console.log("Raw data: " + "\n");
                        //console.log(res);
                        res = this.getStrResultset(res.rows);
                        //console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_20 = _a.sent();
                        console.error(e_20.stack);
                        throw e_20;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return DBmanager;
}());
exports.DBmanager = DBmanager;
