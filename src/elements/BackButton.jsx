import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "./../images/flecha.svg";

const Btn = styled.button`
  background: ${(props) => (props.primario ? "#5B69E2" : "#4d4d4d")};
  width: ${(props) => (props.conIcono ? "15.62rem" : "auto")}; /* 250px */
  margin-left: 1.25rem; /* 20px */
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
`;
const Icon = styled.img`
  width: 1.25rem; /* 20px */
  height: auto;
  fill: #fff;
`;

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Btn onClick={handleClick}>
      <Icon src={ArrowIcon} />
    </Btn>
  );
};

export default BackButton;
