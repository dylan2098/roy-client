import Instance from '../utils/singleton';
class Catalog {

    static axios = Instance.getInstanceService().axiosInstance();
    static helper = Instance.getInstanceHelper();

    static async getAllProduct(search, limit = 20, offset = 1, column = 'productId', sort = 'desc') {
        try {
            let query = `&limit=${limit}&offset=${offset}&column=${column}&sort=${sort}`;

            if (search) {
                query += `&search=${search}`;
            }

            const res = await this.axios.get('/product?' + query, {
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


    static async getAllProductNotPaging() {
        try {
            const res = await this.axios.get('/product/all-product', {
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
            const res = await this.axios.put('/product/change-status', { id, status }, {
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


    static async createProduct(param) {
        try {
            const res = await this.axios.post('/product', param, {
                headers: {
                    Authorization: this.helper.getToken()
                }
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }


    static async updateProduct(param) {
        try {
            const res = await this.axios.put('/product', param, {
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


    static async deleteImage(publicId) {
        try {
            const res = await this.axios.post('/product/delete-image', { publicId }, {
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


    static async uploadImage(fileImage) {
        try {
            const res = await this.axios.post('/product/upload-image', { image: fileImage }, {
                headers: {
                    Authorization: this.helper.getToken()
                }
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }


    static async getProductsMaster() {
        try {
            const res = await this.axios.get('/product/product-master', {
                headers: {
                    Authorization: this.helper.getToken()
                }
            })

            return res.data;
        } catch (error) {
            throw Error(error.message);
        }
    }


    static async getProductsVariant() {
        try {
            const res = await this.axios.get('/product/product-variant', {
                headers: {
                    Authorization: this.helper.getToken()
                }
            })

            return res.data;
        } catch (error) {
            throw Error(error.message);
        }
    }


    // start handle product price
    static async getProductPrice(productId) {
        try {
            const res = await this.axios.get('/product-price/' + productId, {
                headers: {
                    Authorization: this.helper.getToken()
                }
            })

            return res.data;
        } catch (error) {
            throw Error(error.message);
        }
    }


    static async createProductPrice(param) {
        try {
            const res = await this.axios.post('/product-price', param, {
                headers: {
                    Authorization: this.helper.getToken()
                }
            });

            return res.data;

        } catch (error) {
            throw Error(error.message);
        }
    }

    static async updateProductPrice(param) {
        try {
            const res = await this.axios.put('/product-price', param, {
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