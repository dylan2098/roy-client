import Auth from "./auth";
import Users from './users';
import Catalog from './catalog';
import Group from './group';
import Config from './config';
import Product from './product';
import Category from "./category";
import Pricebook from './pricebook';
import Store from './store';

class Services {
    static getInstanceAuth() {
        return Auth;
    }

    static getInstanceUser() {
        return Users;
    }

    static getInstanceCatalog() {
        return Catalog;
    }

    static getInstanceGroup() {
        return Group;
    }

    static getInstanceConfig() {
        return Config;
    }

    static getInstanceProduct() {
        return Product;
    }

    static getInstanceCategory() {
        return Category;
    }

    static getInstancePricebook() {
        return Pricebook;
    }

    static getInstanceStore() {
        return Store;
    }
}

export default Services;