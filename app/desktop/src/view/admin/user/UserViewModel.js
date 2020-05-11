Ext.define("Demo.view.admin.user.UserViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.userviewmodel",
  requires: ["Demo.model.User"],

  stores: {
    users: {
      model: "Demo.model.User",
      autoLoad: true,
    },
  },
});
