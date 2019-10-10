const axios = require("axios");
const endpoints = require("../helpers/endpoints").default;

exports.getAuthor = () => {
  return {
    name: "Federico",
    lastName: "Guzmán"
  };
};

exports.getItemFromQuery = query => {
  const endpoint = endpoints.GET_ITEMS.replace(":query", query);

  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then(response => {
        const data = response.data;
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
              state: item.seller_address.state.name
            }
          };
        });

        resolve({
          categories,
          items: subset_items
        });
      })
      .catch(error => {
        reject({ error: error.message });
      });
  });
};

exports.getItemResponse = id => {
  const endpoint = endpoints.GET_ITEM.replace(":id", id);

  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.getItemDescriptionResponse = id => {
  const endpoint = endpoints.GET_DESCRIPTION_ITEM.replace(":id", id);

  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then(response => {
        if (response.status == 200) {
          resolve(response.data);
        }
      })
      .catch(error => {
        resolve({ error: error.message });
      });
  });
};

exports.getCategoriesFromAPI = category => {
  const endpoint = endpoints.GET_CATEGORY_BY_ID.replace(":category", category);

  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then(response => {
        const data = response.data;
        const categories = [];
        const category = data.path_from_root;

        category.forEach(value => {
          categories.push(value.name);
        });
        resolve(categories);
      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.buildItem = (item, description) => {
  const itemResponse = {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: ~~item.price,
      decimals: ~~((item.price % 1) * 100)
    },
    picture: item.thumbnail
      .replace(/-I\./, "-O.")
      .replace(/^http:\/\//i, "https://"),
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    sold_quantity: item.sold_quantity,
    description: description.plain_text
  };

  return itemResponse;
};
