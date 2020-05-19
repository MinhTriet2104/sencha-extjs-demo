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
      mapping: "category.name",
    },
    {
      name: "author",
      mapping: "author.name",
    },
  ],
  proxy: {
    type: "rest",
    url: "http://localhost:8080/article",
    useDefaultXhrHeader: false,
    cors: true,
    reader: {
      type: "json",
    },
  },
});
