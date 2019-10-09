import React, { Component } from "react";
import axios from "axios";
import getGetParameters from "../utils/getGetParameters";
import history from "../utils/history";
import Spinner from "../components/Spinner";
import ListArticle from "../components/ListArticle";
import Breadcrumb from "../components/Breadcrumb";

export default class Listado extends Component {
  state = {
    loading: true,
    query: "",
    data: null
  };

  componentDidMount() {
    const query = getGetParameters("query");

    if (query) {
      this.setQuery(query);
    }

    this.unlisten = history.listen((location, action) => {
      if (document.location.pathname === "/items") {
        const query = getGetParameters("query");
        this.setQuery(query);
      }
    });
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
      .get("http://localhost:3001/api/items", {
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
      });
  };

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    return (
      <div className="app-container">
        <Breadcrumb
          categories={!this.state.loading ? this.state.data.categories : []}
        />
        <section className="card">
          {this.state.loading && <Spinner />}
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
        </section>
      </div>
    );
  }
}
