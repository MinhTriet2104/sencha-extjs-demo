Ext.define("Demo.view.admin.article.Article", {
  extend: "Ext.Panel",
  xtype: "articles",

  requires: ["Demo.view.admin.article.ArticleController"],

  viewModel: { type: "articleviewmodel" },
  controller: "articlecontroller",

  scrollable: true,
  tbar: {
    xtype: "dataview",
    cls: "mt-3 nav-menu ml-2",
    autoEl: "ul",

    layout: "box",

    bind: {
      store: "{categories}",
    },

    itemTpl: `
    <li>
      <a href="#articles/category/{id}">
        {name}
      </a>
    </li>
    `,

    // listeners: {
    //   itemtap: "handleClickNav",
    // },
  },

  items: {
    xtype: "dataview",
    reference: "articlesDataview",
    bind: {
      store: "{articles}",
    },
    itemTpl: `
    <div class="container mt-3">
      <div class="post post-row">
        <a class="post-img" href="#"><img src="{image}" alt="{title}"></a>
        <div class="post-body">
          <div class="post-category">
            <a href="#">{category}</a>
          </div>
          <h3 class="post-title"><a href="#">Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.</a></h3>
          <ul class="post-meta">
            <li><a href="#">{author}</a></li>
            <li>{date:date("F j, Y")}</li>
          </ul>
          <p>{content}</p>
        </div>
      </div>
    </div>
    `,
  },
});
