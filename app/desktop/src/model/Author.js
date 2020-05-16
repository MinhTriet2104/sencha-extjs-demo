Ext.define("Demo.model.Author", {
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
    url: "http://localhost:8080/author",
    reader: {
      type: "json",
    },
  },
});
