const endpoints = require("../helpers/endpoints").default;
const helpers = require("../helpers/helpers");

exports.getItems = (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(500).json({ error: "No query found" });
  }

  const endpoint = endpoints.GET_ITEMS.replace(":query", query);

  const author = helpers.getAuthor();

  helpers
    .getItemFromQuery(query)
    .then(response => {
      response.author = author;
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

exports.getDetailItem = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(500).json({ error: "No product found" });
  }

  const itemResponse = helpers.getItemResponse(id);

  const descriptionItemResponse = helpers.getItemDescriptionResponse(id);

  Promise.all([itemResponse, descriptionItemResponse])
    .then(async item => {
      const author = helpers.getAuthor();
      const itemInfo = item[0];
      const itemDescription = item[1];

      const itemResponse = helpers.buildItem(itemInfo, itemDescription);

      itemResponse.categories = await helpers.getCategoriesFromAPI(
        itemInfo.category_id
      );

      res.status(200).json({
        author,
        item: itemResponse
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error.message
      });
    });
};
