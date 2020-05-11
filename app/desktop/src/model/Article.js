Ext.define("Demo.model.Article", {
  extend: "Ext.data.Model",
  requires: ["Ext.data.proxy.Rest"],
  fields: [
    {
      name: "id",
      mapping: "id",
    },
    {
      name: "title",
      mapping: "title",
    },
    {
      name: "image",
      mapping: "image",
    },
    {
      name: "date",
      mapping: "date",
    },
    {
      name: "content",
      mapping: "content",
    },
    {
      name: "view",
      mapping: "view",
    },
    {
      name: "category",
      mapping: "category",
    },
    {
      name: "author",
      mapping: "author",
    },
  ],
  proxy: {
    type: "rest",
    url: "https://5eb51225de5849001638b0a7.mockapi.io/api/article/",
    reader: {
      type: "json",
    },
  },
});
