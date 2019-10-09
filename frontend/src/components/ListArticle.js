import React, { Component } from "react";
import formatMoney from "../utils/formatMoney";

export default class qListadoItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <article className="meli-listArticle">
        <div className="meli-listArticle-thumbnail">
          <img
            className="meli-listArticle-thumbnail__img"
            src={item.picture}
          ></img>
        </div>
        <div className="meli-listArticle-information">
          <h1 className="meli-listArticle-information__price">
            {formatMoney(item.price.currency, item.price.amount)}
            {item.free_shipping && (
              <span className="meli-listArticle-information__freeShipping"></span>
            )}
          </h1>
          <h2 className="meli-listArticle-information__title">{item.title}</h2>
        </div>
        <div className="meli-listArticle__location">
          <p>{item.seller_address.state}</p>
        </div>
      </article>
    );
  }
}
