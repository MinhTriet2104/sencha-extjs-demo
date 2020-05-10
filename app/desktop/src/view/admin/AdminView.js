Ext.define("Demo.view.admin.AdminView", {
  extend: "Ext.Container",
  xtype: "adminview",
  requires: ["Ext.Button", "Ext.list.Tree", "Ext.navigation.View"],

  controller: "adminviewcontroller",
  viewModel: {
    type: "adminviewmodel",
  },

  layout: "hbox",

  items: [
    {
      xtype: "maintoolbar",
      docked: "top",
      cls: "main-toolbar shadow",
    },
    {
      xtype: "container",
      cls: "main-nav-container",
      reference: "navigation",
      scrollable: true,
      items: [
        {
          xtype: "treelist",
          reference: "navigationTree",
          ui: "navigation",
          store: "NavigationTree",
          expanderFirst: false,
          expanderOnly: false,
          listeners: {
            itemclick: "onNavigationItemClick",
            selectionchange: "onNavigationTreeSelectionChange",
          },
        },
      ],
    },
    {
      xtype: "navigationview",
      flex: 1,
      reference: "mainCard",
      cls: "main-container",
      navigationBar: false,
    },
  ],
});
