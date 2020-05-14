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

  dataviewSelect: function (component, record) {
    const {
      id,
      title,
      image,
      date,
      content,
      view,
      category,
      author,
    } = record.data;
    const form = Ext.create({
      xtype: "show",
      items: {
        xtype: "formpanel",

        items: [
          {
            label: "Article Title",
            name: "title",
            xtype: "textfield",
            allowBlank: false,
            value: title,
            reference: "title",
          },
          {
            label: "Author",
            name: "author",
            xtype: "textfield",
            allowBlank: false,
            value: author,
          },
          {
            label: "Category",
            name: "category",
            xtype: "textfield",
            allowBlank: false,
            value: category,
          },
          {
            label: "Date",
            name: "date",
            xtype: "datefield",
            allowBlank: false,
            value: new Date(date),
          },
          {
            label: "Content",
            name: "content",
            xtype: "textareafield",
            allowBlank: false,
            grow: true,
            value: content,
          },
        ],
        buttons: [
          {
            text: "Update",
            cls: "mr-2",
            handler: async function (btn) {
              try {
                const res = await Demo.axios.get(
                  "https://5eb51225de5849001638b0a7.mockapi.io/api/article/" +
                    id
                );
                const article = await res.data;

                const form = btn.up("formpanel");
                const formValues = form.getValues();

                const modifiedArticle = {
                  ...article,
                  ...formValues,
                };

                Ext.Msg.show({
                  title: "Save Change?",
                  message: "Are you sure you wanna change?",
                  width: 300,
                  closable: false,
                  icon: Ext.Msg.QUESTION,
                  buttons: [
                    {
                      text: "Save",
                      itemId: "yes",
                    },
                    {
                      text: "Cancel",
                      itemId: "no",
                    },
                  ],
                  fn: async function (buttonValue, inputText, showConfig) {
                    if (buttonValue === "yes") {
                      try {
                        const updatedArticle = await Demo.axios.put(
                          "https://5eb51225de5849001638b0a7.mockapi.io/api/article/" +
                            id,
                          modifiedArticle
                        );
                        Ext.Msg.alert(
                          "Update Successfully",
                          `Article: "${updatedArticle.data.title}" Updated Successfully`
                        );
                        component.getStore().load();
                        btn.up("show").close();
                      } catch (err) {
                        Ext.Msg.alert("Update Fail", err);
                      }
                    } else {
                      return;
                    }
                  },
                });
              } catch (err) {
                Ext.Msg.alert("Update Fail", err);
              }
            },
          },
          {
            text: "Delete",
            cls: "btn-danger",
            style: {
              color: "white",
            },
            handler: function (btn) {
              Ext.Msg.show({
                title: "Delete Article?",
                message: "Are you sure you wanna delete?",
                width: 300,
                closable: false,
                icon: Ext.Msg.QUESTION,
                buttons: [
                  {
                    text: "Sure",
                    itemId: "yes",
                  },
                  {
                    text: "Cancel",
                    itemId: "no",
                  },
                ],
                fn: async function (buttonValue, inputText, showConfig) {
                  try {
                    if (buttonValue === "yes") {
                      const deletedArticle = await Demo.axios.delete(
                        "https://5eb51225de5849001638b0a7.mockapi.io/api/article/" +
                          id
                      );
                      Ext.Msg.alert(
                        "Delete Successfully",
                        `Article: "${deletedArticle.data.title}" Deleted Successfully`
                      );
                      component.getStore().load();
                      btn.up("show").close();
                    } else {
                      return;
                    }
                  } catch (err) {
                    Ext.Msg.alert("Delete Fail", err);
                  }
                },
              });
            },
          },
        ],
      },
    });
    form.show();
  },

  // handleClickNav: function (view, index, target, data) {
  //   const store = this.getView().getViewModel().getStore("articles");
  //   // console.log(url);
  //   store.getProxy().url = `https://5eb51225de5849001638b0a7.mockapi.io/api/article/${data.id}/`;
  //   store.load();
  // },

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
