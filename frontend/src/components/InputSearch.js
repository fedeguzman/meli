import React, { Component } from "react";
import getGetParameters from "../utils/getGetParameters";
import history from "../utils/history";
import { saveToCache } from "../utils/saveCache";

export default class InputSearch extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const query = getGetParameters("query");
    if (document.location.pathname === "/items" && query) {
      this.setState({
        query
      });
    }

    this.unlisten = history.listen((location, action) => {
      if (document.location.pathname === "/" && this.state.query !== "") {
        this.setState({
          query: ""
        });
      }
    });
  }

  handleQuery = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  search = e => {
    e.preventDefault();
    if (this.state.query === "") {
      history.push("/");
      return false;
    }
    saveToCache("last_searches", this.state.query);
    history.push(`/items?query=${this.state.query}`);
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
