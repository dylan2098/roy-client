import Instance from '../utils/singleton';
class Pricebook {

    static axios = Instance.getInstanceService().axiosInstance();
    static helper = Instance.getInstanceHelper();

    static async getAllPricebook() {
        try {

            const res = await this.axios.get('/pricebook/all-pricebooks', {
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


    static async getAllPricebook(search, limit = 20, offset = 1, column = 'id', sort = 'desc') {
        try {
            let query = `&limit=${limit}&offset=${offset}&column=${column}&sort=${sort}`;

            if (search) {
                query += `&search=${search}`;
            }

            const res = await this.axios.get('/pricebook?' + query, {
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
            const res = await this.axios.put('/pricebook/change-status', { id, status }, {
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

    static async createPricebook(param) {
        try {
            const res = await this.axios.post('/pricebook', param, {
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

    static async updatePricebook(param) {
        try {
            const res = await this.axios.put('/pricebook', param, {
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

export default Pricebook;