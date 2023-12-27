import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Login from "layouts/auth/Login.js";
import Manage from "layouts/admin/Manage";
import System from "layouts/admin/System"
import UserIndex from './layouts/admin/UserManager';
import CatalogIndex from './layouts/admin/CatalogManager';
import GroupIndex from './layouts/admin/GroupManager';
import UserSystemIndex from './layouts/admin/UserSystem';
import ConfigSystemIndex from './layouts/admin/ConfigSystem';
import ProductIndex from "./layouts/admin/ProductManager";
import PricebookIndex from "./layouts/admin/PricebookManager";
import StoreIndex from "./layouts/admin/StoreManager";

var routes = [
  {
    path: "/home",
    name: "DASHBOARD",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    status: 1
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    status: 1
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    status: 0
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    status: 0
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    status: 0
  },
  {
    path: "/login",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    status: 0
  },
  {
    path: "/management",
    name: "MANAGEMENT",
    icon: "ni ni-key-25 text-info",
    component: Manage,
    layout: "/admin",
    status: 1
  },
  {
    path: "/system",
    name: "SYSTEM",
    icon: "fas fa-cogs text-success",
    component: System,
    layout: "/admin",
    status: 1
  },
  {
    path: "/users",
    name: "USERS",
    icon: "fas fa-cogs text-success",
    component: UserIndex,
    layout: "/admin",
    status: 0
  },
  {
    path: "/catalog",
    name: "CATALOG",
    icon: "fas fa-cogs text-success",
    component: CatalogIndex,
    layout: "/admin",
    status: 0
  },
  {
    path: "/groups",
    name: "GROUPS",
    icon: "fas fa-cogs text-success",
    component: GroupIndex,
    layout: "/admin",
    status: 0
  },
  {
    path: "/user-system",
    name: "USER_SYSTEM",
    icon: "fas fa-cogs text-success",
    component: UserSystemIndex,
    layout: "/admin",
    status: 0
  },
  {
    path: "/config",
    name: "CONFIG_SYSTEM",
    icon: "fas fa-cogs text-success",
    component: ConfigSystemIndex,
    layout: "/admin",
    status: 0
  },
  {
    path: "/products",
    name: "PRODUCTS",
    icon: "fas fa-cogs text-success",
    component: ProductIndex,
    layout: "/admin",
    status: 0
  },
  {
    path: "/pricebook",
    name: "PRICEBOOK",
    icon: "fas fa-cogs text-success",
    component: PricebookIndex,
    layout: "/admin",
    status: 0
  },
  {
    path: "/store",
    name: "STORE",
    icon: "fas fa-cogs text-success",
    component: StoreIndex,
    layout: "/admin",
    status: 0
  }
];
export default routes;
