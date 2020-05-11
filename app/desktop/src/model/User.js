Ext.define("Demo.model.User", {
  extend: "Ext.data.Model",
  requires: ["Ext.data.proxy.Rest"],
  fields: [
    {
      name: "id",
      mapping: "id",
    },
    {
      name: "createdAt",
      mapping: "createdAt",
    },
    {
      name: "name",
      mapping: "name",
    },
    {
      name: "avatar",
      mapping: "avatar",
    },
    {
      name: "role",
      mapping: "role",
    },
    {
      name: "email",
      mapping: "email",
    },
    {
      name: "password",
      mapping: "password",
    },
  ],
  proxy: {
    type: "rest",
    url: "https://5eb51225de5849001638b0a7.mockapi.io/api/user",
    reader: {
      type: "json",
    },
  },
});
