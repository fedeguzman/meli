import React, { Component } from "react";
import { Link } from "react-router-dom";
import InputSearch from "./InputSearch";
import RecentSearches from "./RecentSearches";

class Header extends Component {
  state = {
    recentSearches: false
  };

  openRecentSearches = () => {
    this.setState({
      recentSearches: true
    });
  };

  closeRecentSearches = () => {
    this.setState({
      recentSearches: false
    });
  };

  render() {
    return (
      <header className="meli-header">
        <div className="container-header">
          <Link to="/" className="meli-logo">
            <span className="meli-logo_img"></span>
            <span className="sr-only">Mercado Libre</span>
          </Link>
          <InputSearch openRecentSearches={this.openRecentSearches} />
          {this.state.recentSearches && (
            <RecentSearches closeRecentSearches={this.closeRecentSearches} />
          )}
        </div>
      </header>
    );
  }
}

export default Header;
