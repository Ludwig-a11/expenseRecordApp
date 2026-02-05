import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import {auth} from './../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';


// Create the context
const AuthContext = React.createContext();

// Hook to access the context
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    
  const cancelSubscription = onAuthStateChanged(
    auth,
    (user) => {
      setUser(user);
      setLoading(false);
    },
    (error) => {
      console.error("Auth initialization error:", error);
      setLoading(false);
    }
  );

  return cancelSubscription;
  
  }, []);
  

  return (
    <AuthContext.Provider value={{user: user}}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext, useAuth }; 
