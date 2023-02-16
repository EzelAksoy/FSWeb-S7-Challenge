import React, { useState } from "react";
import styled from "styled-components";
import fastFood from "./fastFood";
import "./App.css";
import Order from "./Order";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Foods from "./Foods";

const App = () => {
  const [data, setData] = useState(fastFood);
  console.log(data);
  return (
    <div className="Main">
      <header>
        {" "}
        <img
          className="main_img"
          src="https://saffroncateringonline.co.uk/wp-content/uploads/2020/05/LogoSaffron.png"
        />
        <p className="main_p">
          <Link to="/Order" data-cy="order">
            <button>ORDER</button>
          </Link>

          <Link to="/" data-cy="Home">
            <button>HOME</button>
          </Link>
        </p>
      </header>
      <Switch>
        <Route exact path="/">
          <p className="AnaYazı" data-cy="baslık">
            {" "}
            BEST FOODS IN ISTANBUL
          </p>
          <Foods data={data} />
        </Route>
        <Route path="/Order">
          <Order />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
