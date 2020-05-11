Ext.define("Demo.view.admin.article.ArticleViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.articleviewmodel",
  requires: ["Demo.model.Article"],

  stores: {
    articles: {
      model: "Demo.model.Article",
      autoLoad: true,
    },
  },
});
