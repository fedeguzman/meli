import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Hero from "../components/Hero";

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Helmet>
          <title>Mercado Libre Argentina</title>
          <meta name="description" content="La comunidad de compra y venta online más grande de América Latina."></meta>
          <meta
            property="og:image"
            content="https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png?v=2"
          ></meta>
        </Helmet>
        <Hero />
      </div>
    );
  }
}

export default Home;