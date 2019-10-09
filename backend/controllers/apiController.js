const axios = require("axios");
const endpoints = require("../helpers/endpoints").default;
const helpers = require("../helpers/helpers");

exports.getItems = (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(500).json({ error: "No query found" });
  }

  const endpoint = endpoints.GET_ITEMS.replace(":query", query);

  axios
    .get(endpoint)
    .then(response => {
      const data = response.data;

      // Get author
      const author = {
        name: "Federico",
        lastName: "Guzmán"
      };

      // Get categories

      const filters = data.filters;
      const categories = [];

      filters.forEach(filter => {
        if (filter.id === "category") {
          const category = filter.values[0].path_from_root;
          category.forEach(value => {
            categories.push(value.name);
          });
        }
      });

      // Get Items

      const items = data.results;

      const subset_items = items.map(item => {
        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: ~~item.price,
            decimals: ~~((item.price % 1) * 100)
          },
          picture: item.thumbnail
            .replace(/-I\./, "-X.")
            .replace(/^http:\/\//i, "https://"), // -F[1] for HD  - V for thumb
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          seller_address: {
            country: item.seller_address.country.name,
            state: item.seller_address.state.name,
            city: item.seller_address.city.name
          }
        };
      });

      // Return result
      res.json({
        author,
        categories,
        items: subset_items.splice(0, 4)
      });
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
