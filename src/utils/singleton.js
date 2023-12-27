import Regex from "./regex";
import Service from './service';
import HashIds from './hashids';
import Helper from './helper';
import Language from './language';

class Instance {
    static getInstanceService() {
        return Service;
    }

    static getInstanceRegex() {
        return Regex;
    }

    static getInstanceHashIds() {
        return HashIds;
    }

    static getInstanceHelper() {
        return Helper;
    }

    static getInstaceLanguage() {
        return Language;
    }
}


export default Instance;