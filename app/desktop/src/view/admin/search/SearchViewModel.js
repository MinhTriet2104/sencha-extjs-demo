Ext.define("Demo.view.admin.search.SearchViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.searchviewmodel",
  requires: ["Demo.model.Article"],

  stores: {
    articles: {
      model: "Demo.model.Article",
    },
  },
});
