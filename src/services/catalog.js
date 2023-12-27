import Instance from '../utils/singleton';
class Catalog {

    static axios = Instance.getInstanceService().axiosInstance();
    static helper = Instance.getInstanceHelper();

    static async getAllCatalog(search, limit = 20, offset = 1, column = 'id', sort = 'desc') {
        try {
            let query = `&limit=${limit}&offset=${offset}&column=${column}&sort=${sort}`;

            if (search) {
                query += `&search=${search}`;
            }

            const res = await this.axios.get('/catalog?' + query, {
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
            const res = await this.axios.put('/catalog/change-status', { id, status }, {
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

    static async createCatalog(param) {
        try {
            const res = await this.axios.post('/catalog', param, {
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

    static async updateCatalog(param) {
        try {
            const res = await this.axios.put('/catalog', param, {
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

export default Catalog;