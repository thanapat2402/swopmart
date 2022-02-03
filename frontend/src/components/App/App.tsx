import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Navbar from "../Navbar";
import ContextProvider from "../../contexts";
import PrivateRoute from "../PrivateRoute";
import domainHome from "../../domains/home";
import domainAbout from "../../domains/about/About";
import domainLogin from "../../domains/Login/Login";
import domainLogout from "../../domains/Logout";
import DomainRegister from "../../domains/Register/Register";
import DomainAddProduct from "../../domains/product/add";
function App() {
  const { Header, Content } = Layout;
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header className="app-header">
          <Navbar />
        </Header>
        <Content className="content-App">
          <Switch>
            <Route exact path="/" component={domainHome} />
            <Route exact path="/add" component={DomainAddProduct} />
            <Route exact path="/login" component={domainLogin} />
            <Route exact path="/register" component={DomainRegister} />
            <PrivateRoute exact path="/user/me" component={domainAbout} />
            <PrivateRoute exact path="/logout" component={domainLogout} />
          </Switch>
        </Content>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
