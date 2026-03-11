import PropTypes from "prop-types";
import Button from "./../elements/Button";
import { auth } from "./../firebase/firebase.config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogOutButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/log-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button as="button" onClick={logOut} className={className}>
      Log Out
    </Button>
  );
};

LogOutButton.propTypes = {
  className: PropTypes.string,
};

export default LogOutButton;
