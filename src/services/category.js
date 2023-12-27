import Instance from '../utils/singleton';
class Category {

    static axios = Instance.getInstanceService().axiosInstance();
    static helper = Instance.getInstanceHelper();

    static async getAll() {
        try {
            const res = await this.axios.get('/category', {
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

export default Category;