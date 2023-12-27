import setting from '../settings/config.json';

class Helper {
    constructor() { }

    // get project name
    static getProjectName() {
        return setting.PROJECT_NAME;
    }

    // get gen salt
    static getGenSalt() {
        return setting.GEN_SALT;
    }


    // get max age
    static getMaxAge() {
        return setting.MAX_AGE;
    }


    // get secret key
    static getSecretKey() {
        return setting.SECRET_KEY;
    }


    // get token
    static getToken() {
        return localStorage.royClient_accessToken;
    }


    // get display name
    static getDisplayName() {
        return localStorage.royClient_displayName;
    }


    // get token
    static getRefreshToken() {
        return localStorage.royClient_refreshToken;
    }


    // get token
    static getClientId() {
        return localStorage.royClient_id;
    }


    // get role
    static getClientRole() {
        return localStorage.royClient_role;
    }


    // get limit in table
    static getLimitInTable() {
        return setting.LIMIT_IN_TABLE;
    }

    static isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

export default Helper;