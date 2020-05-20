Ext.define("Demo.view.admin.user.User", {
  extend: "Ext.grid.Grid",
  xtype: "users",
  requires: [
    "Ext.grid.column.Column",
    "Ext.grid.cell.*",
    "Ext.grid.rowedit.Plugin",
  ],
  controller: "usercontroller",
  viewModel: {
    type: "userviewmodel",
  },
  plugins: {
    rowedit: {
      autoConfirm: false,
    },
  },

  selectable: "single",

  bind: {
    store: "{users}",
  },

  title: "Users",

  defaults: {
    height: 70,
  },

  columns: [
    {
      text: "Avatar",
      dataIndex: "avatar",
      tpl: `<img class="media-object" src={avatar} alt="avatar" />`,
      cell: {
        encodeHtml: false,
      },
      flex: 0.5,
    },
    {
      text: "Name",
      dataIndex: "name",
      flex: 1,
      editable: true,
    },
    {
      text: "Email",
      dataIndex: "email",
      flex: 1,
      editable: true,
    },
    {
      text: "Password",
      dataIndex: "password",
      flex: 0.5,
      editable: true,
    },
    {
      text: "role",
      dataIndex: "role",
      flex: 0.5,
      editable: true,
    },
    {
      text: "Created At",
      dataIndex: "createdAt",
      flex: 1,
    },
  ],
  listeners: {
    canceledit: "onEditCancelled",
    validateedit: "onValidateEdit",
  },
});
