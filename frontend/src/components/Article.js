import React, { Component } from "react";
import formatMoney from "../utils/formatMoney";

export default class Article extends Component {
  render() {
    const { item } = this.props.product;

    return (
      <article className="meli-article">
        <div className="article-detail">
          <div className="article-detail-thumbnail">
            <img
              src={item.picture}
              className="article-detail-thumbnail__img"
              alt={item.title}
            />
          </div>
          <div className="article-detail-description">
            <h1 className="article-detail-description__title">
              Descripción del producto
            </h1>
            <p className="article-detail-description__content">
              {item.description}
            </p>
          </div>
        </div>
        <div className="article-data">
          <p className="article-data__status">
            {item.condition === "new" ? "Nuevo" : "Usado"} -{" "}
            {item.sold_quantity}{" "}
            {item.sold_quantity === 1 ? "vendido" : "vendidos"}
          </p>
          <h2 className="article-data__title">{item.title}</h2>
          <h1 className="article-data__price">
            {formatMoney(item.price.currency, item.price.amount)}
            <sup className="article-data__price__decimals">
              {item.price.decimals <= 9
                ? `0${item.price.decimals}`
                : item.price.decimals}
            </sup>
          </h1>
          {item.free_shipping && (
            <p className="article-data__freeShipping">Envio Gratís</p>
          )}
          <button className="button button-primary">Comprar</button>
        </div>
      </article>
    );
  }
}
