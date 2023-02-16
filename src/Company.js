import styled from "styled-components";
import React from "react";
import ReactDOM from "react-dom";
import "./Company.css";

function Company(props) {
  const { company } = props;
  return (
    <div className="food">
      <img src={company.img} />
      <h2>{company.name}</h2>
      <h2>{company.category}</h2>
      <div className="ratings">
        <h3>Rat:{company.ratings}</h3>
        <h3>{company.deliveryTime}</h3>
      </div>
    </div>
  );
}

export default Company;
