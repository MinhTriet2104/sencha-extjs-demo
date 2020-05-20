Ext.define("Demo.view.admin.search.Search", {
  extend: "Ext.Panel",
  xtype: "search",

  requires: ["Demo.view.admin.search.SearchViewController"],

  viewModel: { type: "searchviewmodel" },
  controller: "searchviewcontroller",

  scrollable: true,

  tbar: {
    xtype: "formpanel",

    items: {
      xtype: "formpanel",

      layout: "vbox",

      items: [
        {
          label: "Article Title",
          name: "title",
          xtype: "textfield",
          allowBlank: false,
          reference: "title",
        },
        {
          xtype: "button",
          text: "Search",
          iconCls: "x-fa fa-search",
          handler: "searchHandler",
        },
      ],
    },
  },

  items: [
    {
      xtype: "dataview",
      // reference: "articlesDataview",
      bind: {
        store: "{articles}",
      },

      itemTpl: `
      <div class="container mt-3">
        <div class="post post-row">
          <a class="post-img"><img src="http://localhost:8080/img/{image_id}" alt="{title}"></a>
          <div class="post-body">
            <div class="post-category">
              <a>{category}</a>
            </div>
            <h3 class="post-title"><a>{title}</a></h3>
            <ul class="post-meta">
              <li><a>{author}</a></li>
              <li>{date:date("F j, Y")}</li>
            </ul>
            <p>{content}</p>
          </div>
        </div>
      </div>
      `,
      // listeners: {
      //   select: "dataviewSelect",
      // },
    },
  ],
});
