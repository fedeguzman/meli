import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Article from "../components/Article";
import Breadcrumb from "../components/Breadcrumb";
import { saveToCache, isInCache } from "../utils/saveCache";
import { API, APP_TITLE } from "../utils/const";

class Articulo extends Component {
  state = {
    loading: true,
    data: null,
    notFound: false
  };

  componentDidMount() {
    const product_id = this.props.match.params.id;

    isInCache(product_id, "recent_publications", "id").then(inCache => {
      if (!inCache) {
        this.getProduct(product_id);
      } else {
        this.setState({
          loading: false,
          data: inCache
        });
      }
    });
  }

  getProduct = product_id => {
    axios
      .get(`${API}/api/items/${product_id}`)
      .then(response => {
        const data = response.data;
        this.setState({
          loading: false,
          data
        });
        saveToCache("recent_publications", data);
      })
      .catch(e => {
        const response = e.response && e.response.data;
        if (response) {
          const error = e.response.data.error;
          if (error.includes("404")) {
            this.setState({
              loading: false,
              notFound: true
            });
          }
        } else {
          this.setState({
            loading: false,
            error: true
          });
        }
      });
  };

  render() {
    return (
      <div className="app-container">
        <Helmet>
          <title>
            {(this.state.data &&
              this.state.data.item.title + ` - ${APP_TITLE}`) ||
              "Cargando..."}
          </title>
          <meta
            name="description"
            content={this.state.data && this.state.data.item.description}
          ></meta>
          <meta
            property="og:image"
            content={this.state.data && this.state.data.item.picture}
          ></meta>
          <meta
            property="og:title"
            content={this.state.data && this.state.data.item.title}
          />
          <meta
            property="og:description"
            content={this.state.data && this.state.data.item.description}
          />
          <meta property="og:url" content={document.location.href} />
          <meta property="og:site_name" content={APP_TITLE} />
        </Helmet>
        <Breadcrumb
          categories={
            !this.state.loading && this.state.data
              ? this.state.data.item.categories
              : []
          }
        />
        <section className="card">
          {this.state.loading && this.state.query !== "" && <Spinner />}
          {this.state.data && <Article product={this.state.data} />}
          {this.state.notFound && (
            <div>
              <h1>Parece que el producto no existe.</h1>
              <ul>
                <li>
                  Escribí tu búsqueda en el campo que figura en la parte
                  superior de la pantalla.
                </li>
                <li>Verificá el link que ingresaste.</li>
              </ul>
            </div>
          )}
          {this.state.error && (
            <div>
              <h1>Ups... Algo sucedío</h1>
              <p>¿Querés intentar de nuevo?</p>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default withRouter(Articulo);
