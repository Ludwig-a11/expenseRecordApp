import PropTypes from "prop-types";
import Button from "./../elements/Button";
import { auth } from "./../firebase/firebase.config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogOutButton = ({ className = "", onClick }) => {
  const navigate = useNavigate();

  const logOut = async () => {
    if (onClick) {
      const canContinue = await onClick();
      if (canContinue === false) {
        return;
      }
    }

    try {
      await signOut(auth);
      navigate("/log-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button as="button" onClick={logOut} className={className}>
      Cerrar Sesión
    </Button>
  );
};

LogOutButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default LogOutButton;
