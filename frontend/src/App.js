import React, { Component } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./utils/history";
import Header from "./components/Header";
import Home from "./containers/Home";
import Articulo from "./containers/Articulo";
import Listado from "./containers/Listado";
import Error404 from "./containers/404Error";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <div className="app">
          <Switch>
            <Route exact path="/items/:id">
              <Articulo />
            </Route>
            <Route exact path="/items">
              <Listado />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
