const tabsManage = [
    {
        type: 1,
        name: "CONFIG_MANAGER",
        status: 1,
        values: [
            {
                key: 1,
                path: "/admin/config",
                name: "CONFIG",
                icon: "fas fa-cog",
                color: "bg-danger",
                status: 1
            }
        ]
    },
    {
        type: 2,
        name: "SYSTEM_MANAGER",
        status: 1,
        values: [
            {
                key: 1,
                path: "/admin/user-system",
                name: "USER_SYSTEM",
                icon: "fas fa-users-cog",
                color: "bg-success",
                status: 1
            }
        ]
    }
];

export default tabsManage;
