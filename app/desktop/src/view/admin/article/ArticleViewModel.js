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
      sorters: ["name"],
    },
  },
});
