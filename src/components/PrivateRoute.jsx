import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const {user} = useAuth();

  if (user){
    return children;
  } else{
    return <Navigate replace to="/log-in" />; 
  };
}

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };


export default PrivateRoute