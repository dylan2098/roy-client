import Instance from '../utils/singleton';

class Auth {
    static async login(data) {
        const res = await Instance.getInstanceService().axiosInstance().post('/users/login', data);
        if (res && res.data) {
            return res.data;
        }
        return false;
    }

    static setStorage(data) {
        localStorage.royClient_accessToken = 'Bearer ' + data.accessToken;
        localStorage.royClient_refreshToken = data.refreshToken;
        localStorage.royClient_displayName = data.firstName + ' ' + data.lastName;
        localStorage.royClient_id = data.userId;
        localStorage.royClient_role = data.role;
    }

    static logout() {
        localStorage.removeItem("royClient_accessToken");
        localStorage.removeItem("royClient_refreshToken");
        localStorage.removeItem("royClient_displayName");
        localStorage.removeItem("royClient_id");
        localStorage.removeItem("royClient_role");
    }
}

export default Auth;