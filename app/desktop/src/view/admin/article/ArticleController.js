Ext.define("Demo.view.admin.article.ArticleController", {
  extend: "Ext.app.ViewController",
  alias: "controller.articlecontroller",

  routes: {
    ":node/category/:id": "onCategoryChange",
  },

  init: function (view) {
    let lastToken = this.getRoutes()[":node/category/:id"].route.lastToken;
    if (lastToken) {
      lastToken = lastToken.split("/");
      const node = lastToken[0];
      const id = lastToken[lastToken.length - 1];
      this.onCategoryChange(node, id);
    }
  },

  handleClickNav: function (view, index, target, data) {
    const store = this.getView().getViewModel().getStore("articles");
    // console.log(url);
    store.getProxy().url = `https://5eb51225de5849001638b0a7.mockapi.io/api/article/${data.id}/`;
    store.load();
  },

  onCategoryChange: function (node, id) {
    this.setCategoryView(node, id);
  },

  setCategoryView: function (hashTag, id) {
    console.log("article controller:", hashTag, id);

    hashTag = (hashTag || "").toLowerCase();
    const store = this.getView().getViewModel().getStore("articles");
    if (id == 0) {
      store.getProxy().url = `https://5eb51225de5849001638b0a7.mockapi.io/api/article/`;
      store.load();
      this.redirectTo("articles");
      return;
    }

    store.getProxy().url = `https://5eb51225de5849001638b0a7.mockapi.io/api/article/${id}/`;
    store.load();

    // const me = this;
    // const adminController = me.getView().up("adminview").getController();
    // const navigationTree = adminController.navigationTree;
    // const treeStore = navigationTree.getStore();
    // const node =
    //   treeStore.findNode("routeId", hashTag) ||
    //   treeStore.findNode("viewType", hashTag);
    // navigationTree.setSelection(node);

    // const refs = adminController.getReferences();
    // const mainCard = refs.mainCard;
    // let item = mainCard.child(
    //   "component[routeId=" + hashTag + "/category/" + id + "]"
    // );

    // if (!item) {
    //   item = mainCard.add({
    //     xtype: node.get("viewType"),
    //     routeId: hashTag + "/category/" + "id",
    //   });
    // }
    // mainCard.setActiveItem(item);

    // adminController.redirectTo(hashTag + "/category/" + id);
  },
});
