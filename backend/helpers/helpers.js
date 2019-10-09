const axios = require("axios");
const endpoints = require("../helpers/endpoints").default;

exports.getItemResponse = id => {
  if (!id) {
    throw "Error. You must pass the product id";
  }

  const endpoint = endpoints.GET_ITEM.replace(":id", id);

  return new Promise((resolve, reject) => {
    axios.get(endpoint).then(response => {
      resolve(response.data);
    });
  });
};

exports.getAuthor = () => {
  return {
    name: "Federico",
    lastName: "Guzmán"
  };
};

exports.getItemDescriptionResponse = id => {
  if (!id) {
    throw "Error. You must pass the product id";
  }

  const endpoint = endpoints.GET_DESCRIPTION_ITEM.replace(":id", id);

  return new Promise((resolve, reject) => {
    axios.get(endpoint).then(response => {
      resolve(response.data);
    });
  });
};

exports.getCategoriesFromAPI = category => {
  if (!category) {
    throw "Error. You must pass the category id";
  }

  const endpoint = endpoints.GET_CATEGORY_BY_ID.replace(":category", category);

  return new Promise((resolve, reject) => {
    axios.get(endpoint).then(response => {
      const data = response.data;
      const categories = [];
      const category = data.path_from_root;

      category.forEach(value => {
        categories.push(value.name);
      });
      resolve(categories);
    });
  });
};

exports.buildItem = (item, description) => {
  const author = this.getAuthor();

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
