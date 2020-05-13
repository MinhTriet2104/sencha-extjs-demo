Ext.define("Demo.view.admin.user.UserController", {
  extend: "Ext.app.ViewController",
  alias: "controller.usercontroller",

  onEditCancelled: function (editor, value, startValue, eOpts) {
    // Ext.Msg.confirm(
    //   "Confirmation",
    //   "Are you sure you don't wanna change?",
    //   function (confirm) {
    //     console.log(confirm);
    //     if (confirm === "no") return;
    //     console.log(value.record.data);
    //   },
    //   this
    // );
  },

  onValidateEdit: function (editor, context) {
    // const newModel = editor.record.copy();
    const { record } = editor;
    Ext.Msg.confirm(
      "Confirmation",
      "Are you sure you wanna change?",
      function (confirm) {
        if (confirm === "no") {
          return false;
        }
      },
      this
    );
  },
});
