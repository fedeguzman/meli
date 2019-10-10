import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Article from "../components/Article";
import Breadcrumb from "../components/Breadcrumb";
import { saveToCache, isInCache } from "../utils/saveCache";
import { API } from "../utils/const";

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
      .catch(error => {
        this.setState({
          loading: false,
          notFound: true
        });
      });
  };

  render() {
    return (
      <div className="app-container">
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
        </section>
      </div>
    );
  }
}

export default withRouter(Articulo);
