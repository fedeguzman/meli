import React, { Component } from "react";

export default class Article extends Component {
  render() {
    return (
      <article className="meli-article">
        <div className="article-detail">
          <div className="article-detail-thumbnail">
            <img
              src="http://mla-s1-p.mlstatic.com/898290-MLA31003118647_062019-O.jpg"
              className="article-detail-thumbnail__img"
            />
          </div>
          <div className="article-detail-description">
            <h1 className="article-detail-description__title">
              Descripción del producto
            </h1>
            <p className="article-detail-description__content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
              scelerisque leo, ac convallis tortor. Suspendisse euismod rhoncus
              sem non faucibus. Praesent sed ligula elit. Mauris nec justo
              porta, sagittis nunc a, dignissim metus. In mollis a urna vitae
              iaculis. Morbi faucibus lectus vitae lacus molestie hendrerit.
              Vestibulum vitae metus nec massa auctor accumsan. Donec blandit
              enim nisi, eget tempor diam dapibus blandit. Aenean sit amet augue
              semper, malesuada sem nec, sollicitudin nisl. Nullam a magna
              varius, blandit odio nec, venenatis ante.
            </p>
          </div>
        </div>
        <div className="article-data">
          <p className="article-data__status">Nuevo - 234 vendidos</p>
          <h2 className="article-data__title">iPhone XS Max 64 GB 2019</h2>
          <h1 className="article-data__price">
            $ 23.456 <sup className="article-data__price__decimals">00</sup>
          </h1>
          <p className="article-data__freeShipping">Envio Gratís</p>
          <button className="button button-primary">Comprar</button>
        </div>
      </article>
    );
  }
}
