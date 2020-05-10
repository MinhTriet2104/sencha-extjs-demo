Ext.define("Demo.Application", {
  extend: "Ext.app.Application",
  name: "Demo",
  requires: ["Demo.*"],

  defaultToken: "dashboard",

  launch: function () {
    Ext.Viewport.add([{ xtype: "adminview" }]);
  },

  onAppUpdate: function () {
    Ext.Msg.confirm(
      "Application Update",
      "This application has an update, reload?",
      function (choice) {
        if (choice === "yes") {
          window.location.reload();
        }
      }
    );
  },

  stores: ["NavigationTree"],
});
