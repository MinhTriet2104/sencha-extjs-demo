Ext.define("Demo.view.admin.user.User", {
  extend: "Ext.grid.Grid",
  xtype: "users",
  requires: ["Ext.grid.column.Column", "Ext.grid.cell.*"],
  viewModel: {
    type: "userviewmodel",
  },

  selectable: "single",
  defaults: {
    height: 70,
  },

  bind: {
    store: "{users}",
  },

  title: "Users",
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
    },
    {
      text: "Email",
      dataIndex: "email",
      flex: 1,
    },
    {
      text: "Password",
      dataIndex: "password",
      flex: 0.5,
    },
    {
      text: "role",
      dataIndex: "role",
      flex: 0.5,
    },
    {
      text: "Created At",
      dataIndex: "createdAt",
      flex: 1,
    },
  ],
});
