Ext.define("Demo.view.admin.article.Article", {
  extend: "Ext.DataView",
  xtype: "articles",
  viewModel: { type: "articleviewmodel" },

  // controller: "articlecontroller",
  // viewModel: {
  //   type: "dashboard",
  // },

  scrollable: true,

  bind: {
    store: "{articles}",
  },
  html: '<div class="container mt-3"><h2>Articles</h2></div>',
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
});
