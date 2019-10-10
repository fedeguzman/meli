import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import axios from "axios";
import getGetParameters from "../utils/getGetParameters";
import Spinner from "../components/Spinner";
import ListArticle from "../components/ListArticle";
import Breadcrumb from "../components/Breadcrumb";
import { saveToCache, isInCache } from "../utils/saveCache";
import { API, APP_TITLE } from "../utils/const";

class Listado extends Component {
  state = {
    loading: true,
    query: "",
    data: null,
    error: false
  };

  componentDidMount() {
    const query = getGetParameters("search");

    if (query) {
      isInCache(query, "last_results", "query").then(inCache => {
        if (!inCache) {
          this.setQuery(query);
        } else {
          this.setState({
            loading: false,
            data: inCache,
            query: inCache.query
          });
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevRoute = prevProps.location.search;
    const currentRoute = this.props.location.search;
    if (prevRoute !== currentRoute) {
      const query = getGetParameters("search");
      this.setQuery(query);
    }
  }

  setQuery = query => {
    this.setState(
      {
        query
      },
      () => {
        this.getItems(query);
      }
    );
  };

  getItems = query => {
    this.setState({
      loading: true
    });
    axios
      .get(`${API}/api/items`, {
        params: {
          query
        }
      })
      .then(response => {
        const data = response.data;
        this.setState({
          loading: false,
          data
        });

        data.query = query;
        saveToCache("last_results", data);
      })
      .catch(e => {
        const response = e.response && e.response.data;
        if (response) {
          const error = e.response.data.error;
          if (error.includes("404")) {
            this.setState({
              loading: false,
              error: true
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
          <title>Resultados de la busqueda - {APP_TITLE}</title>
        </Helmet>
        <Breadcrumb
          categories={
            !this.state.loading && this.state.data
              ? this.state.data.categories
              : []
          }
        />
        <section className="card">
          {this.state.loading && this.state.query !== "" && <Spinner />}
          {!this.state.loading &&
            this.state.data &&
            this.state.data.items.map(item => {
              return <ListArticle key={item.id} item={item} />;
            })}
          {this.state.query === "" && (
            <div>
              <h1>Escribí en el buscador lo que querés encontrar</h1>
              <p>
                Escribí tu búsqueda en el campo que figura en la parte superior
                de la pantalla.
              </p>
            </div>
          )}
          {this.state.data && this.state.data.items.length === 0 && (
            <div>
              <h1>No hay publicaciones que coincidan con tu búsqueda.</h1>
              <ul>
                <li>Revisá la ortografía de la palabra.</li>
                <li>Utilizá palabras más genéricas o menos palabras.</li>
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

export default withRouter(Listado);
