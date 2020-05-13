Ext.define("Demo.view.admin.AdminViewController", {
  extend: "Ext.app.ViewController",
  alias: "controller.adminviewcontroller",

  listen: {
    controller: {
      "#": {
        unmatchedroute: "onRouteChange",
      },
    },
  },

  routes: {
    ":node": "onRouteChange",
    ":node/category/:id": "onCategoryChange",
  },

  config: {
    showNavigation: true,
  },

  collapsedCls: "main-nav-collapsed",

  onCategoryChange: function (node, id) {
    this.setCategoryView(node, id);
  },

  setCategoryView: function (hashTag, id) {
    console.log("admin controller: ", hashTag, id);
    hashTag = (hashTag || "").toLowerCase();

    const me = this;
    const node = this.setTreeNode(hashTag);
    const refs = me.getReferences();
    const mainCard = refs.mainCard;
    let item = mainCard.child(
      "component[routeId=" + hashTag + "/category/" + id + "]"
    );

    if (!item) {
      item = mainCard.add({
        xtype: node.get("viewType"),
        routeId: hashTag + "/category/" + id,
      });
    }
    mainCard.setActiveItem(item);
    this.redirectTo(hashTag + "/category/" + id);
  },

  onToggleNavigationSize: function () {
    this.setShowNavigation(!this.getShowNavigation());
  },

  init: function (view) {
    const me = this;
    const refs = me.getReferences();

    // console.log(this.getRoutes());
    me.callParent([view]);

    me.nav = refs.navigation;
    me.navigationTree = refs.navigationTree;
  },

  onNavigationItemClick: function () {
    // The phone profile's controller uses this event to slide out the navigation
    // tree. We don't need to do anything but must be present since we always have
    // the listener on the view...
  },

  onNavigationTreeSelectionChange: function (tree, node) {
    const to = node && (node.get("routeId") || node.get("viewType"));

    if (to) {
      this.redirectTo(to);
    }
  },

  onRouteChange: function (id) {
    // console.log("admin route change", id);
    this.setCurrentView(id);
  },

  setTreeNode: function (hashTag) {
    // hashTag = hashTag.split("/")[0];
    console.log("set tree node admin", hashTag);
    hashTag = (hashTag || "").toLowerCase();
    const me = this;

    const navigationTree = me.navigationTree;
    const store = navigationTree.getStore();

    const node =
      store.findNode("routeId", hashTag) || store.findNode("viewType", hashTag);
    navigationTree.setSelection(node);
    return node;
  },

  setCurrentView: function (hashTag) {
    // hashTag = (hashTag || "").toLowerCase();
    // const me = this;

    // const navigationTree = me.navigationTree;
    // const store = navigationTree.getStore();

    // const node =
    //   store.findNode("routeId", hashTag) || store.findNode("viewType", hashTag);
    // navigationTree.setSelection(node);
    // if (hashTag === "articles") {
    //   console.log(
    //     this.getView().down("articles").getViewModel().getStore("articles")
    //   );
    // }

    const me = this;
    const node = this.setTreeNode(hashTag);

    const refs = me.getReferences();
    const mainCard = refs.mainCard;
    let item = mainCard.child("component[routeId=" + hashTag + "]");

    if (!item) {
      item = mainCard.add({
        xtype: node.get("viewType"),
        routeId: hashTag,
      });
    }
    mainCard.setActiveItem(item);
    // console.log("mainCard:", mainCard);
  },

  toolbarButtonClick: function (btn) {
    const href = btn.config.href;
    this.redirectTo(href);
  },
});
