import Instance from '../utils/singleton';
class Config {

    static axios = Instance.getInstanceService().axiosInstance();
    static Helper = Instance.getInstanceHelper();

    static async getAllConfig(search, limit = 20, offset = 1, column = 'id', sort = 'desc') {
        try {
            let query = `&limit=${limit}&offset=${offset}&column=${column}&sort=${sort}`;

            if (search) {
                query += `&search=${search}`;
            }

            const res = await this.axios.get('/siteconfig?' + query, {
                headers: {
                    Authorization: this.Helper.getToken()
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
            const res = await this.axios.put('/siteconfig/change-status', { id, status }, {
                headers: {
                    Authorization: this.Helper.getToken()
                },
                timeout: 10000
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }

    static async createConfig(param) {
        try {
            const res = await this.axios.post('/siteconfig', param, {
                headers: {
                    Authorization: this.Helper.getToken()
                },
                timeout: 10000
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }

    static async updateConfig(param) {
        try {
            const res = await this.axios.put('/siteconfig', param, {
                headers: {
                    Authorization: this.Helper.getToken()
                },
                timeout: 10000
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }


    static async deleteConfig(id) {
        try {
            const res = await this.axios.delete('/siteconfig', {
                data: { id },
                headers: {
                    Authorization: this.Helper.getToken()
                },
                timeout: 10000
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }
}

export default Config;