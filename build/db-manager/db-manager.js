const { Pool } = require("pg");
const pcon = require("../db-manager/poolconf");
const sql = require("../db-manager/sql-scripts");
const { insertFields, profileMapper } = require("../data-processors/helper");
class DBmanager {
    constructor() {
        this._poolW = new Pool(pcon.configPostgres);
        this.getStrResultset = (arr) => {
            return arr.map((el) => {
                return JSON.stringify(el);
            });
        };
        this.insertPost = async (postData) => {
            sql.sqlins.values[0] = postData.title;
            sql.sqlins.values[1] = postData.text;
            try {
                const res = await this._poolW.query(sql.sqlins);
                console.log("Post insert has been successfully processed");
                // console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.insertUpdateProfileCheck = async (vkId, firstName, lastName, pickedYear) => {
            sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[0] = vkId;
            sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[1] = firstName;
            sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[2] = lastName;
            sql.SQL_INSERT_UPDATE_PROFILES.values[0] = vkId;
            sql.SQL_INSERT_UPDATE_PROFILES.values[1] = firstName;
            sql.SQL_INSERT_UPDATE_PROFILES.values[2] = lastName;
            sql.SQL_INSERT_UPDATE_PROFILES.values[3] = pickedYear;
            try {
                let res = await this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILES);
                res = await this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILES_CHECK);
                console.log(`Check flag for vk profile has been successfully processed for profile: ${vkId}, first name: ${firstName}, last name: ${lastName}`);
                // console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.insertUpdateProfileCheckSingle = async (vkId, firstName, lastName) => {
            sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[0] = vkId;
            sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[1] = firstName;
            sql.SQL_INSERT_UPDATE_PROFILES_CHECK.values[2] = lastName;
            try {
                let res = await this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILES_CHECK);
                if (res.rowCount > 0) {
                    console.log(`Check flag for vk profile has been successfully processed for profile: ${vkId}, first name: ${firstName}, last name: ${lastName}`);
                    return { returnCode: "SUCCESS" };
                }
                else {
                    return { returnCode: "NOT_UPDATED" };
                }
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.insertUpdateProfile = async (profile) => {
            let res;
            console.log(`insertUpdateProfile enter`);
            if (profile.deactivated) {
                console.log(`Profile ${profile.vk_id} is deactivated`);
                sql.SQL_UPDATE_PROFILE_DEACTIVATED.values[0] = profile.deactivated;
                sql.SQL_UPDATE_PROFILE_DEACTIVATED.values[1] = profile.vk_id;
                try {
                    res = await this._poolW.query(sql.SQL_UPDATE_PROFILE_DEACTIVATED);
                    if (res.rowCount > 0) {
                        console.log(`Deactivated profile ${profile.vk_id} has been successfully updated in DB`);
                        return { returnCode: "SUCCESS" };
                    }
                    console.log(`Deactivated profile ${profile.vk_id} has NOT been updated in DB`);
                    return { returnCode: "NOT_UPDATED" };
                    // console.log(res);
                }
                catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
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
            try {
                res = await this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILE_DATA);
                if (res.rowCount > 0) {
                    console.log(`Profile ${profile.vk_id} has been successfully updated in DB`);
                    return { returnCode: "SUCCESS" };
                }
                console.log(`Profile ${profile.vk_id} has NOT been updated in DB`);
                return { returnCode: "NOT_UPDATED" };
                // console.log(res);
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.insertUpdateProfileTest = async (profile) => {
            console.log(`insertUpdateProfileTest enter`);
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
            try {
                let res = await this._poolW.query(sql.SQL_INSERT_UPDATE_PROFILE_DATA_TEST);
                if (res.rowCount > 0) {
                    console.log(`Profile ${profile.vk_id} has been successfully updated in DB`);
                    return { returnCode: "SUCCESS" };
                }
                console.log(`Profile ${profile.vk_id} has NOT been updated in DB`);
                return { returnCode: "NOT_UPDATED" };
                // console.log(res);
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.selectProfielsCheck = async () => {
            console.log(`DBmanager: selectProfielsCheck enter`);
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_SELECT_PROFILES_CHECK);
                // console.log('Raw data: '+'\n');
                // console.log(res);
                res = this.getStrResultset(res.rows);
                // console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.selectVkIdsProfiles = async () => {
            console.log(`DBmanager: selectVkIdsProfiles enter`);
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_SELECT_VK_ID_PROFILES_ALL);
                // console.log('Raw data: '+'\n');
                // console.log(res);
                res = this.getStrResultset(res.rows);
                // console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.selectVkIdsProfilesRaw = async () => {
            console.log(`DBmanager: selectVkIdsProfiles enter`);
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_SELECT_VK_ID_PROFILES_BATCH);
                // console.log('Raw data: '+'\n');
                // console.log(res);
                //res = this.getStrResultset(res.rows);
                // console.log(res);
                return res.rows;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.selectProfielSingleCheck = async (profileId) => {
            console.log(`DBmanager: selectProfielSingleCheck enter`);
            sql.SQL_SELECT_PROFILE_SINGLE_CHECK.values[0] = profileId;
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_SELECT_PROFILE_SINGLE_CHECK);
                //console.log('Raw data: '+'\n');
                //console.log(res);
                res = this.getStrResultset(res.rows);
                // console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.selectProfileDataExtended = async (profileId) => {
            console.log(`DBmanager: selectProfileDataExtended enter`);
            let res = [];
            sql.SQL_SELECT_MULTIPLE_PROFILE_DATA_EXTENDED.values[0] = profileId;
            try {
                res = await this._poolW.query(sql.SQL_SELECT_MULTIPLE_PROFILE_DATA_EXTENDED);
                //console.log('Raw data: '+'\n');
                //console.log(res);
                res = this.getStrResultset(res.rows);
                // console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.getProfileById = async (profileId) => {
            console.log(`DBmanager: getProfileById enter`);
            sql.SQL_SELECT_PROFILES_BY_ID.values[0] = profileId;
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_SELECT_PROFILES_BY_ID);
                //console.log('Raw data: '+'\n');
                //console.log(res);
                res = this.getStrResultset(res.rows);
                // console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.updateFavoriteMark = async (bool, profileId) => {
            console.log(`DBmanager: updateFavoriteMark enter`);
            sql.SQL_UPDATE_PROFILE_IS_FAVORITE.values[0] = bool;
            sql.SQL_UPDATE_PROFILE_IS_FAVORITE.values[1] = profileId;
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_UPDATE_PROFILE_IS_FAVORITE);
                console.log(`Profile ${profileId} has been marked, is_favorite value: ${bool}`);
                if (res.rowCount > 0) {
                    console.log(`Profile ${profileId} has been successfully updated in DB`);
                    return { returnCode: "SUCCESS" };
                }
                console.log(`Profile ${profileId} has NOT been updated in DB`);
                return { returnCode: "NOT_UPDATED" };
            }
            catch (e) {
                // console.error(e.stack);
                throw e;
            }
        };
        this.updateRelatedMark = async (bool, profileId) => {
            console.log(`DBmanager: updateRelatedMark enter`);
            sql.SQL_UPDATE_PROFILE_IS_RELATED.values[0] = bool;
            sql.SQL_UPDATE_PROFILE_IS_RELATED.values[1] = profileId;
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_UPDATE_PROFILE_IS_RELATED);
                console.log(`Profile ${profileId} has been marked, is_related value: ${bool}`);
                if (res.rowCount > 0) {
                    console.log(`Profile ${profileId} has been successfully updated in DB`);
                    return { returnCode: "SUCCESS" };
                }
                console.log(`Profile ${profileId} has NOT been updated in DB`);
                return { returnCode: "NOT_UPDATED" };
            }
            catch (e) {
                // console.error(e.stack);
                throw e;
            }
        };
        this.updateBirthYearProfile = async (year, profileId) => {
            console.log(`DBmanager: updateBirthYearProfile enter`);
            sql.SQL_UPDATE_PROFILE_BIRTH_YEAR.values[0] = year;
            sql.SQL_UPDATE_PROFILE_BIRTH_YEAR.values[1] = profileId;
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_UPDATE_PROFILE_BIRTH_YEAR);
                console.log(`Profile ${profileId} has been updated, birth year: ${year}`);
                if (res.rowCount > 0) {
                    console.log(`Profile ${profileId} has been successfully updated in DB`);
                    return { returnCode: "SUCCESS" };
                }
                console.log(`Profile ${profileId} has NOT been updated in DB`);
                return { returnCode: "NOT_UPDATED" };
            }
            catch (e) {
                // console.error(e.stack);
                throw e;
            }
        };
        this.updateEstimation = async (estimation, profileId) => {
            console.log(`DBmanager: selectProfielSingleCheck enter`);
            sql.SQL_UPDATE_PROFILE_CHECK_ESTIMATION.values[0] = estimation;
            sql.SQL_UPDATE_PROFILE_CHECK_ESTIMATION.values[1] = profileId;
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_UPDATE_PROFILE_CHECK_ESTIMATION);
                console.log(`Profile ${profileId} has been estimated, estimation value: ${estimation}`);
                //console.log(res);
                //res = this.getStrResultset(res);
                // console.log(res);
                return res;
            }
            catch (e) {
                // console.error(e.stack);
                throw e;
            }
        };
        this.updateCorrelationEst = async (correlationEst, profileId) => {
            console.log(`DBmanager: selectProfielSingleCheck enter`);
            sql.SQL_UPDATE_PROFILE_CHECK_CORRELATION_EST.values[0] = correlationEst;
            sql.SQL_UPDATE_PROFILE_CHECK_CORRELATION_EST.values[1] = profileId;
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_UPDATE_PROFILE_CHECK_CORRELATION_EST);
                //console.log('Raw data: '+'\n');
                //console.log(res);
                //res = this.getStrResultset(res);
                //console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.updateHasChild = async (profileId, bool) => {
            console.log(`DBmanager: updateHasChild enter`);
            sql.SQL_UPDATE_PROFILE_CHECK_HAS_CHILD.values[0] = bool;
            sql.SQL_UPDATE_PROFILE_CHECK_HAS_CHILD.values[1] = profileId;
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_UPDATE_PROFILE_CHECK_HAS_CHILD);
                console.log(`Has child property of profile ${profileId} has been changed to ${bool}`);
                //console.log(res);
                //res = this.getStrResultset(res);
                //console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.updateIsInRelationship = async (profileId, bool) => {
            console.log(`DBmanager: updateHasChild enter`);
            sql.SQL_UPDATE_PROFILE_CHECK_IS_IN_RELATIONSHIP.values[0] = bool;
            sql.SQL_UPDATE_PROFILE_CHECK_IS_IN_RELATIONSHIP.values[1] = profileId;
            try {
                let res = [];
                res = await this._poolW.query(sql.SQL_UPDATE_PROFILE_CHECK_IS_IN_RELATIONSHIP);
                console.log(`Is in relationship property of profile ${profileId} has been changed to ${bool}`);
                //console.log(res);
                //res = this.getStrResultset(res);
                //console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        this.selectPosts = async () => {
            console.log(`DBmanager: selectPosts enter`);
            try {
                let res = [];
                res = await this._poolW.query(sql.sqlSelectActualPosts);
                console.log("Raw data: " + "\n");
                //console.log(res);
                res = this.getStrResultset(res.rows);
                //console.log(res);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
    }
}
exports.DBmanager = DBmanager;
