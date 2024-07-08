import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const initialValue = {
  email: '',
  password: '',
};

const AuthContext = createContext(initialValue);

function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const value = { email, password, setEmail, setPassword };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
