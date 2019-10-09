import React, { Component } from "react";
import { Link } from "react-router-dom";
import formatMoney from "../utils/formatMoney";

export default class qListadoItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <article className="meli-listArticle">
        <div className="meli-listArticle-thumbnail">
          <Link to={`/items/${item.id}`}>
            <img
              className="meli-listArticle-thumbnail__img"
              src={item.picture}
              alt={item.title}
            ></img>
          </Link>
        </div>
        <div className="meli-listArticle-information">
          <h1 className="meli-listArticle-information__price">
            {formatMoney(item.price.currency, item.price.amount)}
            {item.free_shipping && (
              <span className="meli-listArticle-information__freeShipping"></span>
            )}
          </h1>
          <Link to={`/items/${item.id}`} className="">
            <h2 className="meli-listArticle-information__title">
              {item.title}
            </h2>
          </Link>
        </div>
        <div className="meli-listArticle__location">
          <p>{item.seller_address.state}</p>
        </div>
      </article>
    );
  }
}
