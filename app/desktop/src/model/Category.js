Ext.define("Demo.model.Category", {
  extend: "Ext.data.Model",
  requires: ["Ext.data.proxy.Rest"],
  fields: [
    {
      name: "id",
      mapping: "id",
    },
    {
      name: "name",
      mapping: "name",
    },
  ],
  proxy: {
    type: "rest",
    url: "https://5eb51225de5849001638b0a7.mockapi.io/api/category",
    reader: {
      type: "json",
    },
  },
});
