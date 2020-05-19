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

  addNewArticle: function (btn) {
    const button = btn;
    const categoriesStore = btn.up().getViewModel().getStore("categories");

    const categoriesStoreItems = categoriesStore.data.items.slice(1);
    const authorsStoreItems = btn.up().getViewModel().getStore("authors").data
      .items;

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
            reference: "title",
          },
          {
            label: "Author",
            name: "author",
            xtype: "combobox",
            allowBlank: false,
            store: authorsStoreItems,
            displayField: "name",
            valueField: "id",
            editable: false,
          },
          {
            label: "Category",
            name: "category",
            xtype: "combobox",
            allowBlank: false,
            store: categoriesStoreItems,
            displayField: "name",
            valueField: "id",
            editable: false,
          },
          {
            xtype: "container",
            viewModel: {},
            items: [
              {
                xtype: "filefield",
                label: "Image",
                listeners: {
                  change(field) {
                    const file = field.el.down("input[type=file]").dom.files[0];
                    const container = field.up("container");
                    const viewModel = container.getViewModel();
                    const reader = new FileReader();

                    reader.onload = (e) =>
                      viewModel.set("imgData", e.target.result);

                    reader.readAsDataURL(file);
                  },
                },
              },
              {
                xtype: "image",
                flex: 1,
                cls: "mt-2",
                height: 400,
                style: {
                  border: "1px solid #35baf6",
                },
                bind: {
                  src: "{imgData}",
                },
              },
            ],
          },
          {
            label: "Content",
            name: "content",
            xtype: "textareafield",
            allowBlank: false,
            grow: true,
          },
        ],
        buttons: [
          {
            text: "Create",
            // cls: "mr-2",
            handler: function (btn) {
              try {
                const form = btn.up("formpanel");
                const formValues = form.getValues();

                const image = form.down("filefield").el.down("input[type=file]")
                  .dom.files[0];

                // const article = {
                //   ...formValues,
                //   image: image,
                // };
                const formData = new FormData();
                for (let key in formValues) {
                  formData.append(key, formValues[key]);
                }
                formData.append("image", image);

                Ext.Msg.show({
                  title: "Create Article?",
                  message: "Are you sure you wanna create?",
                  width: 300,
                  closable: false,
                  icon: Ext.Msg.QUESTION,
                  buttons: [
                    {
                      text: "Create",
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
                        const config = {
                          headers: {
                            "content-type": "multipart/form-data",
                          },
                        };
                        const newArticle = await Demo.axios.post(
                          "http://localhost:8080/article",
                          formData,
                          config
                        );
                        // Ext.Ajax.request({
                        //   url: "http://localhost:8080/article",
                        //   method: "POST",
                        //   cors: true,
                        //   useDefaultXhrHeader: false,
                        //   jsonData: article,
                        //   success: function (form, action) {
                        //     console.log("success");
                        //     console.log(form, action);
                        //     categoriesStore.load();
                        //     btn.up("show").close();
                        //   },
                        //   failure: function (form, action) {
                        //     console.log("failure");
                        //     console.log(form, action);
                        //   },
                        // });

                        Ext.Msg.alert(
                          "Create Successfully",
                          `Article: "${formValues.title}" Created Successfully`
                        );
                        const store = button
                          .up()
                          .getViewModel()
                          .getStore("articles");
                        store.load();
                        btn.up("show").close();
                      } catch (err) {
                        Ext.Msg.alert("Create Fail", err);
                      }
                    } else {
                      return;
                    }
                  },
                });
              } catch (err) {
                Ext.Msg.alert("Create Fail", err);
              }
            },
          },
        ],
      },
    });
    form.show();
  },

  addNewCategory: function (btn) {
    const categoriesViewModel = btn.up().getViewModel();
    const form = Ext.create({
      xtype: "show",

      items: {
        xtype: "formpanel",

        items: [
          {
            label: "Category Name",
            name: "name",
            xtype: "textfield",
            allowBlank: false,
            reference: "name",
          },
        ],
        buttons: [
          {
            text: "Create",
            handler: function (btn) {
              try {
                const form = btn.up("formpanel");
                const formValues = form.getValues();

                Ext.Msg.show({
                  title: "Create Category?",
                  message: "Are you sure you wanna create?",
                  width: 300,
                  closable: false,
                  icon: Ext.Msg.QUESTION,
                  buttons: [
                    {
                      text: "Create",
                      itemId: "yes",
                    },
                    {
                      text: "Cancel",
                      itemId: "no",
                    },
                  ],
                  fn: async function (buttonValue, inputText, showConfig) {
                    if (buttonValue === "yes") {
                      Ext.Ajax.request({
                        url: "http://localhost:8080/category",
                        method: "POST",
                        cors: true,
                        useDefaultXhrHeader: false,
                        jsonData: formValues,
                        success: function (res, opts) {
                          Ext.Msg.alert(
                            "Create Successfully",
                            `Category: "${formValues.name}" Created Successfully`
                          );
                          categoriesViewModel.getStore("categories").load();
                          btn.up("show").close();
                        },
                        failure: function (res, opts) {
                          Ext.Msg.alert("Create Fail", formValues.name);
                        },
                      });
                    } else {
                      return;
                    }
                  },
                });
              } catch (err) {
                Ext.Msg.alert("Create Fail", err);
              }
            },
          },
        ],
      },
    });
    form.show();
  },

  dataviewSelect: function (component, record) {
    const categoriesStoreItems = component
      .up()
      .getViewModel()
      .getStore("categories")
      .data.items.slice(1);
    const authorsStoreItems = component.up().getViewModel().getStore("authors")
      .data.items;

    const {
      id,
      title,
      image_id,
      date,
      content,
      view,
      category,
      author,
    } = record.data;

    const categoryId = categoriesStoreItems.find(
      (item) => item.data.name === category
    );
    const authorId = authorsStoreItems.find(
      (item) => item.data.name === author
    );

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
            xtype: "combobox",
            allowBlank: false,
            store: authorsStoreItems,
            displayField: "name",
            valueField: "id",
            editable: false,
            value: authorId,
          },
          {
            label: "Category",
            name: "category",
            xtype: "combobox",
            allowBlank: false,
            store: categoriesStoreItems,
            displayField: "name",
            valueField: "id",
            editable: false,
            value: categoryId,
          },
          {
            label: "Date",
            name: "date",
            xtype: "datefield",
            allowBlank: false,
            value: new Date(date),
          },
          {
            xtype: "container",
            viewModel: {
              data: {
                imgData: "http://localhost:8080/img/" + image_id,
              },
            },
            items: [
              {
                xtype: "filefield",
                label: "Image",
                listeners: {
                  change(field) {
                    const file = field.el.down("input[type=file]").dom.files[0];
                    const container = field.up("container");
                    const viewModel = container.getViewModel();
                    const reader = new FileReader();

                    reader.onload = (e) =>
                      viewModel.set("imgData", e.target.result);

                    reader.readAsDataURL(file);
                  },
                },
              },
              {
                xtype: "image",
                flex: 1,
                cls: "mt-2",
                height: 400,
                style: {
                  border: "1px solid #35baf6",
                },
                bind: {
                  src: "{imgData}",
                },
              },
            ],
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
                  "http://localhost:8080/article/" + id
                );
                const article = await res.data;

                const form = btn.up("formpanel");
                const formValues = form.getValues();

                const modifiedArticle = {
                  ...article,
                  ...formValues,
                };

                console.log(modifiedArticle);

                let image = form.down("filefield").el.down("input[type=file]")
                  .dom.files[0];

                const formData = new FormData();
                for (let key in modifiedArticle) {
                  formData.append(key, modifiedArticle[key]);
                }

                if (!image) image = "";
                formData.append("image", image);

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
                        const config = {
                          headers: {
                            "content-type": "multipart/form-data",
                          },
                        };
                        const updatedArticle = await Demo.axios.put(
                          "http://localhost:8080/article/" + id,
                          formData,
                          config
                        );
                        component.getStore().load();
                        Ext.Msg.alert(
                          "Update Successfully",
                          `Article Updated Successfully`
                        );
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
                fn: function (buttonValue, inputText, showConfig) {
                  if (buttonValue === "yes") {
                    Demo.axios
                      .delete("http://localhost:8080/article/" + id)
                      .then((res) => {
                        component.getStore("articles").load();
                        Ext.Msg.alert(
                          "Delete Successfully",
                          `Article Deleted Successfully`
                        );
                        btn.up("dialog").close();
                      })
                      .catch((err) => Ext.Msg.alert("Delete Fail", err));
                  } else {
                    return;
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
      store.getProxy().url = `http://localhost:8080/article`;
      store.load();
      this.redirectTo("articles");
      return;
    }

    store.getProxy().url = `http://localhost:8080/article?category=${id}`;
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
