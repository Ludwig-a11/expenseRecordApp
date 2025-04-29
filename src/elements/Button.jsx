import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
  background: ${(props) => (props.primario ? "#5B69E2" : "#4d4d4d")};
  width: ${(props) => (props.conIcono ? "15.62rem" : "auto")}; /* 250px */
  margin-left: 1rem; /* 20px */
  border: none;
  border-radius: 0.925rem; /* 10px */
  color: #fff;
  font-family: "Work Sans", sans-serif;
  height: 1rem;
  padding: 1rem 1rem;
  font-size: 1.15rem; /* 20px */
  /*font-weight: 500;*/
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  outline: none;

  svg {
    height: ${(props) => (props.iconoGrande ? "100%" : "0.75rem;")}; /* 12px */
    fill: white;
  }
`;

export default Button;
