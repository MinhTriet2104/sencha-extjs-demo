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
        viewType: "users",
        leaf: true,
      },
      {
        text: "Search",
        iconCls: "x-fa fa-search",
        viewType: "search",
        leaf: true,
      },
    ],
  },
});
