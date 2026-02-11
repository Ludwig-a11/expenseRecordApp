import { Helmet } from "react-helmet";
import { Header, Title, HeaderContainer } from "../elements/Header";
import { Form, Input, ButtonContainer } from "./../elements/FormElements";
import Button from "../elements/Button";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import Alert from "./../elements/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
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

    if (email === "" || password === "") {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "All field are required",
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error)
      setAlertState(true);
      
      let message;
      switch (error.code) {
        case "auth/wrong-password":
          message = "The password is incorrect";
          break;
        case "auth/user-not-found":
          message = "The user does not exist";
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
        <title>Log In</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Log In</Title>
          <div>
            <Button to="/user-registration">Create Account</Button>
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

        <ButtonContainer>
          <Button as="button" primario type="submit">
            Log In
          </Button>
        </ButtonContainer>
      </Form>
      <Alert
        type={alert.type}
        message={alert.message}
        alertState={alertState}
        setAlertState={setAlertState} />
    </>
  );
};

export default Login;
