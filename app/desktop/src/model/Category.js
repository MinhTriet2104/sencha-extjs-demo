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
    url: "http://localhost:8080/category",
    reader: {
      type: "json",
    },
  },
});
