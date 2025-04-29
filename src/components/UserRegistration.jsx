import { Helmet } from "react-helmet";
import { useState } from "react";
import { Header, Title, HeaderContainer } from "../elements/Header";
import { Form, Input, ButtonContainer } from "./../elements/FormElements";
import Button from "../elements/Button";
import { auth } from "./../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Alert from "./../elements/Alert";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertState(false);
    setAlert({});

    const regExp = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!regExp.test(email)) {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    if (email === "" || password === "" || password2 === "") {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "All field are required",
      });
      return;
    }
    if (password !== password2) {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Passwords don't match",
      });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setAlertState(true);
      let message;
      switch (error.code) {
        case "auth/weak-password":
          message = "The password is too weak";
          break;
        case "auth/email-already-in-use":
          message = "Email is already in use";
          break;
        case "auth/invalid-email":
          message = "Email is not valid";
          break;
        default:
          message = "An error occurred";
          break;
      }
      setAlert({ type: "error", message: message });
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Create Account</Title>
          <div>
            <Button to="/log-in">Log In</Button>
          </div>
        </HeaderContainer>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={password2}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button as="button" primario type="submit">
            Create Account
          </Button>
        </ButtonContainer>
      </Form>
      <Alert
        type={alert.type}
        message={alert.message}
        alertState={alertState}
        setAlertState={setAlertState}
      />
    </>
  );
};

export default UserRegistration;
