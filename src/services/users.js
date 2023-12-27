import Instance from '../utils/singleton';
class Users {

    static axios = Instance.getInstanceService().axiosInstance();
    static helper = Instance.getInstanceHelper();

    static async getAllUsers(search, limit = 20, offset = 1, column = 'id', sort = 'desc') {
        try {
            let query = `&limit=${limit}&offset=${offset}&column=${column}&sort=${sort}&type=user`;

            if (search) {
                query += `&search=${search}`;
            }

            const res = await this.axios.get('/users?' + query, {
                headers: {
                    Authorization: this.helper.getToken()
                },
                timeout: 10000
            });

            return res.data;
        } catch (error) {
            throw Error(error.message);
        }
    }

    static async getAllUsersAdmin(search, limit = 20, offset = 1, column = 'id', sort = 'desc') {
        try {
            let query = `&limit=${limit}&offset=${offset}&column=${column}&sort=${sort}&type=admin`;

            if (search) {
                query += `&search=${search}`;
            }

            const res = await this.axios.get('/users?' + query, {
                headers: {
                    Authorization: this.helper.getToken()
                },
                timeout: 10000
            });

            return res.data;
        } catch (error) {
            throw Error(error.message);
        }
    }


    static async changeStatus(id, status) {
        try {
            const res = await this.axios.put('/users/change-status', { id, status }, {
                headers: {
                    Authorization: this.helper.getToken()
                },
                timeout: 10000
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }

    static async createUser(param) {
        try {
            const res = await this.axios.post('/users', param, {
                headers: {
                    Authorization: this.helper.getToken()
                },
                timeout: 10000
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }

    static async updateUser(param) {
        try {
            const res = await this.axios.put('/users', param, {
                headers: {
                    Authorization: this.helper.getToken()
                },
                timeout: 10000
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }

    static async deleteUser(id) {
        try {
            const res = await this.axios.delete('/users', {
                data: { id },
                headers: {
                    Authorization: this.helper.getToken()
                },
                timeout: 10000
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }
}

export default Users;