import styled from "styled-components";
import React from "react";
import ReactDOM from "react-dom";
import Company from "./Company";

const Sc_div = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 5px solid #f8f2f2;
  border-radius: 10px;
  background-color: #ebc0ff1a;
`;
function Foods(props) {
  const { data } = props;
  return (
    <Sc_div>
      {data.map((items) => (
        <Company company={items} />
      ))}
    </Sc_div>
  );
}

export default Foods;
