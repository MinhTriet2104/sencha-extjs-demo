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
  },

  config: {
    showNavigation: true,
  },

  collapsedCls: "main-nav-collapsed",

  onToggleNavigationSize: function () {
    this.setShowNavigation(!this.getShowNavigation());
  },

  init: function (view) {
    const me = this;
    const refs = me.getReferences();

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
    this.setCurrentView(id);
  },

  setCurrentView: function (hashTag) {
    hashTag = (hashTag || "").toLowerCase();
    const me = this;

    const navigationTree = me.navigationTree;
    const store = navigationTree.getStore();

    const node =
      store.findNode("routeId", hashTag) || store.findNode("viewType", hashTag);
    navigationTree.setSelection(node);

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
  },

  toolbarButtonClick: function (btn) {
    const href = btn.config.href;
    this.redirectTo(href);
  },
});
