Ext.define("Demo.view.admin.article.ArticleViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.articleviewmodel",
  requires: ["Demo.model.Article", "Demo.model.Category"],

  stores: {
    articles: {
      model: "Demo.model.Article",
      autoLoad: true,
      sorters: [
        {
          property: "date",
          direction: "DESC",
        },
      ],
    },

    categories: {
      model: "Demo.model.Category",
      storeId: "categories",
      autoLoad: true,
      // sorters: ["name"],
      listeners: {
        load: function (store, records) {
          store.insert(
            0,
            Ext.create("Demo.model.Category", {
              id: "0",
              name: "all",
            })
          );
        },
      },
    },

    authors: {
      model: "Demo.model.Author",
      storeId: "authors",
      autoLoad: true,
    },
  },
});
