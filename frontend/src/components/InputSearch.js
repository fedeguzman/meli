import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import getGetParameters from "../utils/getGetParameters";
import { saveToCache } from "../utils/saveCache";

class InputSearch extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const query = getGetParameters("search");
    console.log("hola");
    if (document.location.pathname === "/items" && query) {
      this.setState({
        query
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevRoute = prevProps.location.pathname;
    const currentRoute = this.props.location.pathname;
    const query = this.state.query;
    console.log(this.props.location);

    if (prevRoute !== currentRoute && currentRoute === "/" && query !== "") {
      this.setState({
        query: ""
      });
    }
    if (prevRoute !== currentRoute && currentRoute === "/items") {
      console.log("test");
      const query = getGetParameters("search");
      this.setState({
        query
      });
    }
  }

  handleQuery = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  search = e => {
    e.preventDefault();
    const query = this.state.query.trim();
    if (query === "") {
      this.props.history.push("/");
      return false;
    }
    saveToCache("last_searches", query);
    this.props.history.push(`/items?search=${query}`);
  };

  render() {
    return (
      <form className="meli-search" onSubmit={this.search}>
        <label className="sr-only" htmlFor="query">
          Buscar
        </label>
        <input
          name="query"
          id="query"
          type="text"
          placeholder="Nunca dejes de buscar"
          value={this.state.query}
          onChange={this.handleQuery}
          onClick={this.props.openRecentSearches}
          className="meli-search-query"
          autoComplete="off"
        ></input>
        <button
          type="submit"
          className="meli-search-submit"
          aria-label="Buscar"
        >
          <span className="icon_search"></span>
        </button>
      </form>
    );
  }
}

export default withRouter(InputSearch);
