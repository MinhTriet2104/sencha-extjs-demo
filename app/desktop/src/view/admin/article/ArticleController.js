Ext.define("Demo.view.admin.article.ArticleController", {
  extend: "Ext.app.ViewController",
  alias: "controller.articlecontroller",

  handleClickNav: function (button) {
    const store = this.getView().getViewModel().getStore("articles");
    const buttonText = button.getText().toLowerCase();
    if (buttonText === "all") {
      store.getProxy().url =
        "https://5eb51225de5849001638b0a7.mockapi.io/api/article/";
    } else {
      store.getProxy().url =
        "https://5eb51225de5849001638b0a7.mockapi.io/api/article/1";
    }
    store.load();
  },
});
