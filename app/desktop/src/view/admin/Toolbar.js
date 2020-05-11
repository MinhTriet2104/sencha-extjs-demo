Ext.define("Admin.view.main.Toolbar", {
  extend: "Ext.Toolbar",
  xtype: "maintoolbar",

  ui: "tools",
  items: [
    {
      // This component is moved to the floating nav container by the phone profile
      xtype: "component",
      // reference: "logo",
      cls: "main-logo",
      html: "Admin",
    },
    {
      xtype: "button",
      ui: "header",
      iconCls: "x-fa fa-bars",
      margin: "0 0 0 10",
      listeners: {
        tap: "onToggleNavigationSize",
      },
    },
    "->",
    {
      xtype: "button",
      ui: "header",
      iconCls: "x-fa fa-search",
      href: "#searchresults",
      margin: "0 7 0 0",
      handler: "toolbarButtonClick",
    },
    {
      xtype: "button",
      ui: "header",
      iconCls: "x-fa fa-envelope",
      href: "#email",
      margin: "0 7 0 0",
      handler: "toolbarButtonClick",
    },
    {
      xtype: "button",
      ui: "header",
      iconCls: "x-fa fa-question",
      href: "#faq",
      margin: "0 7 0 0",
      handler: "toolbarButtonClick",
    },
    {
      xtype: "button",
      ui: "header",
      iconCls: "x-fa fa-th-large",
      href: "#dashboard",
      margin: "0 7 0 0",
      handler: "toolbarButtonClick",
    },
    {
      xtype: "component",
      html: "Minh Triet",
      margin: "0 12 0 4",
      userCls: "main-user-name",
    },
    {
      xtype: "image",
      userCls: "main-user-image small-image circular",
      alt: "Current user image",
      src: "https://s3.amazonaws.com/uifaces/faces/twitter/xalionmalik/128.jpg",
    },
  ],
});
