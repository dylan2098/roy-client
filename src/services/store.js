import Instance from '../utils/singleton';
class Store {

    static axios = Instance.getInstanceService().axiosInstance();
    static helper = Instance.getInstanceHelper();

    static async getStores(search, limit = 20, offset = 1, column = 'id', sort = 'desc') {
        try {
            let query = `&limit=${limit}&offset=${offset}&column=${column}&sort=${sort}`;

            if (search) {
                query += `&search=${search}`;
            }

            const res = await this.axios.get('/store?' + query, {
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
            const res = await this.axios.put('/store/change-status', { id, status }, {
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

    static async createStore(param) {
        try {
            const res = await this.axios.post('/store', param, {
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

    static async updateStore(param) {
        try {
            const res = await this.axios.put('/store', param, {
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

export default Store;