import React from "react";
import { Link } from "react-router-dom";
import InputSearch from "./InputSearch";

const Header = () => {
  return (
    <header className="meli-header">
      <div className="container-header">
        <Link to="/" className="meli-logo">
          <span className="meli-logo_img"></span>
          <span className="sr-only">Mercado Libre</span>
        </Link>
        <InputSearch />
      </div>
    </header>
  );
};

export default Header;
