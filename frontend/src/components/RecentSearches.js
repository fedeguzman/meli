import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCache } from "../utils/saveCache";

export default class RecentSearches extends Component {
  state = {
    style: {
      top: "0px",
      left: "0px",
      width: "0px"
    },
    queries: []
  };

  componentDidMount() {
    this.calculatePosition();
    this.getLastSearches();
    this.recalculatePosition();
    this.handleClose();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    this.getLastSearches();
  }

  handleClose = () => {
    document.addEventListener("click", this.handleClickOutside);
  };

  handleClickOutside = event => {
    const wrapperRef = document.querySelector(".recentSearch");
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      this.props.closeRecentSearches();
    }
  };

  recalculatePosition = () => {
    window.addEventListener("resize", event => {
      this.calculatePosition();
    });
  };

  calculatePosition = () => {
    const form = document.querySelector(".meli-search");
    const boundingClientRect = form.getBoundingClientRect();
    this.setState({
      style: {
        top: "52px",
        width: `${boundingClientRect.width}px`,
        left: `${boundingClientRect.left}px`
      }
    });
  };

  getLastSearches = () => {
    const data = getCache("last_searches") || [];
    if (data.length > 0) {
      const searches = data.reverse();

      const queries = [];

      let count = 0;
      const max = 5;

      searches.forEach(search => {
        if (count < max) {
          if (!queries.includes(search.data)) {
            queries.push(search.data);
            count++;
          }
        }
      });

      this.setState({
        queries
      });
    }
  };

  render() {
    const { style } = this.state;
    return (
      <div
        className="recentSearch"
        style={{
          ...style,
          display: this.state.queries.length > 0 ? "block" : "none"
        }}
      >
        <ul className="suggestionList">
          {this.state.queries &&
            this.state.queries.map((query, i) => {
              return (
                <li key={i} className="suggestionList__query">
                  <Link
                    to={`/items?search=${query}`}
                    className="suggestionList__query__link"
                    onClick={this.props.closeRecentSearches}
                  >
                    <span className="suggestionList__query__link--icon"></span>
                    {query}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
