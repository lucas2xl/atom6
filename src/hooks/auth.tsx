import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../database';
import { IUser } from '../dtos/userDTO';
import { api } from '../services';

interface ISignUp {
  username: string;
  email: string;
  password: string;
}

interface IAuthState {
  access: { refresh_token: string; token: string };
  user: IUser;
}

interface ISignIn {
  username: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signUp: (form: ISignUp) => Promise<void>;
  signIn: (form: ISignIn) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

interface IAuthProvideProps {
  children: React.ReactNode;
}
const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProvideProps) => {
  const [user, setUser] = useState({} as IUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await database.getUser();
      if (result && result.id) {
        api.defaults.headers.common.authorization = `Bearer ${result.token}`;
        const hasValidToken = await api.get('/auth/check');
        if (hasValidToken.status === 401) {
          await api.post('/auth/refresh', {
            refresh_token: result.refresh_token,
          });
        }
        setUser(result);
      }

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUp = async ({
    email,
    password,
    username,
  }: ISignUp): Promise<void> => {
    const result = await api.post('/auth/signup', {
      username,
      email,
      password,
    });

    if (result.status === 400) {
      throw new Error(result.statusText);
    }
    return;
  };

  const signIn = async ({ username, password }: ISignIn): Promise<void> => {
    const result = await api.post<IAuthState>('/auth/signin', {
      username,
      password,
    });

    if (result.status === 400) {
      throw new Error(result.statusText);
    }

    const { access, user: userData } = result.data;

    api.defaults.headers.common.authorization = `Bearer ${access.token}`;

    setUser({ ...userData, ...access });

    await database.createUser({ ...userData, ...access });

    return;
  };

  const signOut = async (): Promise<void> => {
    api.defaults.headers.common.authorization = '';
    setUser({} as IUser);
    await database.removeUser();
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
