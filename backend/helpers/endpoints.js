exports.default = {
  GET_ITEMS: `${process.env.MELI_API}/sites/MLA/search?q=:query`,
  GET_ITEM: `${process.env.MELI_API}/items/:id`,
  GET_DESCRIPTION_ITEM: `${process.env.MELI_API}/items/:id/description`,
  GET_CATEGORY_BY_ID: `${process.env.MELI_API}/categories/:category`
};
