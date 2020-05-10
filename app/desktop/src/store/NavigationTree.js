Ext.define("Demo.store.NavigationTree", {
  extend: "Ext.data.TreeStore",
  storeId: "NavigationTree",

  fields: [
    {
      name: "text",
    },
  ],

  root: {
    expanded: true,
    children: [
      {
        text: "Dashboard",
        iconCls: "x-fa fa-desktop",
        rowCls: "nav-tree-badge nav-tree-badge-new",
        viewType: "dashboard",
        routeId: "dashboard", // routeId defaults to viewType
        leaf: true,
      },
      {
        text: "Articles",
        iconCls: "x-fa fa-edit",
        viewType: "articles",
        leaf: true,
      },
      {
        text: "Users",
        iconCls: "x-fa fa-user",
        rowCls: "nav-tree-badge nav-tree-badge-hot",
        viewType: "users",
        leaf: true,
      },
    ],
  },
});
