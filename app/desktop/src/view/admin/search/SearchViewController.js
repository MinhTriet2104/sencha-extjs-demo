Ext.define("Demo.view.admin.search.SearchViewController", {
  extend: "Ext.app.ViewController",
  alias: "controller.searchviewcontroller",

  searchHandler: async function (btn) {
    const form = btn.up();
    const formValues = form.getValues();
    const viewModel = btn.up("search").getViewModel();

    console.log(formValues);

    let query = "";
    if (formValues.title) query += `&title=${formValues.title}`;
    if (formValues.fromDate) {
      const fromDate = new Date(formValues.fromDate);
      const fromDateDay = fromDate.getDate();
      const fromDateMonth = fromDate.getMonth() + 1;
      const fromDateYear = fromDate.getFullYear();

      query += `&from=${fromDateYear}-${fromDateMonth}-${fromDateDay}`;
    }
    if (formValues.toDate) {
      const toDate = new Date(formValues.toDate);
      const toDateDay = toDate.getDate();
      const toDateMonth = toDate.getMonth() + 1;
      const toDateYear = toDate.getFullYear();

      query += `&from=${toDateYear}-${toDateMonth}-${toDateDay}`;

      query += `&to=${new Datetime(formValues.toDate)}`;
    }

    // console.log(viewModel);
    // const res = await Demo.axios.post(
    //   "http://localhost:8080/article?search=true",
    //   formValues
    // );

    // if (res.status === 200) {
    //   if (res.data) {
    // viewModel.setStore("articles", res.data);
    // console.log(res.data);
    // viewModel.getStore("articles").getData().items = res.data;
    // console.log(viewModel.getStore("articles"));
    viewModel.getStore("articles").getProxy().url =
      "http://localhost:8080/article?search=true" + query;

    viewModel.getStore("articles").load();
    // console.log(viewModel.getStore("articles").setProxy().url);
    //   }
    // }
  },
});
