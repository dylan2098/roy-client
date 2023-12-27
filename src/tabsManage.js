const tabsManage = [
    {
        type: 1,
        name: "USER_MANAGER",
        status: 1,
        values: [
            {
                key: 1,
                path: "/admin/users",
                name: "USERS",
                icon: "fas fa-user",
                color: "bg-danger",
                status: 1
            },
            {
                key: 2,
                path: "/admin/groups",
                name: "GROUP",
                icon: "fas fa-users",
                color: "bg-yellow",
                status: 1
            },
            {
                key: 3,
                path: "/admin/registered-product",
                name: "REGISTERED_PRODUCTS",
                icon: "fas fa-anchor",
                color: "bg-warning",
                status: 0
            },
        ]
    },
    {
        type: 2,
        name: "PRODUCTS_MANAGER",
        status: 1,
        values: [
            {
                key: 4,
                path: "/admin/products",
                name: "PRODUCTS",
                icon: "fab fa-accusoft",
                color: "bg-primary",
                status: 1
            },
            {
                key: 5,
                path: "/admin/store",
                name: "STORE",
                icon: "fas fa-boxes",
                color: "bg-info",
                status: 1
            },
            {
                key: 6,
                path: "/admin/pricebook",
                name: "PRICE_BOOK",
                icon: "fas fa-hand-holding-usd",
                color: "bg-yellow",
                status: 1
            },
        ]
    },
    {
        type: 3,
        name: "ORDERS_MANAGER",
        status: 0,
        values: [
            {
                key: 7,
                path: "/admin/orders",
                name: "ORDERS",
                icon: "fas fa-credit-card",
                color: "bg-success",
                status: 1
            },
            {
                key: 8,
                path: "/admin/invoices",
                name: "INVOICES",
                icon: "fas fa-file-invoice-dollar",
                color: "bg-warning",
                status: 1
            },
            {
                key: 9,
                path: "/admin/shipping",
                name: "SHIPPING",
                icon: "fas fa-truck-loading",
                color: "bg-primary",
                status: 1
            },
        ]
    },
    {
        type: 4,
        name: "CAMPAIGNS_MANAGER",
        status: 0,
        values: [
            {
                key: 10,
                path: "/admin/coupon",
                name: "COUPON",
                icon: "fas fa-cut",
                color: "bg-yellow",
                status: 1
            },
            {
                key: 11,
                path: "/admin/campaigns",
                name: "CAMPAGINS",
                icon: "fas fa-bell",
                color: "bg-primary",
                status: 1
            },
            {
                key: 12,
                path: "/admin/promotions",
                name: "PROMOTIONS",
                icon: "fas fa-quidditch",
                color: "bg-danger",
                status: 1
            },
        ]
    },
    {
        type: 5,
        name: "OTHERS_MANAGER",
        status: 1,
        values: [
            {
                key: 13,
                path: "/admin/locale",
                name: "LOCALE",
                icon: "fas fa-globe-asia",
                color: "bg-success",
                status: 0
            },
            {
                key: 14,
                path: "/admin/seos",
                name: "SEO",
                icon: "fab fa-searchengin",
                color: "bg-info",
                status: 0
            },
            {
                key: 15,
                path: "/admin/services",
                name: "SERVICES",
                icon: "fab fa-servicestack",
                color: "bg-yellow",
                status: 0
            },
            {
                key: 16,
                path: "/admin/catalog",
                name: "CATALOG",
                icon: "fab fa-cuttlefish",
                color: "bg-default",
                status: 1
            },
        ]
    },
];

export default tabsManage;
