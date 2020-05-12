Ext.define("Demo.view.admin.article.ArticleController", {
  extend: "Ext.app.ViewController",
  alias: "controller.articlecontroller",

  handleClickNav: function (view, record) {
    const store = this.getView().getViewModel().getStore("articles");
    console.log(record, store.getProxy().url);
    // if (buttonText === "all") {
    //   store.getProxy().url =
    //     "https://5eb51225de5849001638b0a7.mockapi.io/api/article/";
    // } else {
    //   store.getProxy().url =
    //     "https://5eb51225de5849001638b0a7.mockapi.io/api/article/1";
    // }
    // store.load();
  },
});
